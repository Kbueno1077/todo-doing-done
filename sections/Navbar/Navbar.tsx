"use client";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import ThemeController from "@/components/ThemeController/ThemeController";
import { useStoreContext } from "@/store/useStoreContext";
import { disposeCursor, initCursor } from "ipad-cursor";
import CreateBoard from "@/modules/CreateBoard/CreateBoard";

import {
    IconAlignJustified,
    IconFilter,
    IconInnerShadowBottomRight,
    IconPointer,
} from "@tabler/icons-react";
import Filters from "@/modules/Filters/Filters";

function Navbar() {
    const {
        selectedBoardId,
        boards,
        loadTicketsFromBoard,
        cursorType,
        setCursorType,
        isGlobalLoading,
    } = useStoreContext((s) => {
        return {
            selectedBoardId: s.selectedBoardId,
            boards: s.boards,
            cursorType: s.cursorType,
            loadTicketsFromBoard: s.loadTicketsFromBoard,
            setCursorType: s.setCursorType,
            isGlobalLoading: s.isGlobalLoading,
        };
    });

    const changeBoard = async (boardId: string) => {
        if (boardId !== selectedBoardId) {
            await loadTicketsFromBoard(boardId);
        }
    };

    const initPointer = () => {
        initCursor();
        setCursorType("Ipad");
        const cursors = document.getElementsByClassName("ipad-cursor");

        if (cursors.length > 0) {
            cursors[0].remove();
        }
    };

    const disposePointer = () => {
        disposeCursor();
        setCursorType("Pointer");
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown navbar-center cursor-none">
                    <IpadCursorBlockWrapper>
                        <div className="flex items-center">
                            <div
                                tabIndex={0}
                                role="button"
                                className="hidden sm:block btn btn-ghost text-xl pt-2"
                            >
                                {selectedBoardId && !isGlobalLoading
                                    ? boards.find(
                                          (b) => b.id === selectedBoardId
                                      )?.name
                                    : "Loading..."}
                            </div>

                            <div
                                tabIndex={0}
                                className="sm:hidden ml-3"
                                role="button"
                            >
                                <IconAlignJustified size={20} />
                            </div>
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
                                    <a
                                        className={`${
                                            selectedBoardId === board.id &&
                                            "bg-primary text-base-content"
                                        }`}
                                    >
                                        {board.name}
                                    </a>
                                </li>
                            </IpadCursorBlockWrapper>
                        ))}
                    </ul>
                </div>
                <div className="ml-2">
                    <CreateBoard />
                </div>
            </div>

            <div className="navbar-end sm:mr-4 sm:gap-2">
                <Filters />

                {cursorType === "Ipad" ? (
                    <IpadCursorBlockWrapper>
                        <button
                            className="btn btn-ghost"
                            onClick={disposePointer}
                        >
                            <IconPointer size={20} />
                        </button>
                    </IpadCursorBlockWrapper>
                ) : (
                    <IpadCursorBlockWrapper>
                        <button className="btn btn-ghost" onClick={initPointer}>
                            <IconInnerShadowBottomRight size={20} />
                        </button>
                    </IpadCursorBlockWrapper>
                )}

                {/* <IpadCursorBlockWrapper>
                    <button
                        onClick={() => {
                            showToast("Notification");
                        }}
                        className="btn btn-ghost "
                    >
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
                </IpadCursorBlockWrapper> */}

                <ThemeController />
            </div>
        </div>
    );
}

export default Navbar;
