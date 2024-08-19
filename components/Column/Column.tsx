import AddTicket from "@/modules/AddTicket/AddTicket";
import OpenTicket from "@/modules/OpenTicket/OpenTicket";
import { Ticket } from "@/utils/types";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";

interface ColumnProps {
    id: string;
    list: Ticket[] | never[];
}
const Column: React.FC<ColumnProps> = ({ id, list }) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div className="flex flex-col">
                    <div className="flex justify-between items-center bg-primary text-primary-content rounded-md px-2 py-2 ">
                        <IpadCursorBlockWrapper type="text">
                            <h2 className="uppercase font-bold">{id}</h2>
                        </IpadCursorBlockWrapper>

                        <AddTicket status={id} />
                    </div>

                    <div
                        className="bg-primary/10 rounded-md p-4 flex flex-col flex-grow mt-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {list.map((ticket, index) => (
                            <OpenTicket
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
