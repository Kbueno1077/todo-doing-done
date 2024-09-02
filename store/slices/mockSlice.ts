import { Ticket } from "@/utils/types";
import { DEMO_USER_ID } from "@/utils/utils";
import { User } from "@supabase/supabase-js";
import { uuid } from "uuidv4";

export const mockSlice = (set: Function, get: Function) => ({
    mockCreateTicket: (ticket: Ticket, selectedUsers: User[]) => {
        const newTicket = {
            ...ticket,
            id: uuid(),
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        };

        return { data: newTicket, error: null };
    },

    mockUpdateTicket: (
        ticket: { newTicket: Ticket; isUpdateNeeded: boolean },
        users: { selectedUsers: User[]; isUpdateNeeded: boolean },
        comment?: string
    ) => {
        const boardUsers = get().users;
        const Comments = ticket.newTicket.Comments || [];

        if (comment) {
            Comments.push({
                id: uuid(),
                content: comment,
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                Users: {
                    id: DEMO_USER_ID,
                    name: "Guest",
                    img: "",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
                author_id: DEMO_USER_ID,
                ticket_id: ticket.newTicket.id || uuid(),
            });
        }

        const newTicket = {
            ...ticket.newTicket,
            udated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            Comments,

            AssignedToTickets: users.selectedUsers.map((user) => {
                const assignedToTicket = boardUsers.find(
                    (u: any) => u.id === user.id
                );

                return {
                    Users: assignedToTicket,
                    ticket_id: ticket.newTicket.id,
                };
            }),
        };

        return { data: newTicket, error: null };
    },
});
