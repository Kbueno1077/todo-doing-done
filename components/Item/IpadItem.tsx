"use client";

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";
import { Ticket } from "@/utils/types";
import GroupedAvatars from "../Avatar/GroupedAvatars";

import {
    IconSquareNumber0,
    IconSquareNumber1,
    IconSquareNumber2,
    IconSquareNumber3,
    IconSquareNumber4,
    IconSquareNumber5,
    IconSquareNumber6,
    IconSquareNumber7,
    IconSquareNumber8,
    IconSquareNumber9,
    IconAlertSquare,
} from "@tabler/icons-react";

interface IpadItemProps {
    ticket: Ticket;
    index: number;
    onClick?: () => void;
}

const IpadItem: React.FC<IpadItemProps> = ({
    ticket,
    index,
    onClick = () => {},
}) => {
    const users = ticket.AssignedToTickets?.map((assigned) => assigned.Users);

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
                                onClick();
                            }}
                        >
                            <div>
                                <h1 className="font-bold text-xl">
                                    {ticket.title}
                                </h1>
                            </div>

                            <div className="mt-2 ">
                                <p className="line-clamp-3 overflow-hidden">
                                    {ticket.description}
                                </p>
                            </div>

                            <div className="divider" />

                            <div className="flex justify-between items-center">
                                {renderPriorityIcon(ticket.priority || 0)}{" "}
                                <GroupedAvatars assignedTo={users || []} />
                            </div>
                        </div>
                    </IpadCursorBlockWrapper>
                </div>
            )}
        </Draggable>
    );
};

export default IpadItem;

const priorityIcons = [
    IconSquareNumber1,
    IconSquareNumber2,
    IconSquareNumber3,
    IconSquareNumber4,
    IconSquareNumber5,
    IconSquareNumber6,
    IconSquareNumber7,
    IconSquareNumber8,
    IconSquareNumber9,
];

export const renderPriorityIcon = (priority: number) => {
    if (priority > 0 && priority < 3) {
        const IconComponent = priorityIcons[priority];
        return <IconComponent className="text-success" />;
    }

    if (priority >= 3 && priority < 7) {
        const IconComponent = priorityIcons[priority];
        return <IconComponent className="text-info" />;
    }

    if (priority >= 7 && priority < 10) {
        const IconComponent = priorityIcons[priority];
        return <IconComponent className="text-warning" />;
    }

    if (priority >= 10) {
        return <IconAlertSquare className="text-error" />;
    }
    return <IconSquareNumber0 />; // Default case 0
};
