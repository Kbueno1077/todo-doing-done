import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { useStoreContext } from "@/store/useStoreContext";
import React, { MouseEventHandler, useState } from "react";

function DeleteTicket({
    ticketId,
    toggleDelete,
    closeModal,
}: {
    ticketId: string;
    toggleDelete: MouseEventHandler<HTMLButtonElement>;
    closeModal: Function;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const { deleteTicket } = useStoreContext((s) => {
        return {
            deleteTicket: s.deleteTicket,
        };
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        deleteTicket(ticketId);
        setIsLoading(false);
        toggleDelete(e);
        closeModal();
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mt-5">
                Are you sure you want to delete this ticket?
            </h1>

            <div className="flex gap-2 w-full items-center justify-end mt-6">
                <div className="flex gap-2">
                    <IpadCursorBlockWrapper>
                        <button
                            className="btn"
                            onClick={toggleDelete}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper>
                        <button
                            className="btn btn-error"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-bars loading-xs"></span>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </IpadCursorBlockWrapper>
                </div>
            </div>
        </div>
    );
}

export default DeleteTicket;
