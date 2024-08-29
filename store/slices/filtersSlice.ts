import { AssignedToTickets, Filter, Ticket } from "@/utils/types";
import { groupByStatus } from "@/utils/utils";
import { StoreProps } from "../zustand";

export const createFiltersSlice = (set: Function, get: Function) => ({
    //   STATES
    filters: {},

    //   ACTIONS
    resetFilters: () => {
        const groupedData = groupByStatus(get().tickets, get().columns);

        set((state: StoreProps) => ({
            ...state,
            filters: {},
            columns: { ...get().columns, ...groupedData },
        }));
    },

    applyFilters: async (filters: Filter) => {
        const tickets = get().tickets;

        const filteredTickets = tickets.filter((ticket: Ticket) => {
            let isStatusMatch = true;
            let isPriorityMatch = true;
            let isAssignedMatch = true;

            if (filters.status && filters.status.length > 0 && ticket.status) {
                isStatusMatch = filters.status.includes(ticket.status);
            }

            if (
                filters.priority !== undefined &&
                filters.priority !== null &&
                filters.priority > -1
            ) {
                isPriorityMatch =
                    filters.priority === -1 ||
                    ticket.priority === filters.priority;
            }

            if (filters.assignedTo && filters.assignedTo.length > 0) {
                isAssignedMatch = filters.assignedTo.some((user) =>
                    ticket.AssignedToTickets?.some(
                        (assigned: AssignedToTickets) =>
                            assigned.Users.id === user.id
                    )
                );
            }

            return isStatusMatch && isPriorityMatch && isAssignedMatch;
        });

        const groupedData = groupByStatus(filteredTickets, get().columns);

        set((state: StoreProps) => ({
            ...state,
            columns: { ...get().columns, ...groupedData },
            filters,
        }));
    },
});
