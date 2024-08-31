"use client";

import Column from "@/components/Column/Column";
import { useStoreContext } from "@/store/useStoreContext";
import { StoreProps } from "@/store/zustand";
import { Ticket } from "@/utils/types";
import { deepClone } from "@/utils/utils";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function TicketsDashboard() {
    const {
        columns,
        setColumns,
        moveTicket,
        isGlobalLoading,
        tickets,
        setTickets,
    } = useStoreContext((s) => {
        return {
            columns: s.columns,
            setColumns: s.setColumns,
            loadTicketsFromBoard: s.loadTicketsFromBoard,
            loadUsersFromBoard: s.loadUsersFromBoard,
            loadBoards: s.loadBoards,
            loadDemoBoards: s.loadDemoBoards,
            moveTicket: s.moveTicket,
            isGlobalLoading: s.isGlobalLoading,
            tickets: s.tickets,
            setTickets: s.setTickets,
        };
    });

    const onDragEnd = ({ source, destination }: DropResult) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) {
            return null;
        }

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        ) {
            return null;
        }

        // Set start and end variables
        const start = columns[source.droppableId];
        const end = columns[destination.droppableId];

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_, idx: number) => idx !== source.index
            );

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index]);

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                index: start.index,
                list: newList,
            };

            // Update the state
            setColumns((state: StoreProps) => ({
                ...state,
                [newCol.id]: newCol,
            }));

            return null;
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.filter(
                (_, idx: number) => idx !== source.index
            );

            // Create a new start column
            const newStartCol = {
                id: start.id,
                index: start.index,
                list: newStartList,
            };

            // Make a new end list array
            const newEndList = end.list;

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, start.list[source.index]);

            // Create a new end column
            const newEndCol = {
                id: end.id,
                index: end.index,
                list: newEndList,
            };

            const movedTicket = columns[source.droppableId].list[source.index];
            const newStatus = destination.droppableId;

            const updateTickets = deepClone(tickets) as Ticket[];
            const updateTicketIndex = updateTickets.findIndex(
                (t) => t.id === movedTicket.id
            );
            updateTickets[updateTicketIndex].status = newStatus;

            // Update the state
            setTickets(updateTickets);
            setColumns((state: StoreProps) => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            }));

            // Update in BD
            moveTicket(movedTicket.id ?? "", newStatus);

            return null;
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                style={{
                    display: "grid",
                    overflow: "auto",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 350px))",
                    width: "100%",
                    gap: "8px",
                    flexGrow: 1,
                }}
            >
                {isGlobalLoading ? (
                    <>
                        {Object.values(columns).map((col) => (
                            <div
                                key={col.id}
                                className="skeleton h-full w-full"
                            ></div>
                        ))}
                    </>
                ) : (
                    Object.values(columns)
                        .sort((a: any, b: any) => a.index - b.index)
                        .map((col: any) => (
                            <Column
                                id={col.id}
                                list={col.list}
                                key={col.id + col.index}
                            />
                        ))
                )}
            </div>
        </DragDropContext>
    );
}

export default TicketsDashboard;
