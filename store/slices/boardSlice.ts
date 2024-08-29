import { createClient } from "@/utils/supabase/client";
import { deepClone, groupByStatus, showToast } from "@/utils/utils";
import { initialColumns, StoreProps } from "../zustand";
import { User } from "@/utils/types";

const supabase = createClient();

export const createBoardSlice = (set: Function, get: Function) => ({
    // STATE
    selectedBoardId: "",
    boards: [],

    //   ACTIONS
    loadAllBoards: async () => {
        try {
            get().setIsLoading(true);

            const { data, error } = await supabase
                .from("Boards")
                .select("*, BoardMembership(*, Users(*))");

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            set((state: StoreProps) => ({
                ...state,
                boards: data || [],
            }));

            get().setIsLoading(false);
            return data;
        } catch (error: any) {
            console.error("Error loading boards:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading boards";
            showToast(errorMessage, "error");
            get().setIsLoading(false);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    loadTicketsFromBoard: async (boardId: string) => {
        try {
            get().setIsLoading(true);
            const initalColumnsInit = deepClone(initialColumns);

            set((state: StoreProps) => ({
                ...state,
                tickets: [],
                columns: initalColumnsInit,
            }));

            const { data, error } = await supabase
                .from("Tickets")
                .select("*, AssignedToTickets(*, Users(*))")
                .eq("board_id", boardId)
                .eq("isActive", true);

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            const groupedData = groupByStatus(data, get().columns);

            set((state: StoreProps) => ({
                ...state,
                tickets: data,
                columns: { ...initalColumnsInit, ...groupedData },
                selectedBoardId: boardId,
            }));

            get().setIsLoading(false);
            return groupedData;
        } catch (error: any) {
            console.error("Error loading tickets:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading tickets";
            showToast(errorMessage, "error");
            get().setIsLoading(false);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    createBoardAndAddMembers: async (
        boardName: string,
        selectedUsers: User[]
    ): Promise<any | Error> => {
        try {
            get().setIsLoading(true);
            const { data, error } = await supabase.rpc(
                "create_board_and_add_members",
                {
                    p_board_name: boardName,
                    p_user_ids: selectedUsers.map((user) => user.id),
                }
            );

            if (error) throw error;

            if (!data) {
                throw new Error("No board ID returned from the server");
            }

            // The function returns the new board's ID
            const newBoardId = data;

            await get().loadAllBoards();
            await get().loadTicketsFromBoard(newBoardId);

            showToast("Board created successfully", "success");
            get().setIsLoading(false);

            return { success: true };
        } catch (error: any) {
            console.error("Error creating board and adding members:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while creating the board";
            showToast(errorMessage, "error");
            get().setIsLoading(false);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    sendInvite: async (email: string): Promise<any | Error> => {
        try {
            // Check if the user is already registered
            const getAllUsersResponse = await fetch("/api/getUserByEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const getAllUsersData = await getAllUsersResponse.json();

            if (getAllUsersData.error) {
                throw new Error(getAllUsersData.error);
            }

            // If not we have to send the invitation
            let invitationSent = false;
            if (getAllUsersData.data === "User not found") {
                const invitationResponse = await fetch("/api/sendInvitation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const invitationData = await invitationResponse.json();

                if (
                    invitationData.error &&
                    invitationData.errorData.code !== "email_exists"
                ) {
                    throw new Error(invitationData.error);
                }

                invitationSent = true;
            }

            // If user exists or invitation was sent we can add the user to table "Users" and to the board
            if (getAllUsersData.user || invitationSent) {
                const userId = getAllUsersData.user.id;
                const boardId = get().selectedBoardId;

                const boardInsertData = await supabase.rpc(
                    "insert_user_and_board_membership",
                    {
                        p_user_id: userId,
                        p_user_name: email.split("@")[0],
                        p_board_id: boardId,
                    }
                );

                if (boardInsertData.error) {
                    if (boardInsertData.error.code === "23505") {
                        throw new Error(
                            "This user is already registered to this board"
                        );
                    } else {
                        throw new Error();
                    }
                }

                if (boardInsertData.data) {
                    showToast(
                        "This user is already registered, so no invitation is neccessary, it is added to the board",
                        "success"
                    );
                    return;
                }
            }
        } catch (error: any) {
            console.error("Error sending invitation:", error);

            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while sending the invitation";

            if (error.message === "Email rate limit exceeded") {
                showToast(
                    "Sorry this is a DEMO app, so we have a rate limit of invites",
                    "info"
                );
            } else {
                showToast(errorMessage, "error");
            }

            get().setIsLoading(false);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },
});
