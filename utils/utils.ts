import { GroupedItem, Ticket } from "./types";

export const DEMO_USER_ID = "DEMO-ID-USER";
export const IS_DEMO_ENV = "IS_DEMO_TRUE";

export function groupByStatus(
    array: Ticket[] | null,
    initialColumnsData: Record<string, GroupedItem>
): Record<string, GroupedItem> {
    if (!array) return {};

    const savedColumns = deepClone(initialColumnsData);

    let latestIndex = Math.max(
        ...Object.values(initialColumnsData).map((col) => col.index),
        -1
    );

    const columnsFromTickets = array.reduce(
        (groups: Record<string, GroupedItem>, item: Ticket) => {
            const status = item.status;
            if (!groups[status]) {
                if (initialColumnsData[status]) {
                    groups[status] = {
                        name: status,
                        id: initialColumnsData[status].id,
                        list: [],
                        index: initialColumnsData[status].index,
                    };
                } else {
                    latestIndex++;
                    groups[status] = {
                        id: status,
                        name: status,
                        list: [],
                        index: latestIndex,
                    };
                }
            }
            groups[status].list.push(item);
            return groups;
        },
        {}
    );

    const savedGroupedColumns = deepClone(columnsFromTickets);

    Object.keys(savedColumns).forEach((key) => {
        if (!savedGroupedColumns[key]) {
            savedGroupedColumns[key] = {
                id: savedColumns[key].id,
                name: key,
                list: [],
                index: savedColumns[key].index,
            };
        }
    });

    return savedGroupedColumns;
}

export const deepClone = <T>(originalObject: T): T => {
    return structuredClone(originalObject) as T;
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
    const isSmallScreen = window.innerWidth <= 1024;

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
