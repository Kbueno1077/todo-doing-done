"use client";

import Avatar from "@/components/Avatar/Avatar";
import GroupedAvatars from "@/components/Avatar/GroupedAvatars";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import ZodInput from "@/components/ZodInput/ZodInput";
import { useStoreContext } from "@/store/useStoreContext";
import { User } from "@/utils/types";
import { showToast } from "@/utils/utils";
import { IconBrandTrello, IconH1, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { set, z } from "zod";

const createBoardSchema = z.object({
    name: z.string().min(1, { message: "Board name is required" }),
});

type CreateBoardFormData = z.infer<typeof createBoardSchema>;

function CreateBoard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<CreateBoardFormData>({ name: "" });
    const [errors, setErrors] = useState<
        Partial<Record<keyof CreateBoardFormData, string>>
    >({});

    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const { createBoardAndAddMembers, selectedBoardId, users } =
        useStoreContext((s) => {
            return {
                createBoardAndAddMembers: s.createBoardAndAddMembers,
                selectedBoardId: s.selectedBoardId,
                users: s.users,
            };
        });

    const handleChange = (name: keyof CreateBoardFormData, value: string) => {
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

    function openModal() {
        document.addEventListener("keydown", closeModal);
        setIsOpen(true);
    }

    function closeModal() {
        document.removeEventListener("keydown", closeModal);
        setSelectedUsers([]);
        setErrors({});
        setFormData({ name: "" });
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
        await createBoardAndAddMembers(formData.name, selectedUsers);
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
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] text-base-content overflow-y-auto">
                    <div className="flex min-h-full p-3 md:p-0 justify-center items-center">
                        <div className="w-full sm:w-3/4 max-w-[1280px] bg-base-300 rounded-md p-4 sm:p-8 flex flex-col my-4">
                            <IpadCursorBlockWrapper type="text">
                                <div className="flex gap-4 items-center py-4">
                                    <IconBrandTrello size={30} />
                                    <h1 className="font-bold text-2xl">
                                        New Board
                                    </h1>
                                </div>
                            </IpadCursorBlockWrapper>

                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex gap-4">
                                    <IconH1 size={30} />

                                    <IpadCursorBlockWrapper
                                        type="text"
                                        className="w-full"
                                    >
                                        <ZodInput
                                            schema={createBoardSchema}
                                            name="name"
                                            label="Board Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            placeholder="Board Name"
                                            disabled={isLoading}
                                            className="input input-bordered w-full text-lg"
                                        />
                                    </IpadCursorBlockWrapper>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown w-full">
                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="btn m-1 w-full"
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

export default CreateBoard;
