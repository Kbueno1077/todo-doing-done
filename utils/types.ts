export interface Ticket {
    id: string;
    title: string;
    description: string;
    assignedTo: AssignedTo[] | never[];
    priority?: number;
    footer?: {};
}

export interface AssignedTo {
    id: string;
    name: string;
    img?: string;
}

export interface TicketList {
    id: string;
    list: Ticket[] | never[];
}
