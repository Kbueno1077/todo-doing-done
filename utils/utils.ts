import { GroupedItem, Item } from "./types";

export function groupByStatus(
    array: Item[] | null
): Record<string, GroupedItem> {
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

export const deepClone = (originalObject: any) => {
    const deepCopy = structuredClone(originalObject);
    return deepCopy;
};

export function showToast(message: string, type = "") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");

    // Use Daisy UI's alert classes
    toast.className = `alert ${getAlertClass(type)}`;

    // Create the inner structure of the alert
    toast.innerHTML = `
      <span>${message}</span>
    `;

    if (container) {
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("fade-out");
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

function getAlertClass(type: string) {
    switch (type) {
        case "info":
            return "alert-info";
        case "success":
            return "alert-success";
        case "warning":
            return "alert-warning";
        case "error":
            return "alert-error";
        default:
            return "";
    }
}
