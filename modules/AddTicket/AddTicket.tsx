"use client";

import Avatar from "@/components/Avatar/Avatar";
import GroupedAvatars from "@/components/Avatar/GroupedAvatars";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import ZodInput from "@/components/ZodInput/ZodInput";
import ZodTextarea from "@/components/ZodTextarea/ZodTextarea";
import { useStoreContext } from "@/store/useStoreContext";
import { User } from "@/utils/types";
import {
    IconArticle,
    IconH1,
    IconPlus,
    IconStackPush,
} from "@tabler/icons-react";

import { useState } from "react";
import { z } from "zod";

interface AddTicketProps {
    status: string;
}
const createBoardSchema = z.object({
    title: z.string().min(1, { message: "Ticket title is required" }),
    description: z.string(),
});

type CreateBoardFormData = z.infer<typeof createBoardSchema>;

function AddTicket({ status }: AddTicketProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const [priority, setPriority] = useState(0);

    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const [formData, setFormData] = useState<CreateBoardFormData>({
        title: "",
        description: "",
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof CreateBoardFormData, string>>
    >({});

    const { createTicket, selectedBoardId, users } = useStoreContext((s) => {
        return {
            createTicket: s.createTicket,
            selectedBoardId: s.selectedBoardId,
            users: s.users,
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

    function openModal() {
        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("no-scroll");

        setIsOpen(true);
    }

    function closeModal() {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.classList.remove("no-scroll");

        setPriority(0);
        setErrors({});
        setFormData({
            title: "",
            description: "",
        });
        setIsLoading(false);
        setSelectedUsers([]);
        setIsOpen(false);
    }

    const handleSubmit = async () => {
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

        const ticket = {
            title: formData.title,
            description: formData.description,
            priority: priority,
            status,
            board_id: selectedBoardId,
        };

        await createTicket(ticket, selectedUsers);
        setIsLoading(false);
        closeModal();
    };

    return (
        <>
            <IpadCursorBlockWrapper>
                <button
                    onClick={openModal}
                    className="btn btn-square rounded-md btn-sm"
                >
                    <IconPlus size={20} />
                </button>
            </IpadCursorBlockWrapper>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] text-base-content  overflow-y-auto">
                    <div className="flex min-h-full p-3 md:p-0 justify-center items-center">
                        <div className="w-full sm:w-3/4 max-w-[1280px] bg-base-300 rounded-md p-4 sm:p-8 flex flex-col my-4">
                            <IpadCursorBlockWrapper type="text">
                                <div className="flex gap-4 items-center py-4">
                                    <IconStackPush size={30} />
                                    <h1 className="font-bold text-2xl">
                                        New Ticket
                                    </h1>
                                </div>
                            </IpadCursorBlockWrapper>

                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex gap-4">
                                    <IconH1
                                        className="hidden sm:block"
                                        size={30}
                                    />

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

                                <div className="flex gap-4">
                                    <IconArticle
                                        className="hidden sm:block"
                                        size={30}
                                    />

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
                                            {priority >= 0 ? priority : "N/A"}
                                        </h3>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={priority}
                                        disabled={isLoading}
                                        onChange={(e) =>
                                            setPriority(
                                                parseInt(e.target.value)
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
                                            Assign To ({selectedUsers.length})
                                        </button>

                                        {selectedUsers.length > 0 && (
                                            <GroupedAvatars
                                                assignedTo={selectedUsers}
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
                                                                        (u) =>
                                                                            u.id ===
                                                                            user.id
                                                                    )}
                                                                    className="checkbox"
                                                                />

                                                                <Avatar
                                                                    user={user}
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

                            <div className="flex gap-2 w-full justify-end mt-4">
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
                                            "Create"
                                        )}
                                    </button>
                                </IpadCursorBlockWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddTicket;
