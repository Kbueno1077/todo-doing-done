import { createClient } from "@/utils/supabase/client";
import { GroupedItem } from "@/utils/types";
import { initialColumns, StoreProps } from "../zustand";
import { IS_DEMO_ENV, showToast } from "@/utils/utils";

const supabase = createClient();

const mockedDemoData = [
  {
    id: "3ed39366-1aca-4449-9f4b-41090c501bb2",
    created_at: "2024-09-01T00:42:39.910581+00:00",
    updated_at: "2024-09-01T00:42:39.910581+00:00",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    column_id: "7c922709-2bb0-46f4-8b7a-6698d2f240d7",
    Columns: {
      id: "7c922709-2bb0-46f4-8b7a-6698d2f240d7",
      name: "Todo",
      index: 0,
      created_at: "2024-09-01T00:42:39.910581+00:00",
      updated_at: "2024-09-01T00:42:39.910581+00:00",
    },
  },
  {
    id: "7bbcd17f-7ffd-42c5-a96f-bebee0ae82d4",
    created_at: "2024-09-01T00:42:39.910581+00:00",
    updated_at: "2024-09-01T00:42:39.910581+00:00",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    column_id: "437f7849-2215-4313-9647-370ed18e0783",
    Columns: {
      id: "437f7849-2215-4313-9647-370ed18e0783",
      name: "Doing",
      index: 1,
      created_at: "2024-09-01T00:42:39.910581+00:00",
      updated_at: "2024-09-01T00:42:39.910581+00:00",
    },
  },
  {
    id: "c475a00f-310c-43a6-bed4-dc49abd8b04c",
    created_at: "2024-09-01T00:42:39.910581+00:00",
    updated_at: "2024-09-01T00:42:39.910581+00:00",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    column_id: "273bc0c7-327a-481d-88cb-c2d39b3c3b54",
    Columns: {
      id: "273bc0c7-327a-481d-88cb-c2d39b3c3b54",
      name: "QA",
      index: 2,
      created_at: "2024-09-01T00:42:39.910581+00:00",
      updated_at: "2024-09-01T00:42:39.910581+00:00",
    },
  },
  {
    id: "b8bdaec9-723c-4dc9-87d3-32ac14bfd15c",
    created_at: "2024-09-01T00:42:39.910581+00:00",
    updated_at: "2024-09-01T00:42:39.910581+00:00",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    column_id: "4e8df429-a175-4456-a696-70676bab8770",
    Columns: {
      id: "4e8df429-a175-4456-a696-70676bab8770",
      name: "Done",
      index: 3,
      created_at: "2024-09-01T00:42:39.910581+00:00",
      updated_at: "2024-09-01T00:42:39.910581+00:00",
    },
  },
];

export const columnSlice = (set: Function, get: Function) => ({
  columns: initialColumns,
  columnsFromBoard: {},

  loadColumnsFromBoard: async () => {
    try {
      get().setIsLoading(true);

      const boardId = get().selectedBoardId;

      //   if (error) throw error;

      if (!mockedDemoData) {
        throw new Error("No board ID returned from the server");
      }

      const columns: Record<string, GroupedItem> = {};
      mockedDemoData.forEach((item: any) => {
        columns[item.Columns.name] = {
          id: item.Columns.id,
          name: item.Columns.name,
          list: [],
          index: item.Columns.index,
        };
      });

      set((state: StoreProps) => ({
        ...state,
        columnsFromBoard: columns,
      }));

      get().setIsLoading(false);
      return mockedDemoData;
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

  updateColumns: async (newColumns: Record<string, GroupedItem>) => {
    try {
      if (IS_DEMO_ENV === process.env.NEXT_PUBLIC_IS_DEMO) {
        return;
      }

      const columns = Object.values(newColumns).map((item) => {
        return {
          id: item.id !== item.name ? item.id : null,
          name: item.name,
          index: item.index,
        };
      });

      const boardId = get().selectedBoardId;

      const { data, error } = await supabase.rpc(
        "update_columns_and_board_columns",
        {
          p_columns: columns,
          p_board_id: boardId,
        }
      );

      if (error) throw error;

      if (!data) {
        throw new Error("No Column ID returned from the server");
      }

      get().loadColumnsFromBoard();
    } catch (error: any) {
      console.error("Error modifying columns:", error);
      const errorMessage = error?.message
        ? error?.message
        : "An unexpected error occurred while modifying columns";
      showToast(errorMessage, "error");

      return error instanceof Error
        ? error
        : new Error("An unknown error occurred");
    }
  },

  setColumns: (columns: Function) => {
    set((state: StoreProps) => ({
      ...state,
      columns: columns(state.columns),
    }));
  },

  setColumnsStatic: (columns: Record<string, GroupedItem>) => {
    set((state: StoreProps) => ({
      ...state,
      columns,
    }));
  },
});
