"use client";

import { StoreProvider } from "@/store/StoreProvider";
import { type TicketStore } from "@/store/zustand";

import React, { createContext } from "react";

export const StoreContext = createContext<TicketStore | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
    return <StoreProvider>{children}</StoreProvider>;
}
