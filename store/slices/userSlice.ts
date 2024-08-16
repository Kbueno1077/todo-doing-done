import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const createUserSlice = (set: any, get: any) => ({
    loadAllUsers: async () => {
        const { data: userData } = await supabase.from("Users").select("*");

        set((state) => ({ ...state, users: userData || [] }));
        return userData;
    },
});
