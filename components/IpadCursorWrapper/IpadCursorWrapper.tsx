"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { IpadCursorConfig } from "ipad-cursor";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import React from "react";

function IpadCursorBlockWrapper({
    children,
    type = "block",
    styles = {},
    className = "",
    disabled = false,
    onClick = () => {},
    ...props
}: {
    children: React.ReactNode;
    type?: "block" | "text";
    styles?: Record<string, string>;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    props?: React.HTMLAttributes<HTMLDivElement>;
}) {
    const config: IpadCursorConfig = {};
    const { customCursorStyle } = useIPadCursor();

    const { cursorType } = useStoreContext((s) => {
        return {
            cursorType: s.cursorType,
        };
    });

    let style = {};

    if (Object.keys(styles).length > 0 && customCursorStyle) {
        style = customCursorStyle({
            backdropBlur: 0,
            durationBackdropFilter: 1000,
        });
    }

    return (
        <>
            {cursorType == "Ipad" ? (
                <IPadCursorProvider config={config}>
                    <div
                        data-cursor={type}
                        data-cursor-style={style}
                        className={`[&_*]:cursor-none ${className}`}
                        {...props}
                    >
                        {children}
                    </div>
                </IPadCursorProvider>
            ) : (
                <div className={`${className}`} {...props}>
                    {children}
                </div>
            )}
        </>
    );
}

export default IpadCursorBlockWrapper;
