"use client";

import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import ThemeController from "@/components/ThemeController/ThemeController";
import CreateBoard from "@/modules/CreateBoard/CreateBoard";
import { useStoreContext } from "@/store/useStoreContext";
import { disposeCursor, initCursor } from "ipad-cursor";

import AuthMenu from "@/components/AuthMenu/AuthMenu";
import NoAuthMenu from "@/components/AuthMenu/NoAuthMenu";
import BoardSettings from "@/modules/BoardSettings/BoardSettings";
import Filters from "@/modules/Filters/Filters";
import { UserProfile } from "@/utils/types";
import {
    IconAlignJustified,
    IconInnerShadowBottomRight,
    IconPointer,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Navbar({ user }: { user: UserProfile | null }) {
    const {
        selectedBoardId,
        boards,
        loadTicketsFromBoard,
        cursorType,
        setCursorType,
        isGlobalLoading,
        setLoggedUser,
        loggedUser,
    } = useStoreContext((s) => {
        return {
            selectedBoardId: s.selectedBoardId,
            boards: s.boards,
            cursorType: s.cursorType,
            loadTicketsFromBoard: s.loadTicketsFromBoard,
            setCursorType: s.setCursorType,
            isGlobalLoading: s.isGlobalLoading,
            setLoggedUser: s.setLoggedUser,
            loggedUser: s.loggedUser,
        };
    });

    useEffect(() => {
        setLoggedUser(user);
    }, [user]);

    const router = usePathname();

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

    const isDasboardOrDemo = router === "/demo" || router === "/dashboard";

    return (
        <div className="navbar bg-base-100 w-full ">
            {isDasboardOrDemo && (
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
                    <div className="ml-2">
                        <BoardSettings />
                    </div>
                </div>
            )}
            <div className="navbar-end w-full sm:mr-4 sm:gap-2">
                {isDasboardOrDemo && <Filters />}

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

                <ThemeController />
                {loggedUser ? <AuthMenu /> : <NoAuthMenu />}
            </div>
        </div>
    );
}

export default Navbar;
