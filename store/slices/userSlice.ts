import { createClient } from "@/utils/supabase/client";
import { showToast } from "@/utils/utils";

const supabase = createClient();

export const createUserSlice = (set: any, get: any) => ({
    loadAllUsers: async () => {
        try {
            const { data, error } = await supabase.from("Users").select("*");

            if (error) throw error;

            if (!data) {
                throw new Error("No user ID returned from the server");
            }

            set((state) => ({ ...state, users: data || [] }));
            return data;
        } catch (error: any) {
            console.error("Error loading users:", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading users";
            showToast(errorMessage, "Error");

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },
});
