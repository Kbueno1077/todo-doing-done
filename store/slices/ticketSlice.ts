import { createClient } from "@/utils/supabase/client";
import { User } from "@/utils/types";
import { showToast } from "@/utils/utils";

const supabase = createClient();

export const createTicketSlice = (set: any, get: any) => ({
    // STATE
    tickets: [],

    //   ACTIONS
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

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            // Reload tickets or update state
            await get().loadTicketsFromBoard(get().selectedBoardId);

            showToast("Ticket created successfully", "success");

            return data;
        } catch (error: any) {
            console.error("Error creating ticket:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while creating the ticket";

            showToast(errorMessage, "Error");
            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    moveTicket: async (
        ticketId: string,
        newStatus: string
    ): Promise<any | Error> => {
        try {
            const { data, error } = await supabase
                .from("Tickets") // Replace 'tickets' with your actual table name
                .update({ status: newStatus })
                .eq("id", ticketId)
                .select();

            if (error) throw error;

            if (!data) {
                throw new Error("Ticket could not be updated");
            }

            return data;
        } catch (error: any) {
            console.error("Error moving ticket:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while moving the ticket";

            await get().loadTicketsFromBoard(get().selectedBoardId);

            showToast(errorMessage, "Error");
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

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            // Reload tickets or update state
            await get().loadTicketsFromBoard(get().selectedBoardId);

            showToast("Ticket updated successfully", "success");

            return { success: true };
        } catch (error: any) {
            console.error("Error updating ticket:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while updating the ticket";

            showToast(errorMessage, "Error");
            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    deleteTicket: async (ticketId: string): Promise<any | Error> => {
        try {
            const { data, error } = await supabase
                .from("Tickets")
                .update({ isActive: false })
                .eq("id", ticketId)
                .select()
                .single();

            if (error) throw error;

            if (!data) {
                throw new Error("No data returned from the update operation");
            }

            await get().loadTicketsFromBoard(get().selectedBoardId);

            showToast("Ticket deleted successfully", "success");
            return { success: true, data };
        } catch (error: any) {
            console.error("Error updating ticket isActive status:", error);

            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while deleting the ticket";

            showToast(errorMessage, "error");
            return {
                success: false,
                error: errorMessage,
            };
        }
    },
});
