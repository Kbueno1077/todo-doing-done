import { createStore } from "zustand";

export interface GymProps {}

export type TicketStore = ReturnType<typeof createTicketStore>;

type DefaultProps = object;
type InitialProps = object;

export const createTicketStore = (initProps: InitialProps) => {
    const DEFAULT_PROPS: DefaultProps = {};

    return createStore<GymProps>((set, get) => ({
        //   STATES
        ...DEFAULT_PROPS,
        ...initProps,
    }));
};
