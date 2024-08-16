export interface Ticket {
    id: string;
    title?: string;
    description?: string;
    AssignedToTickets?: AssignedToTickets[] | never[];
    priority?: number;
    Comments?: Comment[] | never[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Comment {
    id: string;
    Users: User;
    content: string;
    createdAt: string;
    updatedAt: string;
    author_id: string;
    ticket_id: string;
}

export interface AssignedToTickets {
    id: string;
    createdAt: string;
    updatedAt: string;
    ticket_id: string;
    user_id: string;
    Users: User;
}

export interface User {
    createdAt: string;
    updatedAt: string;
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
