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

interface AddTicketProps {
    status: string;
}

function AddTicket({ status }: AddTicketProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const [priority, setPriority] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const { createTicket, selectedBoardId } = useStoreContext((s) => {
        return {
            createTicket: s.createTicket,
            selectedBoardId: s.selectedBoardId,
        };
    });

    const { users } = useStoreContext((s) => {
        return {
            users: s.users,
        };
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
        setPriority(0);
        setTitle("");
        setDescription("");
        setSelectedUsers([]);
        setIsOpen(false);
    }

    const handleSubmit = async () => {
        const ticket = {
            title: title,
            description: description,
            priority: priority,
            status,
            board_id: selectedBoardId,
        };

        await createTicket(ticket, selectedUsers);
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
                                        New Ticket
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
                                            placeholder="Title"
                                            className="input input-bordered w-full text-foreground text-lg"
                                            value={title}
                                            onChange={(e) =>
                                                handleInputChange(e, setTitle)
                                            }
                                        />
                                    </IpadCursorBlockWrapper>
                                </div>

                                <div className="flex gap-4">
                                    <IconArticle size={30} />

                                    <IpadCursorBlockWrapper
                                        type="text"
                                        className="w-full"
                                    >
                                        <textarea
                                            rows={5}
                                            className="textarea textarea-bordered w-full text-foreground text-lg"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    setDescription
                                                )
                                            }
                                        ></textarea>
                                    </IpadCursorBlockWrapper>
                                </div>

                                <div className="">
                                    <h3 className="text-lg my-2 ">Priority</h3>
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={priority}
                                        onChange={(e) =>
                                            handleInputChange(e, setPriority)
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

export default AddTicket;
