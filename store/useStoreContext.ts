import { StoreContext } from "@/app/providers";
import { useContext } from "react";
import { useStore } from "zustand";
import { type GymProps } from "./zustand";

export function useGymContext<T>(selector: (state: GymProps) => T): T {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Missing BearContext.Provider in the tree");
    return useStore(store, selector);
}
