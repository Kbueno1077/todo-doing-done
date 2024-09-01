import AddTicket from "@/modules/AddTicket/AddTicket";
import OpenTicket from "@/modules/OpenTicket/OpenTicket";
import { Ticket } from "@/utils/types";
import React, { Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";
import { randomUUID } from "crypto";

interface ColumnProps {
    id: string;
    name: string;
    list: Ticket[] | never[];
}
const Column: React.FC<ColumnProps> = ({ id, list, name }) => {
    return (
        <Droppable droppableId={name}>
            {(provided) => (
                <div className="flex flex-col">
                    <div className="flex justify-between items-center bg-primary text-primary-content rounded-md px-2 py-2 ">
                        <IpadCursorBlockWrapper type="text">
                            <h2 className="uppercase font-bold">{name}</h2>
                        </IpadCursorBlockWrapper>

                        <AddTicket status={name} />
                    </div>

                    <div
                        className="bg-primary/10 rounded-md p-4 flex flex-col flex-grow mt-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {list.map((ticket, index) => (
                            <Fragment key={ticket.id || randomUUID()}>
                                {ticket.id && (
                                    <OpenTicket
                                        key={ticket.id}
                                        ticket={ticket}
                                        index={index}
                                    />
                                )}
                            </Fragment>
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default Column;
