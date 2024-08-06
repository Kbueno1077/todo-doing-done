import React from "react";
import { Droppable } from "react-beautiful-dnd";
import IpadItem from "../Item/IpadItem";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";
import { Ticket } from "@/utils/types";

interface ColumnProps {
    col: {
        id: string;
        list: Ticket[];
    };
}
const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div className="flex flex-col">
                    <IpadCursorBlockWrapper type="text">
                        <h2 className="bg-primary rounded-md px-1 py-2 uppercase font-bold">
                            {id}
                        </h2>
                    </IpadCursorBlockWrapper>

                    <div
                        className="bg-primary/10 rounded-md p-4 flex flex-col flex-grow mt-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {list.map((ticket, index) => (
                            <IpadItem
                                key={ticket.id}
                                ticket={ticket}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default Column;
