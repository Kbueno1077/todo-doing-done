"use client";

import { StoreProvider } from "@/store/StoreProvider";
import { useStoreContext } from "@/store/useStoreContext";
import { type TicketStore } from "@/store/zustand";
import { isMobileOrTablet } from "@/utils/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { disposeCursor } from "ipad-cursor";

import React, { createContext, useEffect } from "react";

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
