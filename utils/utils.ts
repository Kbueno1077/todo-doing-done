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

export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string | number>>
) => {
    const value =
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setter(value);
};

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

export function isMobileOrTablet() {
    // Check for touch capability
    const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Check screen size
    const isSmallScreen = window.innerWidth <= 1024; // Adjust this value as needed

    // Check user agent string for common mobile/tablet keywords
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
    ];
    const isMobileAgent = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
    );

    return hasTouchScreen && (isSmallScreen || isMobileAgent);
}
