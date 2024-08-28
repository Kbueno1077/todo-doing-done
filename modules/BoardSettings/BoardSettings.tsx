"use client";

import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import ZodInput from "@/components/ZodInput/ZodInput";
import { useStoreContext } from "@/store/useStoreContext";
import { deepClone } from "@/utils/utils";
import {
    IconColumnInsertRight,
    IconSquareArrowDown,
    IconSquareArrowUp,
    IconTableColumn,
} from "@tabler/icons-react";
import { useState } from "react";
import { z } from "zod";
import InviteUser from "../InviteUser/InviteUser";
import { GroupedItem } from "@/utils/types";

const createColumnSchema = z.object({
    columnName: z.string().min(1, { message: "Ticket title is required" }),
});

type CreateColumnFormData = z.infer<typeof createColumnSchema>;

function BoardSettings() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingColumn, setIsCreatingColumn] = useState(false);

    const [formData, setFormData] = useState<CreateColumnFormData>({
        columnName: "",
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof CreateColumnFormData, string>>
    >({});

    const { columns, setColumnsStatic, loggedUser } = useStoreContext((s) => {
        return {
            columns: s.columns,
            setColumnsStatic: s.setColumnsStatic,
            loggedUser: s.loggedUser,
        };
    });

    const [columnsTemp, setColumnsTemp] = useState<any>({});

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    function openModal() {
        document.addEventListener("keydown", handleKeyDown);
        setColumnsTemp(deepClone(columns));
        setIsOpen(true);
    }

    function closeModal() {
        document.removeEventListener("keydown", handleKeyDown);
        setIsOpen(false);
    }

    const handleFormChange = (
        name: keyof CreateColumnFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate the field
        const result = createColumnSchema.shape[name].safeParse(value);
        if (!result.success) {
            setErrors((prev) => ({
                ...prev,
                [name]: result.error.errors[0].message,
            }));
        } else {
            setErrors((prev) => {
                const { [name]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const createColumnOn = () => {
        setIsCreatingColumn(true);
    };

    const createColumnOff = () => {
        setIsCreatingColumn(false);
    };

    const createColumn = () => {
        const result = createColumnSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Partial<
                Record<keyof CreateColumnFormData, string>
            > = {};
            result.error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    newErrors[issue.path[0] as keyof CreateColumnFormData] =
                        issue.message;
                }
            });

            if (columnsTemp[formData.columnName]) {
                newErrors.columnName = "Column already exists";
            }

            setErrors(newErrors);
            return;
        }

        if (columnsTemp[formData.columnName]) {
            const newErrors: Partial<
                Record<keyof CreateColumnFormData, string>
            > = {};

            newErrors.columnName = "Column already exists";

            setErrors(newErrors);
            return;
        }

        const newColumn = {
            id: formData.columnName,
            list: [],
            index: Object.values(columnsTemp).length,
        };

        setColumnsTemp((prevColumns: Record<string, GroupedItem>) => {
            const newColumns = deepClone(prevColumns) as Record<
                string,
                GroupedItem
            >;
            newColumns[newColumn.id] = newColumn;
            return newColumns;
        });

        createColumnOff();
    };

    function updateIndices(propertyName: string, direction: string) {
        const obj = deepClone(columnsTemp) as Record<string, GroupedItem>;

        if (!obj.hasOwnProperty(propertyName)) {
            console.error(`Property "${propertyName}" not found.`);
            return obj;
        }

        const currentIndex = obj[propertyName].index;
        let newIndex;

        if (direction === "up") {
            newIndex = currentIndex - 1;
        } else if (direction === "down") {
            newIndex = currentIndex + 1;
        } else {
            console.error('Invalid direction. Use "up" or "down".');
            return obj;
        }

        // Find the property with the new index
        let swapProperty;
        for (let key in obj) {
            if (obj[key].index === newIndex) {
                swapProperty = key;
                break;
            }
        }

        // If a property with the new index exists, swap the indices
        if (swapProperty) {
            obj[swapProperty].index = currentIndex;
            obj[propertyName].index = newIndex;
        }

        setColumnsTemp(obj);

        return obj;
    }

    const handleSubmit = () => {
        setColumnsStatic(columnsTemp);
        closeModal();
    };

    return (
        <>
            <IpadCursorBlockWrapper>
                <button
                    onClick={openModal}
                    className="btn btn-square rounded-md btn-sm"
                >
                    <IconTableColumn size={20} />
                </button>
            </IpadCursorBlockWrapper>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] text-base-content overflow-y-auto">
                    <div className="flex min-h-full p-3 md:p-0 justify-center items-center">
                        <div className="w-full sm:w-3/4 max-w-[1280px] bg-base-300 rounded-md p-4 sm:p-8 flex flex-col my-4">
                            <IpadCursorBlockWrapper type="text">
                                <div className="flex gap-4 items-center py-4">
                                    <IconTableColumn size={30} />
                                    <h1 className="font-bold text-2xl">
                                        Board Settings
                                    </h1>
                                </div>
                            </IpadCursorBlockWrapper>

                            <div className="flex flex-col gap-4 py-4">
                                {Object.values(columnsTemp)
                                    .sort((a: any, b: any) => a.index - b.index)
                                    .map((column: any, index) => {
                                        return (
                                            <div
                                                key={column.id}
                                                className="flex gap-4 w-full"
                                            >
                                                <div className="flex gap-2 w-full">
                                                    <div className="join w-full">
                                                        <IpadCursorBlockWrapper
                                                            disabled={
                                                                index === 0
                                                            }
                                                            onClick={() =>
                                                                updateIndices(
                                                                    column.id,
                                                                    "up"
                                                                )
                                                            }
                                                            className="btn join-item w-1/4"
                                                        >
                                                            <button>
                                                                <IconSquareArrowUp
                                                                    size={20}
                                                                />
                                                            </button>
                                                        </IpadCursorBlockWrapper>
                                                        <IpadCursorBlockWrapper className="btn join-item w-2/4">
                                                            <button>
                                                                {column.id}
                                                            </button>
                                                        </IpadCursorBlockWrapper>
                                                        <IpadCursorBlockWrapper
                                                            onClick={() =>
                                                                updateIndices(
                                                                    column.id,
                                                                    "down"
                                                                )
                                                            }
                                                            disabled={
                                                                index ===
                                                                Object.values(
                                                                    columnsTemp
                                                                ).length -
                                                                    1
                                                            }
                                                            className="btn join-item w-1/4"
                                                        >
                                                            <button>
                                                                <IconSquareArrowDown
                                                                    size={20}
                                                                />
                                                            </button>
                                                        </IpadCursorBlockWrapper>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {!isCreatingColumn && (
                                    <IpadCursorBlockWrapper>
                                        <button
                                            className="btn rounded-md flex-grow-0 w-full"
                                            onClick={createColumnOn}
                                        >
                                            Create Column
                                            <IconColumnInsertRight size={20} />
                                        </button>
                                    </IpadCursorBlockWrapper>
                                )}

                                {isCreatingColumn && (
                                    <div className="flex gap-4">
                                        <IpadCursorBlockWrapper
                                            type="text"
                                            className="w-full"
                                        >
                                            <ZodInput
                                                schema={createColumnSchema}
                                                name="columnName"
                                                label="Column Name"
                                                value={formData.columnName}
                                                //@ts-ignore
                                                onChange={handleFormChange}
                                                error={errors.columnName}
                                                placeholder="Column Name"
                                                disabled={isLoading}
                                                className="input input-bordered w-full text-lg"
                                            />
                                        </IpadCursorBlockWrapper>

                                        <IpadCursorBlockWrapper>
                                            <button
                                                className="btn"
                                                onClick={createColumnOff}
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </button>
                                        </IpadCursorBlockWrapper>

                                        <IpadCursorBlockWrapper>
                                            <button
                                                className="btn btn-success"
                                                disabled={isLoading}
                                                onClick={createColumn}
                                            >
                                                Add
                                            </button>
                                        </IpadCursorBlockWrapper>
                                    </div>
                                )}
                            </div>

                            {loggedUser && (
                                <div className="mb-4">
                                    <InviteUser />
                                </div>
                            )}

                            <div className="flex gap-2 w-full justify-end mt-4">
                                <IpadCursorBlockWrapper>
                                    <button
                                        className="btn"
                                        onClick={closeModal}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                </IpadCursorBlockWrapper>

                                <IpadCursorBlockWrapper>
                                    <button
                                        className="btn btn-success"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="loading loading-bars loading-xs"></span>
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                </IpadCursorBlockWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BoardSettings;
