import { createClient } from "@/utils/supabase/client";
import { GroupedItem, User } from "@/utils/types";
import {
    deepClone,
    groupByStatus,
    IS_DEMO_ENV,
    showToast,
} from "@/utils/utils";
import { StoreProps } from "../zustand";
import { Ticket } from "./../../utils/types";

const supabase = createClient();

export const createTicketSlice = (set: Function, get: Function) => ({
    // STATE
    tickets: [],

    //   ACTIONS
    setTickets: (tickets: Ticket[]) => {
        set((state: StoreProps) => ({
            ...state,
            tickets: tickets,
        }));
    },

    createTicket: async (
        ticket: Ticket,
        selectedUsers: User[]
    ): Promise<any | Error> => {
        try {
            const { data, error } =
                IS_DEMO_ENV !== process.env.NEXT_PUBLIC_IS_DEMO
                    ? await supabase.rpc("create_ticket_and_assign_users", {
                          ticket_data: ticket,
                          p_user_ids: selectedUsers.map((user) => user.id),
                      })
                    : get().mockCreateTicket(ticket, selectedUsers);

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            data.AssignedToTickets = [];
            selectedUsers.forEach((user) => {
                data.AssignedToTickets.push({
                    Users: user,
                    ticket_id: ticket.id,
                });
            });

            const tickets = deepClone(get().tickets);
            tickets.push(data);

            const groupedTickets = groupByStatus(
                tickets,
                get().columnsFromBoard
            );

            set((state: StoreProps) => ({
                ...state,
                tickets,
                columns: { ...get().columnsFromBoard, ...groupedTickets },
            }));

            return data;
        } catch (error: any) {
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while creating the ticket";

            showToast(errorMessage, "error");

            await get().loadTicketsFromBoard(get().selectedBoardId);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    updateTicket: async (
        ticket: { newTicket: Ticket; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment?: string
    ): Promise<{ success: boolean } | Error> => {
        try {
            const { data, error } =
                IS_DEMO_ENV !== process.env.NEXT_PUBLIC_IS_DEMO
                    ? await supabase.rpc("update_ticket_and_assignments", {
                          p_ticket_data: ticket.newTicket,
                          p_update_ticket: ticket.isUpdateNeeded,
                          p_user_ids: users.selectedUsers.map(
                              (user) => user.id
                          ),
                          p_update_users: users.isUpdateNeeded,
                          p_author_id: get().loggedUser?.id || null,
                          p_comment: comment || null,
                      })
                    : get().mockUpdateTicket(ticket, users, comment);

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            const tickets = deepClone(get().tickets);
            const index = tickets.findIndex(
                (t: Ticket) => t.id === ticket.newTicket.id
            );

            const currentAssignedToTickets = deepClone(
                tickets[index].AssignedToTickets ?? []
            );

            tickets[index] = data;

            if (users.isUpdateNeeded) {
                //@ts-ignore
                tickets[index].AssignedToTickets = users.selectedUsers.map(
                    (user) => {
                        return {
                            Users: user,
                            ticket_id: ticket.newTicket.id,
                        };
                    }
                );
            } else {
                //@ts-ignore
                tickets[index].AssignedToTickets = currentAssignedToTickets;
            }

            const columns = deepClone(get().columns);
            const groupedTickets = groupByStatus(tickets, columns);
            set((state: StoreProps) => ({
                ...state,
                tickets,
                columns: { ...columns, ...groupedTickets },
            }));

            showToast("Ticket updated successfully", "success");

            return { success: true };
        } catch (error: any) {
            console.error("Error updating ticket:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while updating the ticket";
            showToast(errorMessage, "error");

            await get().loadTicketsFromBoard(get().selectedBoardId);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    deleteTicket: async (ticketId: string): Promise<any | Error> => {
        try {
            let supData = null;
            if (IS_DEMO_ENV !== process.env.NEXT_PUBLIC_IS_DEMO) {
                const { data: supData, error } = await supabase
                    .from("Tickets")
                    .update({ isActive: false })
                    .eq("id", ticketId)
                    .select()
                    .single();

                if (error) throw error;

                if (!supData) {
                    throw new Error(
                        "No data returned from the update operation"
                    );
                }
            }

            const tickets = deepClone(get().tickets);
            const index = tickets.findIndex((t: Ticket) => t.id === ticketId);

            tickets.splice(index, 1);

            const columns = deepClone(get().columnsFromBoard);
            const groupedTickets = groupByStatus(
                tickets,
                get().columnsFromBoard
            );

            set((state: StoreProps) => ({
                ...state,
                tickets,
                columns: { ...columns, ...groupedTickets },
            }));

            showToast("Ticket deleted successfully", "success");
            return { success: true, data: supData ? supData : tickets[index] };
        } catch (error: any) {
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while deleting the ticket";

            await get().loadTicketsFromBoard(get().selectedBoardId);

            showToast(errorMessage, "error");
            return {
                success: false,
                error: errorMessage,
            };
        }
    },

    moveTicket: async (
        ticketId: string,
        newStatus: string
    ): Promise<any | Error> => {
        try {
            const { data, error } = await supabase
                .from("Tickets")
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

            showToast(errorMessage, "error");
            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },
});
