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
import { isMobileOrTablet } from "@/utils/utils";
import {
    IconAlignJustified,
    IconInnerShadowBottomRight,
    IconPointer,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Navbar({ user }: { user: UserProfile | null }) {
    const router = usePathname();
    const queryClient = useQueryClient();

    const isDasboardOrDemo = router === "/demo" || router === "/dashboard";

    const {
        selectedBoardId,
        boards,
        loadTicketsFromBoard,
        cursorType,
        setCursorType,
        isGlobalLoading,
        setLoggedUser,
        loggedUser,
        loadDemoBoards,
        loadBoards,
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
            loadDemoBoards: s.loadDemoBoards,
            loadBoards: s.loadBoards,
        };
    });

    const changeBoard = async (boardId: string) => {
        if (boardId !== selectedBoardId) {
            await loadTicketsFromBoard(boardId);
        }
    };

    const fetchUser = async (user: UserProfile | null) => {
        setLoggedUser(user);
    };

    const query = useQuery({
        queryKey: [user?.id ?? "Demo"],
        queryFn: () => fetchUser(user),
        refetchOnWindowFocus: false,
    });

    // Mutations
    const mutation = useMutation({
        mutationFn: fetchUser,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [user?.id ?? "Demo"] });
        },
    });

    useEffect(() => {
        setLoggedUser(user);
    }, [user]);

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
        <div className="navbar bg-transparent w-full" style={{ zIndex: 1100 }}>
            {isDasboardOrDemo && (
                <div className="navbar-start">
                    <div className="dropdown navbar-center cursor-none">
                        <IpadCursorBlockWrapper>
                            <div className="flex items-center">
                                {boards.length > 0 && (
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="hidden sm:block btn btn-ghost text-xl pt-2"
                                    >
                                        {selectedBoardId && !isGlobalLoading
                                            ? boards.find(
                                                  (b) =>
                                                      b.id === selectedBoardId
                                              )?.name
                                            : "Loading..."}
                                    </div>
                                )}

                                <div
                                    tabIndex={0}
                                    className="sm:hidden ml-3 mr-1"
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
            <div className="navbar-end w-full sm:mr-4 gap-2">
                {isDasboardOrDemo && <Filters />}

                <div className={`${isMobileOrTablet() && "hidden"}`}>
                    {cursorType === "Ipad" ? (
                        <IpadCursorBlockWrapper>
                            <button
                                className="btn btn-square btn-ghost rounded-md btn-sm sm:btn-md"
                                onClick={disposePointer}
                            >
                                <IconPointer size={20} />
                            </button>
                        </IpadCursorBlockWrapper>
                    ) : (
                        <IpadCursorBlockWrapper>
                            <button
                                className="btn btn-square btn-ghost btn-sm sm:btn-md rounded-md"
                                onClick={initPointer}
                            >
                                <IconInnerShadowBottomRight size={20} />
                            </button>
                        </IpadCursorBlockWrapper>
                    )}
                </div>

                <ThemeController />
                {loggedUser ? <AuthMenu /> : <NoAuthMenu />}
            </div>
        </div>
    );
}

export default Navbar;
