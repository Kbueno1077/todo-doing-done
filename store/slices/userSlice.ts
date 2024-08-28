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
    loadAllUsers: async () => {
        try {
            const { data, error } = await supabase.from("Users").select("*");

            if (error) throw error;

            if (!data) {
                throw new Error("No user ID returned from the server");
            }

            set((state: StoreProps) => ({ ...state, users: data || [] }));
            return data;
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

    setLoggedUser: (user: UserProfile | null) => {
        set((state: StoreProps) => ({ ...state, loggedUser: user }));
    },
});
