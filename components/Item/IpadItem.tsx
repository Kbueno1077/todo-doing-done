"use client";

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";
import { Ticket } from "@/utils/types";

interface IpadItemProps {
    ticket: Ticket;
    index: number;
}

const IpadItem: React.FC<IpadItemProps> = ({ ticket, index }) => {
    return (
        <Draggable draggableId={ticket.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <IpadCursorBlockWrapper>
                        <div
                            className="w-full bg-primary/20 rounded-md py-4 px-2 flex flex-col mt-2"
                            onClick={() => {
                                console.log(`Clicked item: ${ticket.id}`);
                            }}
                        >
                            <div>
                                <h1>{ticket.title}</h1>
                            </div>

                            <div>
                                <p> {ticket.description}</p>
                            </div>
                        </div>
                    </IpadCursorBlockWrapper>
                </div>
            )}
        </Draggable>
    );
};

export default IpadItem;
