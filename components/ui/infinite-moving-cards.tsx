"use client";

import { cn } from "@/lib/utils";
import { IconCheck, IconLayout2, IconUsers } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";

export const InfiniteMovingCards = ({
    items = [],
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items?: {
        quote: string;
        name: string;
        title: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "40s"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "80s"
                );
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                <IpadCursorBlockWrapper type="text">
                    <li className="w-[350px] max-w-full bg-base-100  shadow-xl relative rounded-2xl border border-b-0 flex-shrink-0 px-2 py-1  md:w-[450px]">
                        <div className="card bg-base-100 ">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <IconLayout2 className="h-6 w-6" />
                                    Intuitive Board Layout
                                </h2>
                                <p>
                                    Easily visualize your workflow with our
                                    drag-and-drop interface. Organize tasks into
                                    columns and move them as they progress.
                                </p>
                            </div>
                        </div>
                    </li>
                </IpadCursorBlockWrapper>
                <IpadCursorBlockWrapper type="text">
                    <li className="w-[350px] max-w-full shadow-xl bg-base-100 relative rounded-2xl border border-b-0 flex-shrink-0  px-2 py-1 md:w-[450px]">
                        <div className="card bg-base-100 ">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <IconUsers className="h-6 w-6" />
                                    Team Collaboration
                                </h2>
                                <p>
                                    Work together seamlessly. Assign tasks,
                                    mention team members, and keep everyone in
                                    the loop with real-time updates.
                                </p>
                            </div>
                        </div>
                    </li>
                </IpadCursorBlockWrapper>
                <IpadCursorBlockWrapper type="text">
                    <li className="w-[350px] max-w-full  bg-base-100  shadow-xl  relative rounded-2xl border border-b-0 flex-shrink-0  px-2 py-1  md:w-[450px]">
                        <div className="card bg-base-100 ">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <IconCheck className="h-6 w-6" />
                                    Progress Tracking
                                </h2>
                                <p>
                                    Monitor project progress at a glance. Use
                                    priorities and comments to keep track of
                                    important details.
                                </p>
                            </div>
                        </div>
                    </li>
                </IpadCursorBlockWrapper>
            </ul>
        </div>
    );
};
