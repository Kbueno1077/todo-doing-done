"use client";

import { StoreProvider } from "@/store/StoreProvider";
import { type TicketStore } from "@/store/zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { createContext } from "react";

export const StoreContext = createContext<TicketStore | null>(null);
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </StoreProvider>
    );
}
