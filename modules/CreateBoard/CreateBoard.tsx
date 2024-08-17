"use client";

import Avatar from "@/components/Avatar/Avatar";
import GroupedAvatars from "@/components/Avatar/GroupedAvatars";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { useStoreContext } from "@/store/useStoreContext";
import { User } from "@/utils/types";
import {
    IconArticle,
    IconH1,
    IconPlus,
    IconStackPush,
} from "@tabler/icons-react";

import { useState } from "react";

function CreateBoard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const [name, setName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const { createBoardAndAddMembers, selectedBoardId, users } =
        useStoreContext((s) => {
            return {
                createBoardAndAddMembers: s.createBoardAndAddMembers,
                selectedBoardId: s.selectedBoardId,
                users: s.users,
            };
        });

    const {} = useStoreContext((s) => {
        return {};
    });

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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setSelectedUsers([]);
        setIsOpen(false);
    }

    const handleSubmit = async () => {
        await createBoardAndAddMembers(name, selectedUsers);
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
                <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999]">
                    <div className="flex h-full justify-center items-center text-foreground">
                        <div className="w-3/4 max-w-[1280px] bg-background rounded-md p-8 flex flex-col mt-2">
                            <IpadCursorBlockWrapper type="text">
                                <div className="flex gap-4 items-center py-4">
                                    <IconStackPush size={30} />
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
                                        <input
                                            type="text"
                                            placeholder="Board Name"
                                            className="input input-bordered w-full text-foreground text-lg"
                                            value={name}
                                            onChange={(e) =>
                                                handleInputChange(e, setName)
                                            }
                                        />
                                    </IpadCursorBlockWrapper>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown w-full">
                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="btn m-1 w-full"
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
                                    >
                                        Cancel
                                    </button>
                                </IpadCursorBlockWrapper>

                                <IpadCursorBlockWrapper>
                                    <button
                                        className="btn btn-success"
                                        onClick={handleSubmit}
                                    >
                                        Create
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
