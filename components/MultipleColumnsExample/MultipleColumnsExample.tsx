"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column/Column";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";

function MultipleColumnsExample() {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(true);

    const {
        loadAllUsers,
        loadTicketsFromBoard,
        loadAllBoards,
        columns,
        setColumns,
    } = useStoreContext((s) => {
        return {
            columns: s.columns,
            setColumns: s.setColumns,
            loadTicketsFromBoard: s.loadTicketsFromBoard,
            loadAllUsers: s.loadAllUsers,
            loadAllBoards: s.loadAllBoards,
        };
    });

    const fetchData = async () => {
        setIsLoading(true);

        const boards = await loadAllBoards();
        const users = await loadAllUsers();

        const localStorageBoardId = localStorage.getItem(
            "save-boards-and-cursor"
        );
        const selectedBoardId = JSON.parse(localStorageBoardId ?? "{}").state
            .selectedBoardId;

        const groupedData = await loadTicketsFromBoard(
            selectedBoardId ? selectedBoardId : boards[0].id
        );

        setIsLoading(false);
    };

    // Queries
    const query = useQuery({
        queryKey: ["todos"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    // Mutations
    const mutation = useMutation({
        mutationFn: fetchData,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
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
                        "repeat(auto-fill, minmax(100px, 350px))",
                    width: "100%",
                    gap: "8px",
                    flexGrow: 1,
                }}
            >
                {isLoading ? (
                    <>
                        {Object.values(columns).map((col) => (
                            //@ts-ignore
                            <div className="skeleton h-full w-full"></div>
                        ))}
                    </>
                ) : (
                    Object.values(columns).map((col) => (
                        //@ts-ignore
                        <Column id={col.id} list={col.list} key={col.id} />
                    ))
                )}

                {!isLoading && (
                    <div>
                        <IpadCursorBlockWrapper>
                            <button className="btn rounded-md flex-grow-0 w-full">
                                Create Column
                                <IconPlus size={20} />
                            </button>
                        </IpadCursorBlockWrapper>
                    </div>
                )}
            </div>
        </DragDropContext>
    );
}

export default MultipleColumnsExample;
