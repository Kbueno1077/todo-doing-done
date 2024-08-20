import { Filter } from "@/utils/types";
import { groupByStatus } from "@/utils/utils";
import { initialColumns } from "../zustand";

export const createFiltersSlice = (set: any, get: any) => ({
    //   STATES
    filters: {},

    //   ACTIONS
    resetFilters: () => {
        const groupedData = groupByStatus(get().tickets);

        set((state) => ({
            ...state,
            filters: {},
            columns: { ...initialColumns, ...groupedData },
        }));
    },

    applyFilters: async (filters: Filter) => {
        const tickets = get().tickets;

        const filteredTickets = tickets.filter((ticket: any) => {
            let isStatusMatch = true;
            let isPriorityMatch = true;
            let isAssignedMatch = true;

            if (filters.status && filters.status.length > 0) {
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
                    ticket.AssignedToTickets.some(
                        (assigned) => assigned.Users.id === user.id
                    )
                );
            }

            return isStatusMatch && isPriorityMatch && isAssignedMatch;
        });

        const groupedData = groupByStatus(filteredTickets);
        console.log("🚀 ~ filteredTickets:", filteredTickets);
        console.log("🚀 ~ groupedData:", groupedData);

        set((state) => ({
            ...state,
            columns: { ...initialColumns, ...groupedData },
            filters,
        }));
    },
});
