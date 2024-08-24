"use client";

import Avatar from "@/components/Avatar/Avatar";
import GroupedAvatars from "@/components/Avatar/GroupedAvatars";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { useStoreContext } from "@/store/useStoreContext";
import { User } from "@/utils/types";
import { IconFilter } from "@tabler/icons-react";

import { useState } from "react";

function Filters() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { users, filters, applyFilters, resetFilters, columns } =
        useStoreContext((s) => {
            return {
                users: s.users,
                filters: s.filters,
                applyFilters: s.applyFilters,
                resetFilters: s.resetFilters,
                columns: s.columns,
            };
        });

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isStatusDropDownOpen, setIsStatusDropDownOpen] = useState(false);

    const [priority, setPriority] = useState(filters.priority || -1);
    const [selectedUsers, setSelectedUsers] = useState<User[]>(
        filters.assignedTo || []
    );
    const [selectedStatus, setSelectedStatus] = useState<string[]>(
        filters.status || []
    );

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

    const toggleStatus = (Status: string) => {
        setSelectedStatus((prevSelected) => {
            const isCurrentlySelected = prevSelected.some((u) => u === Status);
            const newSelected = isCurrentlySelected
                ? prevSelected.filter((u) => u !== Status)
                : [...prevSelected, Status];

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
        setIsOpen(true);
    }

    const handleResetFilters = async () => {
        resetFilters();
        setPriority(filters.priority || -1);
        setSelectedUsers(filters.assignedTo || []);
        setSelectedStatus(filters.status || []);
        closeModal();
    };

    const handleSubmit = async () => {
        if (
            priority > -1 ||
            selectedUsers.length > 0 ||
            selectedStatus.length > 0
        ) {
            applyFilters({
                priority,
                assignedTo: selectedUsers,
                status: selectedStatus,
            });
        } else {
            resetFilters();
        }

        closeModal();
    };

    function closeModal() {
        document.removeEventListener("keydown", handleKeyDown);
        setIsOpen(false);
    }

    return (
        <>
            <IpadCursorBlockWrapper>
                <button className="btn btn-ghost" onClick={openModal}>
                    <IconFilter size={20} />
                </button>
            </IpadCursorBlockWrapper>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] text-base-content  overflow-y-auto">
                    <div className="flex min-h-full p-3 md:p-0 justify-center items-center">
                        <div className="w-full sm:w-3/4 max-w-[1280px] bg-base-300 rounded-md p-4 sm:p-8 flex flex-col my-4">
                            <IpadCursorBlockWrapper type="text">
                                <div className="flex gap-4 items-center py-4">
                                    <IconFilter size={30} />
                                    <h1 className="font-bold text-2xl">
                                        Apply Filters
                                    </h1>
                                </div>
                            </IpadCursorBlockWrapper>

                            <div className="flex flex-col gap-4 py-4">
                                <div className="">
                                    <h3 className="text-lg my-2 ">Priority</h3>
                                    <input
                                        type="range"
                                        min={-1}
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
                                    <div className="flex w-full justify-between px-1 text-xs">
                                        <span>N/A</span>

                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                            (number) => (
                                                <span>{number}</span>
                                            )
                                        )}
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
                                                setIsStatusDropDownOpen(
                                                    !isStatusDropDownOpen
                                                )
                                            }
                                        >
                                            Status
                                        </button>
                                    </div>

                                    {isStatusDropDownOpen && (
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            {Object.entries(columns).map(
                                                (column) => (
                                                    <li key={column[0]}>
                                                        <IpadCursorBlockWrapper>
                                                            <label className="flex items-center space-x-2 ">
                                                                <button
                                                                    onClick={() =>
                                                                        toggleStatus(
                                                                            column[0]
                                                                        )
                                                                    }
                                                                    className="w-full flex items-center space-x-2 "
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedStatus.some(
                                                                            (
                                                                                u
                                                                            ) =>
                                                                                u ===
                                                                                column[0]
                                                                        )}
                                                                        className="checkbox"
                                                                    />

                                                                    <span>
                                                                        {
                                                                            column[0]
                                                                        }
                                                                    </span>
                                                                </button>
                                                            </label>
                                                        </IpadCursorBlockWrapper>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>

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
                                        onClick={handleResetFilters}
                                        disabled={isLoading}
                                    >
                                        Reset Filters
                                    </button>
                                </IpadCursorBlockWrapper>

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
                                            "Apply Filters"
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

export default Filters;
