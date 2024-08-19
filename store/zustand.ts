"use client";
import { persist } from "zustand/middleware";
import { Ticket, User } from "@/utils/types";
import { createStore } from "zustand";
import { createBoardSlice } from "./slices/boardSlice";
import { createTicketSlice } from "./slices/ticketSlice";
import { createUserSlice } from "./slices/userSlice";
import { isMobileOrTablet, showToast } from "@/utils/utils";

export interface StoreProps {
    // STATES
    columns: any;
    boards: any[];
    selectedBoardId: string;
    users: User[];
    cursorType: "Ipad" | "Pointer";

    loadAllBoards: () => Promise<any>;
    loadTicketsFromBoard: (boardId: string) => Promise<any>;
    createBoardAndAddMembers: (
        boardName: string,
        selectedUsers: User[]
    ) => Promise<any>;

    createTicket: (ticket: any, selectedUsers: User[]) => Promise<any>;
    deleteTicket: (ticketid: string) => Promise<any>;
    updateTicket: (
        ticket: { newTicket: any; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment: string
    ) => Promise<any>;

    loadAllUsers: () => Promise<any>;
    setColumns: (columns: any) => void;
    setCursorType: (cursorType: "Ipad" | "Pointer") => void;
}

export type TicketStore = ReturnType<typeof createTicketStore>;

type DefaultProps = {
    selectedBoardId: string;
    columns: any;
    boards: any[];
    users: User[];
    tickets: Ticket[];
    cursorType: "Ipad" | "Pointer";
};
type InitialProps = {};

export const initialColumns = {
    Todo: { id: "Todo", list: [] },
    Doing: {
        id: "Doing",
        list: [],
    },
    Done: {
        id: "Done",
        list: [],
    },
};

export const createTicketStore = (initProps: InitialProps) => {
    const DEFAULT_PROPS: DefaultProps = {
        selectedBoardId: "",
        columns: initialColumns,
        boards: [],
        users: [],
        tickets: [],
        cursorType: isMobileOrTablet()
            ? "Pointer"
            : document.getElementsByClassName("ipad-cursor").length > 0
            ? "Ipad"
            : "Pointer",
    };

    return createStore<StoreProps>()(
        persist(
            (set, get) => ({
                //   STATES
                ...DEFAULT_PROPS,
                ...initProps,

                //SLICES
                ...createTicketSlice(set, get),
                ...createBoardSlice(set, get),
                ...createUserSlice(set, get),

                //   ACTIONS
                setColumns: (columns: any) => {
                    set((state) => ({
                        ...state,
                        columns: columns(state.columns),
                    }));
                },

                setCursorType: (cursorType: "Ipad" | "Pointer") => {
                    if (isMobileOrTablet()) {
                        set((state) => ({
                            ...state,
                            cursorType: "Pointer",
                        }));

                        showToast(
                            "Ipad cursor is not supported on mobile devices",
                            "info"
                        );
                    } else {
                        set((state) => ({
                            ...state,
                            cursorType,
                        }));
                    }
                },
            }),
            {
                name: "save-boards-and-cursor",
                partialize: (state) => ({
                    cursorType: state.cursorType,
                    selectedBoardId: state.selectedBoardId,
                }),
            }
        )
    );
};
