"use client";

import { persist } from "zustand/middleware";
import { Filter, Ticket, User } from "@/utils/types";
import { createStore } from "zustand";
import { createBoardSlice } from "./slices/boardSlice";
import { createTicketSlice } from "./slices/ticketSlice";
import { createUserSlice } from "./slices/userSlice";
import { isMobileOrTablet, showToast } from "@/utils/utils";
import { createFiltersSlice } from "./slices/filtersSlice";

export interface StoreProps {
    // STATES
    columns: any;
    boards: any[];
    selectedBoardId: string;
    users: User[];
    cursorType: "Ipad" | "Pointer";
    isGlobalLoading: boolean;
    filters: Filter;

    //Boards
    loadAllBoards: () => Promise<any>;
    loadTicketsFromBoard: (boardId: string) => Promise<any>;
    createBoardAndAddMembers: (
        boardName: string,
        selectedUsers: User[]
    ) => Promise<any>;

    //Tickets
    createTicket: (ticket: any, selectedUsers: User[]) => Promise<any>;
    moveTicket: (ticketId: string, status: string) => Promise<any>;
    deleteTicket: (ticketid: string) => Promise<any>;
    updateTicket: (
        ticket: { newTicket: any; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment: string
    ) => Promise<any>;

    //Filters
    applyFilters: (filters: Filter) => void;
    resetFilters: () => void;

    //Users
    loadAllUsers: () => Promise<any>;

    //Misc
    setColumns: (columns: any) => void;
    setIsLoading: (isLoading: boolean) => void;
    setCursorType: (cursorType: "Ipad" | "Pointer") => void;
}

export type TicketStore = ReturnType<typeof createTicketStore>;

type DefaultProps = {
    columns: any;
    cursorType: "Ipad" | "Pointer";
    isGlobalLoading: boolean;
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
