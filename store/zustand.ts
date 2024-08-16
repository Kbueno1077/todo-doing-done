import { persist } from "zustand/middleware";
import { Ticket, User } from "@/utils/types";
import { createStore } from "zustand";
import { createBoardSlice } from "./slices/boardSlice";
import { createTicketSlice } from "./slices/ticketSlice";
import { createUserSlice } from "./slices/userSlice";

export interface StoreProps {
    // STATES
    columns: any;
    boards: any[];
    selectedBoardId: string;
    users: User[];
    loadAllBoards: () => Promise<any>;
    loadAllTickets: () => Promise<any>;
    loadTicketsFromBoard: (boardId: string) => Promise<any>;
    loadAllUsers: () => Promise<any>;
    createTicket: (ticket: any, selectedUsers: User[]) => Promise<any>;
    updateTicket: (
        ticket: { newTicket: any; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment: string
    ) => Promise<any>;
    setColumns: (columns: any) => void;
}

export type TicketStore = ReturnType<typeof createTicketStore>;

type DefaultProps = {
    selectedBoardId: string;
    columns: any;
    boards: any[];
    users: User[];
    tickets: Ticket[];
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
            }),
            {
                name: "save-boards",
                partialize: (state) => ({
                    selectedBoardId: state.selectedBoardId,
                }),
            }
        )
    );
};
