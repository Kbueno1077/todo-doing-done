"use client";

import Column from "@/components/Column/Column";
import { useStoreContext } from "@/store/useStoreContext";
import { StoreProps } from "@/store/zustand";
import { Board, UserProfile } from "@/utils/types";
import { deepClone, IS_DEMO_ENV, showToast } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function TicketsDashboard() {
    const queryClient = useQueryClient();
    const router = usePathname();
    const isDemo = router === "/demo";
    const isDasboardOrDemo = router === "/demo" || router === "/dashboard";

    const {
        columns,
        setColumns,
        moveTicket,
        isGlobalLoading,
        tickets,
        setTickets,
        loadBoards,
        loadDemoBoards,
        loggedUser,
        loadTicketsFromBoard,
        loadColumnsFromBoard,
    } = useStoreContext((s) => {
        return {
            columns: s.columns,
            setColumns: s.setColumns,
            loadColumnsFromBoard: s.loadColumnsFromBoard,
            loadTicketsFromBoard: s.loadTicketsFromBoard,
            loadUsersFromBoard: s.loadUsersFromBoard,
            loadBoards: s.loadBoards,
            loadDemoBoards: s.loadDemoBoards,
            moveTicket: s.moveTicket,
            isGlobalLoading: s.isGlobalLoading,
            tickets: s.tickets,
            setTickets: s.setTickets,
            loggedUser: s.loggedUser,
        };
    });

    const fetchData = async (user: UserProfile | null) => {
        let boards: Board[] = [];

        if (isDasboardOrDemo) {
            if (!user || isDemo) {
                boards = await loadDemoBoards();
                await loadColumnsFromBoard();
            } else {
                boards = await loadBoards();
                await loadColumnsFromBoard();

                if (boards.length === 0) {
                    showToast(
                        "Please create your first board or wait for and invitation from some other member",
                        "info"
                    );
                    return boards;
                }
            }

            const localStorageBoardId = localStorage.getItem(
                "save-boards-and-cursor"
            );
            const selectedBoardId = JSON.parse(localStorageBoardId ?? "{}")
                .state.selectedBoardId;

            const groupedData = await loadTicketsFromBoard(
                selectedBoardId ? selectedBoardId : boards[0]?.id
            );

            return { boards, groupedData };
        }
        return {};
    };

    // Queries
    const query = useQuery({
        queryKey: ["todos", loggedUser?.id ?? "Demo"],
        queryFn: () => fetchData(loggedUser),
        refetchOnWindowFocus: false,
    });

    // Mutations
    const mutation = useMutation({
        mutationFn: fetchData,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ["todos", loggedUser?.id ?? "Demo"],
            });
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
                name: start.name,
                index: start.index,
                list: newList,
            };

            // Update the state
            setColumns((state: StoreProps) => ({
                ...state,
                [newCol.name]: newCol,
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
                name: start.name,
                index: start.index,
                list: newStartList,
            };

            // Make a new end list array
            const newEndList = end.list;

            // Insert the item into the end list
            start.list[source.index].status = destination.droppableId;
            newEndList.splice(destination.index, 0, start.list[source.index]);

            // Create a new end column
            const newEndCol = {
                id: end.id,
                name: end.name,
                index: end.index,
                list: newEndList,
            };

            const movedTicket = columns[source.droppableId].list[source.index];
            console.log("🚀 ~ onDragEnd ~ movedTicket:", movedTicket);
            const newStatus = destination.droppableId;

            const updateTickets = deepClone(tickets);
            const updateTicketIndex = updateTickets.findIndex(
                (t) => t.id === movedTicket.id
            );

            updateTickets[updateTicketIndex].status = newStatus;

            // Update the state
            setTickets(updateTickets);
            setColumns((state: StoreProps) => ({
                ...state,
                [newStartCol.name]: newStartCol,
                [newEndCol.name]: newEndCol,
            }));

            // Update in BD
            if (IS_DEMO_ENV !== process.env.NEXT_PUBLIC_IS_DEMO) {
                moveTicket(movedTicket.id ?? "", newStatus);
            }

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
                                name={col.name}
                                key={col.id + col.index}
                            />
                        ))
                )}
            </div>
        </DragDropContext>
    );
}

export default TicketsDashboard;
