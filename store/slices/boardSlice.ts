import { createClient } from "@/utils/supabase/client";
import { deepClone, groupByStatus, showToast } from "@/utils/utils";
import { initialColumns } from "../zustand";
import { User } from "@/utils/types";

const supabase = createClient();

export const createBoardSlice = (set: any, get: any) => ({
    loadAllBoards: async () => {
        try {
            const { data, error } = await supabase
                .from("Boards")
                .select("*, BoardMembership(*, Users(*))");

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            set((state) => ({
                ...state,
                boards: data || [],
            }));

            return data;
        } catch (error: any) {
            console.error("Error loading boards:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading boards";
            showToast(errorMessage, "Error");

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    loadTicketsFromBoard: async (boardId: string) => {
        try {
            const initalColumnsInit = deepClone(initialColumns);

            set((state) => ({
                ...state,
                tickets: [],
                columns: initalColumnsInit,
            }));

            const { data, error } = await supabase
                .from("Tickets")
                .select("*, AssignedToTickets(*, Users(*))")
                .eq("board_id", boardId)
                .eq("isActive", true);

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            const groupedData = groupByStatus(data);

            set((state) => ({
                ...state,
                tickets: groupedData,
                columns: { ...initalColumnsInit, ...groupedData },
                selectedBoardId: boardId,
            }));

            return groupedData;
        } catch (error: any) {
            console.error("Error loading tickets:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading tickets";
            showToast(errorMessage, "Error");

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
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

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            // The function returns the new board's ID
            const newBoardId = data;

            await get().loadAllBoards();
            await get().loadTicketsFromBoard(newBoardId);

            showToast("Board created successfully", "success");

            return { success: true };
        } catch (error: any) {
            console.error("Error creating board and adding members:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while creating the board";
            showToast(errorMessage, "Error");

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },
});
