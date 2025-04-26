import { mockedColumns } from "@/mock/demoColumns";
import { createClient } from "@/utils/supabase/client";
import { GroupedItem } from "@/utils/types";
import { IS_DEMO_ENV, showToast } from "@/utils/utils";
import { initialColumns, StoreProps } from "../zustand";

const supabase = createClient();

export const columnSlice = (set: Function, get: Function) => ({
  columns: initialColumns,
  columnsFromBoard: {},

  loadColumnsFromBoard: async () => {
    try {
      get().setIsLoading(true);

      const boardId = get().selectedBoardId;

      if (!mockedColumns) {
        throw new Error("No board ID returned from the server");
      }

      const columns: Record<string, GroupedItem> = {};
      mockedColumns.forEach((item: any) => {
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
      return mockedColumns;
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
