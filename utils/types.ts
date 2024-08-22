import { User as SupabaseUser } from "@supabase/supabase-js";

export interface Ticket {
    id: string;
    title?: string;
    description?: string;
    AssignedToTickets?: AssignedToTickets[] | never[];
    priority?: number;
    status?: string;
    Comments?: Comment[] | never[];
    created_at?: string;
    updated_at?: string;
}

export interface Comment {
    id: string;
    Users: User;
    content: string;
    created_at: string;
    updated_at: string;
    author_id: string;
    ticket_id: string;
}

export interface AssignedToTickets {
    id: string;
    created_at: string;
    updated_at: string;
    ticket_id: string;
    user_id: string;
    Users: User;
}

export interface User {
    created_at: string;
    updated_at: string;
    id: string;
    name: string;
    img?: string;
}

export interface UserProfile extends SupabaseUser {
    created_at: string;
    updated_at: string;
    id: string;
    name: string;
    img?: string;
}

export interface TicketList {
    id: string;
    list: Ticket[] | never[];
}

export interface Item {
    status: string;
    [key: string]: any; // Allow other properties
}

export interface GroupedItem {
    id: string;
    list: Item[];
}

export interface Filter {
    status?: string[];
    priority?: number;
    priorityRange?: string;
    assignedTo?: User[];
    created_at?: string;
    updated_at?: string;
    operand?: string;
}
