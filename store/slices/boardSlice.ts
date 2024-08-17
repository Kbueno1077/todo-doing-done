import { createClient } from "@/utils/supabase/client";
import { deepClone, groupByStatus } from "@/utils/utils";
import { initialColumns } from "../zustand";
import { User } from "@/utils/types";

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

    loadTicketsFromBoard: async (boardId: string) => {
        const initalColumnsInit = deepClone(initialColumns);

        set((state) => ({
            ...state,
            tickets: [],
            columns: initalColumnsInit,
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
            columns: { ...initalColumnsInit, ...groupedData },
            selectedBoardId: boardId,
        }));
        return groupedData;
    },

    createBoardAndAddMembers: async (
        boardName: string,
        selectedUsers: User[]
    ): Promise<any | Error> => {
        try {
            const { data, error } = await supabase.rpc(
                "create_board_and_add_members",
                {
                    p_board_name: boardName,
                    p_user_ids: selectedUsers.map((user) => user.id),
                }
            );

            if (error) throw error;

            // The function returns the new board's ID
            const newBoardId = data;

            await get().loadAllBoards();
            await get().loadTicketsFromBoard(newBoardId);

            return { success: true };
        } catch (error) {
            console.error("Error creating board and adding members:", error);
            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },
});
