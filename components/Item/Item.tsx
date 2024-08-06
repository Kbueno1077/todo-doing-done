import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
    text: string;
    index: number;
}

const Item: React.FC<ItemProps> = ({ text, index }) => {
    return (
        <Draggable draggableId={text} index={index}>
            {(provided) => (
                <div
                    className="bg-primary/20 rounded-md py-4 px-2 flex flex-col mt-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {text}
                </div>
            )}
        </Draggable>
    );
};

export default Item;
