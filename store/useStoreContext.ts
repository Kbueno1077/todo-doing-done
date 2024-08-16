import { StoreContext } from "@/app/providers";
import { useContext } from "react";
import { useStore } from "zustand";
import { type StoreProps } from "./zustand";

export function useStoreContext<T>(selector: (state: StoreProps) => T): T {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Missing BearContext.Provider in the tree");
    return useStore(store, selector);
}
