import { createClient } from "@/utils/supabase/client";
import { groupByStatus } from "@/utils/utils";
import { initialColumns } from "../zustand";

const supabase = createClient();

export const createBoardSlice = (set: any, get: any) => ({
    loadAllBoards: async () => {
        const { data: boardData } = await supabase
            .from("Boards")
            .select("*, BoardMembership(*, Users(*))");

        set((state) => ({
            ...state,
            boards: boardData || [],
        }));
        return boardData;
    },

    //@deprecated
    loadAllTickets: async () => {
        set((state) => ({
            ...state,
            tickets: [],
            columns: initialColumns,
        }));

        const { data: todoData } = await supabase
            .from("Tickets")
            .select("*, AssignedToTickets(*, Users(*))");

        const groupedData = groupByStatus(todoData);

        set((state) => ({
            ...state,
            tickets: groupedData,
            columns: { ...initialColumns, ...groupedData },
        }));
        return groupedData;
    },

    loadTicketsFromBoard: async (boardId: string) => {
        set((state) => ({
            ...state,
            tickets: [],
            columns: initialColumns,
        }));

        const { data: ticketData, error } = await supabase
            .from("Tickets")
            .select("*, AssignedToTickets(*, Users(*))")
            .eq("board_id", boardId);

        if (error) {
            console.error("Error loading tickets:", error);
            return null;
        }

        const groupedData = groupByStatus(ticketData);

        set((state) => ({
            ...state,
            tickets: groupedData,
            columns: { ...initialColumns, ...groupedData },
            selectedBoardId: boardId,
        }));
        return groupedData;
    },
});
