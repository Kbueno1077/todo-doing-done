"use client";

import React, { useState } from "react";
import Column from "../Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { mockTickets } from "@/mock/mockTickets";

function MultipleColumnsExample() {
    const initialColumns = {
        todo: {
            id: "todo",
            list: mockTickets,
        },
        doing: {
            id: "doing",
            list: [],
        },
        done: {
            id: "done",
            list: [],
        },
    };
    const [columns, setColumns] = useState(initialColumns);

    const onDragEnd = ({ source, destination }: DropResult) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null;

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null;

        // Set start and end variables

        //@ts-ignore
        const start = columns[source.droppableId];
        //@ts-ignore
        const end = columns[destination.droppableId];

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_: any, idx: number) => idx !== source.index
            );

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index]);

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                list: newList,
            };

            // Update the state
            setColumns((state) => ({ ...state, [newCol.id]: newCol }));
            return null;
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.filter(
                (_: any, idx: number) => idx !== source.index
            );

            // Create a new start column
            const newStartCol = {
                id: start.id,
                list: newStartList,
            };

            // Make a new end list array
            const newEndList = end.list;

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, start.list[source.index]);

            // Create a new end column
            const newEndCol = {
                id: end.id,
                list: newEndList,
            };

            // Update the state
            setColumns((state) => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            }));
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
                        "repeat(auto-fill, minmax(100px, 250px))",
                    width: "100%",
                    gap: "8px",
                    padding: "12px 20px 12px",
                    flexGrow: 1,
                }}
            >
                {Object.values(columns).map((col) => (
                    <Column col={col} key={col.id} />
                ))}
            </div>
        </DragDropContext>
    );
}

export default MultipleColumnsExample;
