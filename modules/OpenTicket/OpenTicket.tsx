"use client";

import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import IpadItem from "@/components/Item/IpadItem";
import { Comment, Ticket, User } from "@/utils/types";
import { format } from "@formkit/tempo";
import {
    IconArticle,
    IconH1,
    IconMessage,
    IconStack2,
    IconTrash,
} from "@tabler/icons-react";

import Avatar from "@/components/Avatar/Avatar";
import GroupedAvatars from "@/components/Avatar/GroupedAvatars";
import ZodInput from "@/components/ZodInput/ZodInput";
import ZodTextarea from "@/components/ZodTextarea/ZodTextarea";
import { useStoreContext } from "@/store/useStoreContext";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { set, z } from "zod";
import DeleteTicket from "./DeleteTicket";

interface AddTicketProps {
    ticket: Ticket;
    index: number;
}

const createBoardSchema = z.object({
    title: z.string().min(1, { message: "Ticket title is required" }),
    description: z.string(),
    comment: z.string(),
});

type CreateBoardFormData = z.infer<typeof createBoardSchema>;

function OpenTicket({ ticket, index }: AddTicketProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isStatusDropDownOpen, setIsStatusDropDownOpen] = useState(false);

    const [comments, setComments] = useState<Comment[] | []>([]);
    const [priority, setPriority] = useState(ticket.priority || 0);

    const [selectedUsers, setSelectedUsers] = useState<User[]>(
        ticket.AssignedToTickets?.map((assigned) => assigned.Users) || []
    );

    const [selectedStatus, setSelectedStatus] = useState<string>(
        ticket.status || "Todo"
    );

    const [formData, setFormData] = useState<CreateBoardFormData>({
        title: ticket.title || "",
        description: ticket.description || "",
        comment: "",
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof CreateBoardFormData, string>>
    >({});

    const toggleDelete = () => {
        setIsDeleteOpen(!isDeleteOpen);
    };

    const { loggedUser, users, updateTicket, selectedBoardId, columns } =
        useStoreContext((s) => {
            return {
                users: s.users,
                loggedUser: s.loggedUser,
                columns: s.columns,
                updateTicket: s.updateTicket,

                selectedBoardId: s.selectedBoardId,
            };
        });

    const handleFormChange = (
        name: keyof CreateBoardFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate the field
        const result = createBoardSchema.shape[name].safeParse(value);
        if (!result.success) {
            setErrors((prev) => ({
                ...prev,
                [name]: result.error.errors[0].message,
            }));
        } else {
            setErrors((prev) => {
                const { [name]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const toggleUser = (user: User) => {
        setSelectedUsers((prevSelected) => {
            const isCurrentlySelected = prevSelected.some(
                (u) => u.id === user.id
            );
            const newSelected = isCurrentlySelected
                ? prevSelected.filter((u) => u.id !== user.id)
                : [...prevSelected, user];

            return newSelected;
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    const openAssigneedDropDown = (e: any) => {
        document.addEventListener("click", openDropDownListener);
        setIsDropDownOpen(true);
    };

    const openStatusDropDown = (e: any) => {
        document.addEventListener("click", openStatusDropDownListener);
        setIsStatusDropDownOpen(true);
    };

    const openStatusDropDownListener = (e: any) => {
        const dropdown = document.getElementById("StatusDropDown");
        if (dropdown && !dropdown.contains(e.target)) {
            setIsStatusDropDownOpen(false);
            document.removeEventListener("click", openStatusDropDownListener);
        }
    };

    const openDropDownListener = (e: any) => {
        const dropdown = document.getElementById("AssigneedDropDown");
        if (dropdown && !dropdown.contains(e.target)) {
            setIsDropDownOpen(false);
            document.removeEventListener("click", openDropDownListener);
        }
    };

    async function openModal() {
        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("no-scroll");
        setIsLoadingComments(true);

        const supabase = createClient();

        //Load comments on this ticket
        const { data } = await supabase
            .from("Tickets")
            .select("status, Comments(*, Users(*))")
            .eq("id", ticket.id);

        if (data && data[0]) {
            setComments(data[0].Comments || []);
            setSelectedStatus(data[0].status);
        }

        setIsLoadingComments(false);
        setIsOpen(true);
    }

    function closeModal() {
        document.removeEventListener("click", openDropDownListener);
        document.removeEventListener("click", openStatusDropDownListener);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.classList.remove("no-scroll");

        setPriority(ticket.priority || 0);
        setSelectedUsers(
            ticket.AssignedToTickets?.map((assigned) => assigned.Users) || []
        );
        setFormData({
            title: ticket.title || "",
            description: ticket.description || "",
            comment: "",
        });
        setErrors({});
        setComments([]);
        setIsLoading(false);
        setIsLoadingComments(false);
        setIsOpen(false);
    }

    async function handleSubmit() {
        const result = createBoardSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Partial<
                Record<keyof CreateBoardFormData, string>
            > = {};
            result.error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    newErrors[issue.path[0] as keyof CreateBoardFormData] =
                        issue.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        const isDataUpdateNeeded =
            formData.title !== ticket.title ||
            formData.description !== ticket.description ||
            priority !== ticket.priority ||
            selectedStatus !== ticket.status;

        const isAssignedUpdateNeeded =
            // Ensure both arrays exist and have a length property
            (ticket.AssignedToTickets?.length || 0) !==
                (selectedUsers?.length || 0) ||
            // Check if every currently assigned user is in the selectedUsers
            !(ticket.AssignedToTickets || []).every((assigned) =>
                (selectedUsers || []).some(
                    (sel) => assigned.Users.id === sel.id
                )
            ) ||
            // Check if every selected user is in the currently assigned users
            !(selectedUsers || []).every((sel) =>
                (ticket.AssignedToTickets || []).some(
                    (assigned) => assigned.Users.id === sel.id
                )
            );

        const newTicket = {
            id: ticket.id,
            title: formData.title,
            description: formData.description,
            priority: priority,
            status: selectedStatus,
            board_id: selectedBoardId,
        };

        await updateTicket(
            { newTicket, isUpdateNeeded: isDataUpdateNeeded },
            { selectedUsers, isUpdateNeeded: isAssignedUpdateNeeded },
            formData.comment
        );

        setIsLoading(false);
        closeModal();
    }

    return (
        <>
            <IpadItem onClick={openModal} ticket={ticket} index={index} />

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] text-base-content overflow-y-auto">
                    <div className="flex min-h-full p-3 md:p-0 justify-center items-center">
                        <div className="w-full sm:w-3/4 max-w-[1280px] bg-base-300 rounded-md p-4 sm:p-8 flex flex-col my-4">
                            <div className="flex items-center justify-between">
                                <IpadCursorBlockWrapper type="text">
                                    <div className="flex gap-4 items-center">
                                        <IconStack2 size={30} />
                                        <h1 className="font-bold text-2xl">
                                            {ticket.title}
                                        </h1>
                                    </div>
                                </IpadCursorBlockWrapper>

                                {!isDeleteOpen && (
                                    <IpadCursorBlockWrapper>
                                        <button
                                            onClick={toggleDelete}
                                            className="btn btn-square btn-outline"
                                            disabled={isLoading}
                                        >
                                            <IconTrash
                                                size={20}
                                                className={`${
                                                    isDeleteOpen &&
                                                    "text-warning"
                                                }`}
                                            />
                                        </button>
                                    </IpadCursorBlockWrapper>
                                )}
                            </div>

                            {!isDeleteOpen ? (
                                <>
                                    <div className="flex flex-col gap-4 py-4">
                                        <div className="flex flex-col sm:flex-row  gap-2 sm:gap-4">
                                            <div className="flex items-center gap-2">
                                                <IconH1 size={30} />
                                                <h3 className="sm:hidden font-bold text-xl">
                                                    Title
                                                </h3>
                                            </div>

                                            <IpadCursorBlockWrapper
                                                type="text"
                                                className="w-full"
                                            >
                                                <ZodInput
                                                    schema={createBoardSchema}
                                                    name="title"
                                                    label="Title"
                                                    value={formData.title}
                                                    //@ts-ignore
                                                    onChange={handleFormChange}
                                                    error={errors.title}
                                                    placeholder="Title"
                                                    disabled={isLoading}
                                                    className="input input-bordered w-full text-lg"
                                                />
                                            </IpadCursorBlockWrapper>
                                        </div>

                                        <div className="flex flex-col sm:flex-row g gap-2 sm:gap-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <IconArticle size={30} />
                                                <h3 className="sm:hidden font-bold text-xl">
                                                    Description
                                                </h3>
                                            </div>

                                            <IpadCursorBlockWrapper
                                                type="text"
                                                className="w-full"
                                            >
                                                <ZodTextarea
                                                    schema={createBoardSchema}
                                                    name="description"
                                                    label="Description"
                                                    value={formData.description}
                                                    //@ts-ignore
                                                    onChange={handleFormChange}
                                                    error={errors.description}
                                                    placeholder="Description"
                                                    disabled={isLoading}
                                                    className="textarea textarea-bordered w-full text-lg"
                                                    rows={5}
                                                />
                                            </IpadCursorBlockWrapper>
                                        </div>

                                        <div className="">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg my-2 ">
                                                    Priority
                                                </h3>
                                                <h3 className="text-lg my-2 ">
                                                    {priority >= 0
                                                        ? priority
                                                        : "N/A"}
                                                </h3>
                                            </div>
                                            <input
                                                type="range"
                                                min={0}
                                                max={10}
                                                disabled={isLoading}
                                                value={priority}
                                                onChange={(e) =>
                                                    setPriority(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="range"
                                                step={1}
                                            />
                                            <div className="flex w-full justify-between px-2 text-xs">
                                                {[
                                                    0, 1, 2, 3, 4, 5, 6, 7, 8,
                                                    9, 10,
                                                ].map((number) => (
                                                    <span key={number}>
                                                        {number}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div
                                            id="StatusDropDown"
                                            className="dropdown"
                                        >
                                            <div className="flex gap-2 items-center">
                                                <button
                                                    className="btn m-1"
                                                    disabled={isLoading}
                                                    onClick={openStatusDropDown}
                                                >
                                                    Status: {selectedStatus}
                                                </button>
                                            </div>

                                            {isStatusDropDownOpen && (
                                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                    {Object.entries(
                                                        columns
                                                    ).map((column) => (
                                                        <li key={column[0]}>
                                                            <IpadCursorBlockWrapper>
                                                                <label className="flex items-center space-x-2">
                                                                    <button
                                                                        className="w-full flex items-center space-x-2 "
                                                                        onClick={() =>
                                                                            setSelectedStatus(
                                                                                column[0]
                                                                            )
                                                                        }
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            name="column-radio"
                                                                            className="radio radio-primary"
                                                                            checked={
                                                                                selectedStatus ===
                                                                                column[0]
                                                                            }
                                                                            onChange={() =>
                                                                                setSelectedStatus(
                                                                                    column[0]
                                                                                )
                                                                            }
                                                                            value={
                                                                                column[0]
                                                                            }
                                                                        />
                                                                        <span className="label-text">
                                                                            {
                                                                                column[0]
                                                                            }
                                                                        </span>
                                                                    </button>
                                                                </label>
                                                            </IpadCursorBlockWrapper>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div
                                            id="AssigneedDropDown"
                                            className="dropdown"
                                        >
                                            <div className="flex gap-2 items-center">
                                                <button
                                                    className="btn m-1"
                                                    disabled={isLoading}
                                                    onClick={
                                                        openAssigneedDropDown
                                                    }
                                                >
                                                    Assign To (
                                                    {selectedUsers.length})
                                                </button>

                                                {selectedUsers.length > 0 && (
                                                    <GroupedAvatars
                                                        assignedTo={
                                                            selectedUsers
                                                        }
                                                    />
                                                )}
                                            </div>

                                            {isDropDownOpen && (
                                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                    {users.map((user) => (
                                                        <li key={user.id}>
                                                            <IpadCursorBlockWrapper>
                                                                <label className="flex items-center space-x-2">
                                                                    <button
                                                                        className="w-full flex items-center space-x-2 "
                                                                        onClick={() =>
                                                                            toggleUser(
                                                                                user
                                                                            )
                                                                        }
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedUsers.some(
                                                                                (
                                                                                    u
                                                                                ) =>
                                                                                    u.id ===
                                                                                    user.id
                                                                            )}
                                                                            className="checkbox"
                                                                        />

                                                                        <Avatar
                                                                            user={
                                                                                user
                                                                            }
                                                                        />
                                                                    </button>
                                                                </label>
                                                            </IpadCursorBlockWrapper>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {isLoadingComments && (
                                        <>
                                            <div className="skeleton h-60 w-full mb-5"></div>
                                        </>
                                    )}

                                    {!isLoadingComments && (
                                        <div className="my-4">
                                            <div className="collapse bg-base-200 sm:px-3">
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        zIndex:
                                                            isDropDownOpen ||
                                                            isStatusDropDownOpen
                                                                ? 0
                                                                : 10,
                                                    }}
                                                />

                                                <h3 className="my-2 collapse-title text-xl font-medium ">
                                                    Comments ({comments?.length}
                                                    )
                                                </h3>

                                                <div className="collapse-content">
                                                    {comments?.map(
                                                        (comment, index) => (
                                                            <div
                                                                key={comment.id}
                                                                className={`flex items-center chat chat-start ${
                                                                    loggedUser?.id ===
                                                                    comment
                                                                        .Users
                                                                        .id
                                                                        ? "justify-end chat-end"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <div
                                                                    className={`flex gap-4 items-end py-4 chat-bubble`}
                                                                >
                                                                    <div className="avatar">
                                                                        <div className="w-8 rounded">
                                                                            <img
                                                                                src={
                                                                                    comment
                                                                                        .Users
                                                                                        .img ||
                                                                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <IpadCursorBlockWrapper type="text">
                                                                        <div className="flex flex-col">
                                                                            <div>
                                                                                <p className="text-sm">
                                                                                    {
                                                                                        comment
                                                                                            .Users
                                                                                            .name
                                                                                    }{" "}
                                                                                    {
                                                                                        "   "
                                                                                    }

                                                                                    -
                                                                                    {
                                                                                        "   "
                                                                                    }
                                                                                    {format(
                                                                                        comment.updated_at,
                                                                                        {
                                                                                            date: "full",
                                                                                            time: "short",
                                                                                        }
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                            <p className="text-sm">
                                                                                {
                                                                                    comment.content
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </IpadCursorBlockWrapper>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row  gap-2 sm:gap-4">
                                        <IconMessage
                                            className="hidden sm:block"
                                            size={30}
                                        />

                                        <IpadCursorBlockWrapper
                                            type="text"
                                            className="w-full"
                                        >
                                            <ZodTextarea
                                                schema={createBoardSchema}
                                                name="comment"
                                                label="Comment"
                                                value={formData.comment}
                                                //@ts-ignore
                                                onChange={handleFormChange}
                                                error={errors.comment}
                                                placeholder="Add comment"
                                                disabled={
                                                    isLoading ||
                                                    isLoadingComments
                                                }
                                                className="textarea textarea-bordered w-full text-lg"
                                                rows={5}
                                            />
                                        </IpadCursorBlockWrapper>
                                    </div>

                                    <div className="flex gap-2 w-full items-center justify-between mt-6">
                                        <div>
                                            <p className="text-xs font-bold italic">
                                                <span className="">
                                                    Created at:{" "}
                                                </span>
                                                {ticket.created_at &&
                                                    format(ticket.created_at, {
                                                        date: "full",
                                                        time: "short",
                                                    })}
                                            </p>
                                            <p className="text-xs font-bold italic">
                                                <span className="">
                                                    Updated at:{" "}
                                                </span>
                                                {ticket.updated_at &&
                                                    format(ticket.updated_at, {
                                                        date: "full",
                                                        time: "short",
                                                    })}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <IpadCursorBlockWrapper>
                                                <button
                                                    className="btn"
                                                    onClick={closeModal}
                                                    disabled={isLoading}
                                                >
                                                    Cancel
                                                </button>
                                            </IpadCursorBlockWrapper>

                                            <IpadCursorBlockWrapper>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={handleSubmit}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <span className="loading loading-bars loading-xs"></span>
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </button>
                                            </IpadCursorBlockWrapper>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {ticket.id && (
                                        <DeleteTicket
                                            toggleDelete={toggleDelete}
                                            ticketId={ticket.id}
                                            closeModal={closeModal}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default OpenTicket;
