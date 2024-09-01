import { createClient } from "@/utils/supabase/client";
import { Ticket } from "@/utils/types";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

export const mockSlice = (set: Function, get: Function) => ({
    mockCreateTicket: async (ticket: Ticket, selectedUsers: User[]) => {},
});
