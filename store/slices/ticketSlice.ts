import { createClient } from "@/utils/supabase/client";
import { User } from "@/utils/types";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase = createClient();

export const createTicketSlice = (set: any, get: any) => ({
    createTicket: async (
        ticket: any,
        selectedUsers: User[]
    ): Promise<any | Error> => {
        try {
            const { data, error } = await supabase.rpc(
                "create_ticket_and_assign_users",
                {
                    ticket_data: ticket,
                    p_user_ids: selectedUsers.map((user) => user.id),
                }
            );

            if (error) throw error;

            // Reload tickets or update state
            await get().loadTicketsFromBoard(get().selectedBoardId);

            return data;
        } catch (error) {
            console.error("Error creating ticket:", error);
            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    updateTicket: async (
        ticket: { newTicket: any; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment?: string
    ): Promise<{ success: boolean } | Error> => {
        try {
            const { data, error } = await supabase.rpc(
                "update_ticket_and_assignments",
                {
                    p_ticket_data: ticket.newTicket,
                    p_update_ticket: ticket.isUpdateNeeded,
                    p_user_ids: users.selectedUsers.map((user) => user.id),
                    p_update_users: users.isUpdateNeeded,
                    p_comment: comment || null,
                }
            );

            if (error) throw error;

            // Reload tickets or update state
            await get().loadTicketsFromBoard(get().selectedBoardId);

            return { success: true };
        } catch (error) {
            console.error("Error updating ticket:", error);
            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },
});
