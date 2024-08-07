"use client";

import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import {
    IconPlus,
    IconStackPush,
    IconH1,
    IconArticle,
} from "@tabler/icons-react";

import { useState } from "react";

interface AddTicketProps {
    addTo: string;
}

function AddTicket({ addTo }: AddTicketProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [priority, setPriority] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(parseInt(e.target.value));
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <IpadCursorBlockWrapper>
                <button
                    onClick={openModal}
                    className="btn btn-square rounded-md btn-sm"
                >
                    <IconPlus size={20} />
                </button>
            </IpadCursorBlockWrapper>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999]">
                    <div className="flex h-full justify-center items-center text-foreground">
                        <div className="w-3/4 max-w-[1280px] bg-background rounded-md p-8 flex flex-col mt-2">
                            <IpadCursorBlockWrapper type="text">
                                <div className="flex gap-4 items-center">
                                    <IconStackPush size={30} />
                                    <h1 className="font-bold text-2xl">
                                        New Ticket
                                    </h1>
                                </div>
                            </IpadCursorBlockWrapper>

                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex gap-4">
                                    <IconH1 size={30} />
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="input input-bordered w-full text-background"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <IconArticle size={30} />
                                    <textarea
                                        rows={5}
                                        className="textarea textarea-bordered w-full text-background"
                                        placeholder="Description"
                                    ></textarea>{" "}
                                </div>

                                <div className="">
                                    <h3 className="text-lg my-2 ">Priority</h3>
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={priority}
                                        onChange={handleChange}
                                        className="range"
                                        step={1}
                                    />
                                    <div className="flex w-full justify-between px-2 text-xs">
                                        <span>0</span>
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                        <span>6</span>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full justify-end mt-4">
                                <IpadCursorBlockWrapper>
                                    <button
                                        className="btn"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </IpadCursorBlockWrapper>

                                <IpadCursorBlockWrapper>
                                    <button
                                        className="btn btn-success"
                                        onClick={closeModal}
                                    >
                                        Create
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

export default AddTicket;
