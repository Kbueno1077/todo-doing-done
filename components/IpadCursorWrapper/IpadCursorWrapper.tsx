"use client";

import { IpadCursorConfig } from "ipad-cursor";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import React from "react";

function IpadCursorBlockWrapper({
    children,
    type = "block",
    styles = {},
    className = "",
    ...props
}: {
    children: React.ReactNode;
    type?: "block" | "text";
    styles?: Record<string, string>;
    className?: string;
    props?: React.HTMLAttributes<HTMLDivElement>;
}) {
    const config: IpadCursorConfig = {};
    const { customCursorStyle } = useIPadCursor();

    let style = {};

    if (Object.keys(styles).length > 0 && customCursorStyle) {
        style = customCursorStyle({
            backdropBlur: 0,
            durationBackdropFilter: 1000,
        });
    }

    return (
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
    );
}

export default IpadCursorBlockWrapper;
