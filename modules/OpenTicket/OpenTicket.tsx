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
import { z } from "zod";
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

    const [comments, setComments] = useState<Comment[] | []>([]);
    const [priority, setPriority] = useState(ticket.priority || 0);

    const [selectedUsers, setSelectedUsers] = useState<User[]>(
        ticket.AssignedToTickets?.map((assigned) => assigned.Users) || []
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

    const { users, updateTicket, selectedBoardId } = useStoreContext((s) => {
        return {
            users: s.users,
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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setter: React.Dispatch<React.SetStateAction<string | number>>
    ) => {
        const value =
            e.target.type === "number"
                ? parseInt(e.target.value)
                : e.target.value;
        setter(value);
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

    async function openModal() {
        setIsLoadingComments(true);

        const supabase = createClient();

        //Load comments on this ticket
        const { data } = await supabase
            .from("Tickets")
            .select("Comments(*, Users(*))")
            .eq("id", ticket.id);

        if (data && data[0]) {
            setComments(data[0].Comments || []);
        }

        setIsLoadingComments(false);
        setIsOpen(true);
    }

    function closeModal() {
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
            priority !== ticket.priority;

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
            status: "Todo",
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
                <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999]">
                    <div className="flex h-full justify-center items-center">
                        <div className="w-3/4 max-w-[1280px] bg-base-300 rounded-md p-8 flex flex-col mt-2">
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
                                        <div className="flex gap-4 py-4">
                                            <IconH1 size={30} />

                                            <IpadCursorBlockWrapper
                                                type="text"
                                                className="w-full"
                                            >
                                                <ZodInput
                                                    schema={createBoardSchema}
                                                    name="title"
                                                    label="Title"
                                                    value={formData.title}
                                                    onChange={handleFormChange}
                                                    error={errors.title}
                                                    placeholder="Title"
                                                    disabled={isLoading}
                                                    className="input input-bordered w-full text-lg"
                                                />
                                            </IpadCursorBlockWrapper>
                                        </div>

                                        <div className="flex gap-4">
                                            <IconArticle size={30} />

                                            <IpadCursorBlockWrapper
                                                type="text"
                                                className="w-full"
                                            >
                                                <ZodTextarea
                                                    schema={createBoardSchema}
                                                    name="description"
                                                    label="Description"
                                                    value={formData.title}
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
                                            <h3 className="text-lg my-2 ">
                                                Priority
                                            </h3>
                                            <input
                                                type="range"
                                                min={0}
                                                max={10}
                                                disabled={isLoading}
                                                value={priority}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        setPriority
                                                    )
                                                }
                                                className="range"
                                                step={1}
                                            />
                                            <div className="flex w-full justify-between px-2 text-xs">
                                                <span>0</span>
                                                <span>1</span>
                                                <span>2</span>
                                                <span>3</span>
                                                <span>4</span>
                                                <span>5</span>
                                                <span>6</span>
                                                <span>7</span>
                                                <span>8</span>
                                                <span>9</span>
                                                <span>10</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="dropdown">
                                            <div className="flex gap-2 items-center">
                                                <button
                                                    className="btn m-1"
                                                    disabled={isLoading}
                                                    onClick={() =>
                                                        setIsDropDownOpen(
                                                            !isDropDownOpen
                                                        )
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
                                                                <label className="flex items-center space-x-2 ">
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

                                    <div className="mt-2">
                                        <h3 className="text-lg my-2 ">
                                            Comments
                                        </h3>

                                        {isLoadingComments && (
                                            <>
                                                <div className="skeleton h-60 w-full mb-5"></div>
                                            </>
                                        )}

                                        {comments?.map((comment, index) => (
                                            <div
                                                key={comment.id}
                                                className={`flex gap-4 items-center py-4 ${
                                                    comments.length - 1 ===
                                                    index
                                                        ? "justify-end"
                                                        : ""
                                                }`}
                                            >
                                                <div className="avatar">
                                                    <div className="w-8 rounded">
                                                        <img
                                                            src={
                                                                comment.Users
                                                                    .img ||
                                                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col">
                                                    <div>
                                                        <p className="text-sm">
                                                            {comment.Users.name}{" "}
                                                            {"   "}-{"   "}
                                                            {format(
                                                                comment.updatedAt,
                                                                {
                                                                    date: "full",
                                                                    time: "short",
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-2">
                                        <IconMessage size={30} />

                                        <IpadCursorBlockWrapper
                                            type="text"
                                            className="w-full"
                                        >
                                            <ZodTextarea
                                                schema={createBoardSchema}
                                                name="comment"
                                                label="Comment"
                                                value={formData.comment}
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
                                                {ticket.createdAt &&
                                                    format(ticket.createdAt, {
                                                        date: "full",
                                                        time: "short",
                                                    })}
                                            </p>
                                            <p className="text-xs font-bold italic">
                                                <span className="">
                                                    Updated at:{" "}
                                                </span>
                                                {ticket.updatedAt &&
                                                    format(ticket.updatedAt, {
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
                                    <DeleteTicket
                                        toggleDelete={toggleDelete}
                                        ticketId={ticket.id}
                                        closeModal={closeModal}
                                    />
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
