"use client";

import {
    Board,
    Filter,
    GroupedItem,
    Ticket,
    User,
    UserProfile,
} from "@/utils/types";
import { isMobileOrTablet, showToast } from "@/utils/utils";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { createBoardSlice } from "./slices/boardSlice";
import { createFiltersSlice } from "./slices/filtersSlice";
import { createTicketSlice } from "./slices/ticketSlice";
import { createUserSlice } from "./slices/userSlice";
import { mockSlice } from "./slices/mockSlice";
import { columnSlice } from "./slices/columnSlice";

export interface StoreProps {
    // STATES
    boards: Board[];
    tickets: Ticket[];
    columns: Record<string, GroupedItem>;
    columnsFromBoard: Record<string, GroupedItem>;
    selectedBoardId: string;
    users: User[];
    loggedUser: UserProfile | null;
    filters: Filter;
    cursorType: "Ipad" | "Pointer";
    isGlobalLoading: boolean;

    //Boards
    loadBoards: () => Promise<any>;
    loadDemoBoards: () => Promise<any>;
    loadTicketsFromBoard: (boardId: string) => Promise<any>;
    sendInvite: (email: string) => Promise<any>;
    createBoardAndAddMembers: (
        boardName: string,
        selectedUsers: User[]
    ) => Promise<any>;

    //Tickets
    setTickets: (tickets: Ticket[]) => void;
    createTicket: (ticket: Ticket, selectedUsers: User[]) => Promise<any>;
    moveTicket: (ticketId: string, status: string) => Promise<any>;
    deleteTicket: (ticketid: string) => Promise<any>;
    updateTicket: (
        ticket: { newTicket: Ticket; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment: string
    ) => Promise<any>;

    //Filters
    applyFilters: (filters: Filter) => void;
    resetFilters: () => void;

    //Users
    loadUsersFromBoard: (boardId: string) => Promise<any>;
    setLoggedUser: (user: UserProfile | null) => void;

    //Columns
    loadColumnsFromBoard: () => void;
    setColumns: (columns: Function) => void;
    updateColumns: (columns: Record<string, GroupedItem>) => void;
    setColumnsStatic: (columns: Record<string, GroupedItem>) => void;

    //Misc
    setIsLoading: (isLoading: boolean) => void;
    setCursorType: (cursorType: "Ipad" | "Pointer") => void;
    clearAfterSignOut: () => void;
}

export type TicketStore = ReturnType<typeof createTicketStore>;

type DefaultProps = {
    cursorType: "Ipad" | "Pointer";
    isGlobalLoading: boolean;
};
type InitialProps = {};

export const initialColumns: Record<string, GroupedItem> = {
    Todo: { id: "Todo", name: "Todo", list: [], index: 0 },
    Doing: {
        id: "Doing",
        name: "Doing",
        list: [],
        index: 1,
    },

    QA: {
        id: "QA",
        name: "QA",
        list: [],
        index: 2,
    },

    Done: {
        id: "Done",
        name: "Done",
        list: [],
        index: 3,
    },
};

export const createTicketStore = (initProps: InitialProps) => {
    const DEFAULT_PROPS: DefaultProps = {
        isGlobalLoading: false,
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
                ...createFiltersSlice(set, get),
                ...columnSlice(set, get),
                ...mockSlice(set, get),

                //   ACTIONS
                setIsLoading: (isLoading: boolean) => {
                    set((state) => ({
                        ...state,
                        isGlobalLoading: isLoading,
                    }));
                },

                clearAfterSignOut: () => {
                    set((state: StoreProps) => ({
                        ...state,
                        tickets: [],
                        users: [],
                        boards: [],
                        filters: {},
                        selectedBoardId: "",
                        columns: initialColumns,
                        columnsFromBoard: {},
                        loggedUser: null,
                    }));
                },

                setCursorType: (cursorType: "Ipad" | "Pointer") => {
                    if (isMobileOrTablet()) {
                        set((state: StoreProps) => ({
                            ...state,
                            cursorType: "Pointer",
                        }));

                        showToast(
                            "Ipad cursor is not supported on mobile devices",
                            "info"
                        );
                    } else {
                        set((state: StoreProps) => ({
                            ...state,
                            cursorType,
                        }));
                    }
                },
            }),
            {
                name: "save-boards-and-cursor",
                partialize: (state) => ({
                    columns: state.columns,
                    selectedBoardId: state.selectedBoardId,
                    cursorType: state.cursorType,
                }),
            }
        )
    );
};
