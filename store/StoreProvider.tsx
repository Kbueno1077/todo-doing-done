import { StoreContext } from "@/app/providers";
import { useRef } from "react";
import { createTicketStore, type TicketStore } from "./zustand";

export function StoreProvider({
    children,
    ...props
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<TicketStore>();
    if (!storeRef.current) {
        storeRef.current = createTicketStore({});
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    );
}
