import { GroupedItem, Item } from "./types";

export function groupByStatus(array: Item[] | null): Record<string, GroupedItem> {

    if (!array) return {};
    
    return array.reduce((groups: Record<string, GroupedItem>, item: Item) => {
      const status = item.status;
      if (!groups[status]) {
        groups[status] = { id: status, list: [] };
      }
      groups[status].list.push(item);
      return groups;
    }, {});
  }