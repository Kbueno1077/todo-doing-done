import { createClient } from "@/utils/supabase/client";
import { UserProfile } from "@/utils/types";
import { showToast } from "@/utils/utils";
import { StoreProps } from "../zustand";

const supabase = createClient();

export const createUserSlice = (set: Function, get: Function) => ({
    // STATE
    users: [],
    loggedUser: null,

    //   ACTIONS
    loadUsersFromBoard: async (boardId: string) => {
        try {
            if (!boardId) {
                throw new Error("No board selected");
            }

            const { data, error } = await supabase
                .from("BoardMembership")
                .select("Users(*)")
                .eq("board_id", boardId);

            if (error) throw error;

            if (!data) {
                throw new Error("No user data returned from the server");
            }

            const users = data.map((item) => item.Users).filter(Boolean);

            set((state: StoreProps) => ({ ...state, users: users || [] }));
            return users;
        } catch (error: any) {
            console.error("Error loading users:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading users";
            showToast(errorMessage, "error");

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

    setLoggedUser: (user: UserProfile | null) => {
        set((state: StoreProps) => ({ ...state, loggedUser: user }));
    },
});
