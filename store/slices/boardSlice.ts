import { demoBoards } from "@/mock/demoBoards";
import { mockTickets } from "@/mock/demoTickets";
import { createClient } from "@/utils/supabase/client";
import { User } from "@/utils/types";
import {
  deepClone,
  groupByStatus,
  IS_DEMO_ENV,
  showToast,
} from "@/utils/utils";
import { StoreProps } from "../zustand";

const supabase = createClient();

export const createBoardSlice = (set: Function, get: Function) => ({
  // STATE
  selectedBoardId: "",
  boards: [],

  // ACTIONS
  loadDemoBoards: async () => {
    try {
      get().setIsLoading(true);

      set((state: StoreProps) => ({
        ...state,
        boards: demoBoards || [],
      }));

      get().setIsLoading(false);
      return demoBoards;
    } catch (error: any) {
      console.error("Error loading boards:", error);
      const errorMessage = error?.message
        ? error?.message
        : "An unexpected error occurred while loading boards";
      showToast(errorMessage, "error");
      get().setIsLoading(false);

      return error instanceof Error
        ? error
        : new Error("An unknown error occurred");
    }
  },

  loadBoards: async () => {
    try {
      get().setIsLoading(true);

      const user = get().loggedUser;

      if (!user) {
        await get().loadDemoBoards();
        return;
      }

      const { data, error } = await supabase
        .from("BoardMembership")
        .select("board_id, Boards(*, BoardMembership(*, Users(*)))")
        .eq("user_id", user.id);

      if (error) throw error;

      if (!data) {
        throw new Error("No board data returned from the server");
      }

      const boards = data.map((item) => item.Boards).filter(Boolean);

      set((state: StoreProps) => ({
        ...state,
        boards: boards || [],
      }));

      get().setIsLoading(false);
      return boards;
    } catch (error: any) {
      console.error("Error loading boards:", error);
      const errorMessage = error?.message
        ? error?.message
        : "An unexpected error occurred while loading boards";
      showToast(errorMessage, "error");
      get().setIsLoading(false);

      return error instanceof Error
        ? error
        : new Error("An unknown error occurred");
    }
  },

  loadTicketsFromBoard: async (boardId: string) => {
    try {
      get().setIsLoading(true);

      const columnsFromBoard = deepClone(get().columnsFromBoard);

      set((state: StoreProps) => ({
        ...state,
        tickets: [],
        columns: columnsFromBoard,
      }));

      await get().loadUsersFromBoard(boardId);

      const data = mockTickets.filter((ticket) => ticket.board_id === boardId);

      const groupedData = groupByStatus(data, get().columns);

      set((state: StoreProps) => ({
        ...state,
        tickets: data,
        columns: { ...columnsFromBoard, ...groupedData },
        selectedBoardId: boardId,
      }));

      get().setIsLoading(false);
      return groupedData;
    } catch (error: any) {
      console.error("Error loading tickets:", error);
      const errorMessage = error?.message
        ? error?.message
        : "An unexpected error occurred while loading tickets";
      showToast(errorMessage, "error");
      get().setIsLoading(false);

      return error instanceof Error
        ? error
        : new Error("An unknown error occurred");
    }
  },

  createBoardAndAddMembers: async (
    boardName: string,
    selectedUsers: User[]
  ): Promise<any | Error> => {
    try {
      if (IS_DEMO_ENV === process.env.NEXT_PUBLIC_IS_DEMO) {
        showToast(
          "Creating board and adding members is not available in the demo",
          "error"
        );
        return;
      }

      get().setIsLoading(true);
      const { data, error } = await supabase.rpc(
        "create_board_and_add_members",
        {
          p_board_name: boardName,
          p_user_ids: selectedUsers.map((user) => user.id),
        }
      );

      if (error) throw error;

      if (!data) {
        throw new Error("No board ID returned from the server");
      }

      // The function returns the new board's ID
      const newBoardId = data;

      await get().loadTicketsFromBoard(newBoardId);

      showToast("Board created successfully", "success");
      get().setIsLoading(false);

      return { success: true };
    } catch (error: any) {
      console.error("Error creating board and adding members:", error);
      const errorMessage = error?.message
        ? error?.message
        : "An unexpected error occurred while creating the board";
      showToast(errorMessage, "error");
      get().setIsLoading(false);

      return error instanceof Error
        ? error
        : new Error("An unknown error occurred");
    }
  },
});
