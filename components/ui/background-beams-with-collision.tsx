"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const beams = [
        {
            initialX: 10,
            translateX: 10,
            duration: 7,
            repeatDelay: 3,
            delay: 2,
        },
        {
            initialX: 600,
            translateX: 600,
            duration: 3,
            repeatDelay: 3,
            delay: 4,
        },
        {
            initialX: 100,
            translateX: 100,
            duration: 7,
            repeatDelay: 7,
            className: "h-6",
        },
        {
            initialX: 400,
            translateX: 400,
            duration: 5,
            repeatDelay: 14,
            delay: 4,
        },
        {
            initialX: 800,
            translateX: 800,
            duration: 11,
            repeatDelay: 2,
            className: "h-20",
        },
        {
            initialX: 1000,
            translateX: 1000,
            duration: 4,
            repeatDelay: 2,
            className: "h-12",
        },
        {
            initialX: 1200,
            translateX: 1200,
            duration: 6,
            repeatDelay: 4,
            delay: 2,
            className: "h-6",
        },
        {
            initialX: 300,
            translateX: 300,
            duration: 8,
            repeatDelay: 5,
            delay: 1,
            className: "h-8",
        },
        {
            initialX: 700,
            translateX: 700,
            duration: 9,
            repeatDelay: 6,
            delay: 3,
            className: "h-4",
        },
        {
            initialX: 900,
            translateX: 900,
            duration: 5,
            repeatDelay: 4,
            className: "h-10",
        },
        {
            initialX: 1100,
            translateX: 1100,
            duration: 7,
            repeatDelay: 3,
            delay: 2,
            className: "h-16",
        },
        {
            initialX: 1300,
            translateX: 1300,
            duration: 6,
            repeatDelay: 5,
            className: "h-14",
        },
        {
            initialX: 1500,
            translateX: 1500,
            duration: 10,
            repeatDelay: 2,
            delay: 1,
            className: "h-8",
        },
        {
            initialX: 1700,
            translateX: 1700,
            duration: 8,
            repeatDelay: 4,
            delay: 3,
            className: "h-6",
        },
        {
            initialX: 300,
            translateX: 300,
            duration: 8,
            repeatDelay: 5,
            delay: 1,
            className: "h-8",
        },
        {
            initialX: 700,
            translateX: 700,
            duration: 6,
            repeatDelay: 6,
            className: "h-16",
        },
        {
            initialX: 2150,
            translateX: 2150,
            duration: 8,
            repeatDelay: 4,
            delay: 2,
            className: "h-10",
        },
        {
            initialX: 2300,
            translateX: 2300,
            duration: 6,
            repeatDelay: 3,
            className: "h-16",
        },
        {
            initialX: 2500,
            translateX: 2500,
            duration: 9,
            repeatDelay: 5,
            delay: 1,
        },
        {
            initialX: 2700,
            translateX: 2700,
            duration: 7,
            repeatDelay: 4,
            className: "h-8",
        },
        {
            initialX: 2900,
            translateX: 2900,
            duration: 5,
            repeatDelay: 3,
            delay: 3,
            className: "h-12",
        },
        {
            initialX: 3100,
            translateX: 3100,
            duration: 10,
            repeatDelay: 6,
        },
        {
            initialX: 3300,
            translateX: 3300,
            duration: 8,
            repeatDelay: 4,
            className: "h-14",
        },
        {
            initialX: 3500,
            translateX: 3500,
            duration: 6,
            repeatDelay: 5,
            delay: 2,
        },
        {
            initialX: 3700,
            translateX: 3700,
            duration: 9,
            repeatDelay: 3,
            className: "h-20",
        },
        {
            initialX: 3850,
            translateX: 3850,
            duration: 7,
            repeatDelay: 4,
            delay: 1,
            className: "h-6",
        },
        {
            initialX: 2400,
            translateX: 2400,
            duration: 8,
            repeatDelay: 5,
            className: "h-18",
        },
        {
            initialX: 2600,
            translateX: 2600,
            duration: 6,
            repeatDelay: 3,
            delay: 2,
        },
        {
            initialX: 3000,
            translateX: 3000,
            duration: 10,
            repeatDelay: 4,
            className: "h-24",
        },
        {
            initialX: 3400,
            translateX: 3400,
            duration: 7,
            repeatDelay: 6,
            delay: 3,
            className: "h-10",
        },
        {
            initialX: 3950,
            translateX: 3950,
            duration: 9,
            repeatDelay: 5,
            className: "h-16",
        },
        {
            initialX: 1400,
            translateX: 1400,
            duration: 9,
            repeatDelay: 3,
            delay: 3,
        },
        {
            initialX: 200,
            translateX: 200,
            duration: 5,
            repeatDelay: 4,
            className: "h-10",
        },
        {
            initialX: 900,
            translateX: 900,
            duration: 7,
            repeatDelay: 5,
            delay: 2,
        },
        {
            initialX: 1100,
            translateX: 1100,
            duration: 4,
            repeatDelay: 3,
            className: "h-14",
        },
        {
            initialX: 500,
            translateX: 500,
            duration: 6,
            repeatDelay: 2,
            delay: 1,
        },
        {
            initialX: 1300,
            translateX: 1300,
            duration: 8,
            repeatDelay: 4,
            className: "h-8",
        },
        {
            initialX: 50,
            translateX: 50,
            duration: 5,
            repeatDelay: 3,
            delay: 2,
            className: "h-12",
        },
        {
            initialX: 1500,
            translateX: 1500,
            duration: 7,
            repeatDelay: 5,
            className: "h-16",
        },
        {
            initialX: 1750,
            translateX: 1750,
            duration: 9,
            repeatDelay: 3,
            delay: 2,
            className: "h-10",
        },
        {
            initialX: 1800,
            translateX: 1800,
            duration: 7,
            repeatDelay: 5,
            delay: 1,
            className: "h-14",
        },
        {
            initialX: 1850,
            translateX: 1850,
            duration: 6,
            repeatDelay: 4,
            className: "h-8",
        },
        {
            initialX: 1900,
            translateX: 1900,
            duration: 8,
            repeatDelay: 2,
            delay: 3,
            className: "h-12",
        },
        {
            initialX: 1950,
            translateX: 1950,
            duration: 10,
            repeatDelay: 3,
            className: "h-16",
        },
        {
            initialX: 2000,
            translateX: 2000,
            duration: 5,
            repeatDelay: 6,
            delay: 2,
            className: "h-6",
        },
        {
            initialX: 2050,
            translateX: 2050,
            duration: 7,
            repeatDelay: 4,
            delay: 1,
            className: "h-18",
        },
        {
            initialX: 2075,
            translateX: 2075,
            duration: 9,
            repeatDelay: 3,
            className: "h-4",
        },
        {
            initialX: 2090,
            translateX: 2090,
            duration: 6,
            repeatDelay: 5,
            delay: 2,
            className: "h-20",
        },
        {
            initialX: 2100,
            translateX: 2100,
            duration: 8,
            repeatDelay: 2,
            delay: 3,
            className: "h-10",
        },
    ];

    return (
        <div
            ref={parentRef}
            className={cn(
                "bg-gradient-to-b from-base-300 to-base-100 relative flex items-center w-full overflow-hidden",
                className
            )}
            style={{ height: "calc(100vh - 71px)" }}
        >
            {beams.map((beam) => (
                <CollisionMechanism
                    key={beam.initialX + "beam-idx"}
                    beamOptions={beam}
                    containerRef={containerRef}
                    parentRef={parentRef}
                />
            ))}

            {children}
            <div
                ref={containerRef}
                className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
                style={{
                    boxShadow:
                        "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                }}
            ></div>
        </div>
    );
};

const CollisionMechanism = React.forwardRef<
    HTMLDivElement,
    {
        containerRef: React.RefObject<HTMLDivElement>;
        parentRef: React.RefObject<HTMLDivElement>;
        beamOptions?: {
            initialX?: number;
            translateX?: number;
            initialY?: number;
            translateY?: number;
            rotate?: number;
            className?: string;
            duration?: number;
            delay?: number;
            repeatDelay?: number;
        };
    }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
    const beamRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState<{
        detected: boolean;
        coordinates: { x: number; y: number } | null;
    }>({
        detected: false,
        coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
        const checkCollision = () => {
            if (
                beamRef.current &&
                containerRef.current &&
                parentRef.current &&
                !cycleCollisionDetected
            ) {
                const beamRect = beamRef.current.getBoundingClientRect();
                const containerRect =
                    containerRef.current.getBoundingClientRect();
                const parentRect = parentRef.current.getBoundingClientRect();

                if (beamRect.bottom >= containerRect.top) {
                    const relativeX =
                        beamRect.left - parentRect.left + beamRect.width / 2;
                    const relativeY = beamRect.bottom - parentRect.top;

                    setCollision({
                        detected: true,
                        coordinates: {
                            x: relativeX,
                            y: relativeY,
                        },
                    });
                    setCycleCollisionDetected(true);
                }
            }
        };

        const animationInterval = setInterval(checkCollision, 50);

        return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
        if (collision.detected && collision.coordinates) {
            setTimeout(() => {
                setCollision({ detected: false, coordinates: null });
                setCycleCollisionDetected(false);
            }, 2000);

            setTimeout(() => {
                setBeamKey((prevKey) => prevKey + 1);
            }, 2000);
        }
    }, [collision]);

    return (
        <>
            <motion.div
                key={beamKey}
                ref={beamRef}
                animate="animate"
                initial={{
                    translateY: beamOptions.initialY || "-200px",
                    translateX: beamOptions.initialX || "0px",
                    rotate: beamOptions.rotate || 0,
                }}
                variants={{
                    animate: {
                        translateY: beamOptions.translateY || "1800px",
                        translateX: beamOptions.translateX || "0px",
                        rotate: beamOptions.rotate || 0,
                    },
                }}
                transition={{
                    duration: beamOptions.duration || 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: beamOptions.delay || 0,
                    repeatDelay: beamOptions.repeatDelay || 0,
                }}
                className={cn(
                    "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
                    beamOptions.className
                )}
            />
            <AnimatePresence>
                {collision.detected && collision.coordinates && (
                    <Explosion
                        key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                        className=""
                        style={{
                            left: `${collision.coordinates.x}px`,
                            top: `${collision.coordinates.y}px`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
    const spans = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        initialX: 0,
        initialY: 0,
        directionX: Math.floor(Math.random() * 80 - 40),
        directionY: Math.floor(Math.random() * -50 - 10),
    }));

    return (
        <div
            {...props}
            className={cn("absolute z-50 h-2 w-2", props.className)}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
            ></motion.div>
            {spans.map((span) => (
                <motion.span
                    key={span.id}
                    initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
                    animate={{
                        x: span.directionX,
                        y: span.directionY,
                        opacity: 0,
                    }}
                    transition={{
                        duration: Math.random() * 1.5 + 0.5,
                        ease: "easeOut",
                    }}
                    className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
                />
            ))}
        </div>
    );
};