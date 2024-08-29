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

export interface StoreProps {
    // STATES
    columns: Record<string, GroupedItem>;
    boards: Board[];
    selectedBoardId: string;
    users: User[];
    cursorType: "Ipad" | "Pointer";
    isGlobalLoading: boolean;
    filters: Filter;
    loggedUser: UserProfile | null;
    tickets: Ticket[];

    //Boards
    loadAllBoards: () => Promise<any>;
    loadTicketsFromBoard: (boardId: string) => Promise<any>;
    sendInvite: (email: string) => Promise<any>;
    createBoardAndAddMembers: (
        boardName: string,
        selectedUsers: User[]
    ) => Promise<any>;

    //Tickets
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
    loadAllUsers: () => Promise<any>;
    setLoggedUser: (user: UserProfile | null) => void;

    //Misc
    //Type for Set Columns is different from the setColumnsStatic as setColumns is used when Drag and Drop
    setColumns: (columns: Function) => void;
    setTickets: (tickets: Ticket[]) => void;
    setColumnsStatic: (columns: Record<string, GroupedItem>) => void;
    setIsLoading: (isLoading: boolean) => void;
    setCursorType: (cursorType: "Ipad" | "Pointer") => void;
}

export type TicketStore = ReturnType<typeof createTicketStore>;

type DefaultProps = {
    columns: Record<string, GroupedItem>;
    cursorType: "Ipad" | "Pointer";
    isGlobalLoading: boolean;
};
type InitialProps = {};

export const initialColumns: Record<string, GroupedItem> = {
    Todo: { id: "Todo", list: [], index: 0 },
    Doing: {
        id: "Doing",
        list: [],
        index: 1,
    },
    Done: {
        id: "Done",
        list: [],
        index: 2,
    },

    // Todo2: { id: "Todo2", list: [], index: 0 },
    // Doing2: {
    //     id: "Doing2",
    //     list: [],
    //     index: 1,
    // },
    // Done2: {
    //     id: "Done2",
    //     list: [],
    //     index: 2,
    // },

    // Todo3: { id: "Todo3", list: [], index: 0 },
    // Doing3: {
    //     id: "Doing3",
    //     list: [],
    //     index: 1,
    // },
    // Done3: {
    //     id: "Done3",
    //     list: [],
    //     index: 2,
    // },
};

export const createTicketStore = (initProps: InitialProps) => {
    const DEFAULT_PROPS: DefaultProps = {
        columns: initialColumns,
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

                //   ACTIONS
                setIsLoading: (isLoading: boolean) => {
                    set((state) => ({
                        ...state,
                        isGlobalLoading: isLoading,
                    }));
                },

                // ONLY FOR MOVEMENT
                setColumns: (columns) => {
                    set((state: StoreProps) => ({
                        ...state,
                        columns: columns(state.columns),
                    }));
                },

                setColumnsStatic: (columns) => {
                    set((state: StoreProps) => ({
                        ...state,
                        columns,
                    }));
                },

                setTickets: (tickets: Ticket[]) => {
                    set((state: StoreProps) => ({
                        ...state,
                        tickets: tickets,
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
                    cursorType: state.cursorType,
                    selectedBoardId: state.selectedBoardId,
                    columns: state.columns,
                }),
            }
        )
    );
};
