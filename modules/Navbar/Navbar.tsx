"use client";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { useStoreContext } from "@/store/useStoreContext";
import React, { useState } from "react";

function Navbar() {
    const [isLoading, setIsLoading] = useState(false);

    const { selectedBoardId, boards, loadTicketsFromBoard } = useStoreContext(
        (s) => {
            return {
                selectedBoardId: s.selectedBoardId,
                boards: s.boards,
                loadTicketsFromBoard: s.loadTicketsFromBoard,
            };
        }
    );

    const changeBoard = async (boardId: string) => {
        setIsLoading(true);
        await loadTicketsFromBoard(boardId);
        setIsLoading(false);
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <IpadCursorBlockWrapper>
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </div>
                    </IpadCursorBlockWrapper>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <IpadCursorBlockWrapper>
                            <li>
                                <a>Homepage</a>
                            </li>
                        </IpadCursorBlockWrapper>
                        <IpadCursorBlockWrapper>
                            <li>
                                <a>Other</a>
                            </li>
                        </IpadCursorBlockWrapper>
                        <IpadCursorBlockWrapper>
                            <li>
                                <a>About</a>
                            </li>
                        </IpadCursorBlockWrapper>
                    </ul>
                </div>

                <div className="dropdown navbar-center cursor-none">
                    <IpadCursorBlockWrapper>
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost  cursor-none text-xl"
                        >
                            {selectedBoardId && !isLoading
                                ? boards.find((b) => b.id === selectedBoardId)
                                      ?.name
                                : "Loading..."}
                        </div>
                    </IpadCursorBlockWrapper>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {boards?.map((board) => (
                            <IpadCursorBlockWrapper key={board.id}>
                                <li
                                    onClick={() => {
                                        changeBoard(board.id);
                                    }}
                                >
                                    <a>{board.name}</a>
                                </li>
                            </IpadCursorBlockWrapper>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="navbar-end">
                <IpadCursorBlockWrapper>
                    <button className="btn btn-ghost ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </IpadCursorBlockWrapper>

                <IpadCursorBlockWrapper>
                    <button className="btn btn-ghost ">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </IpadCursorBlockWrapper>
            </div>
        </div>
    );
}

export default Navbar;
