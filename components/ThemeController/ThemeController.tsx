"use client";

import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { IconChevronDown } from "@tabler/icons-react";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";

const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
];

function ThemeController() {
    const [currentTheme, setCurrentTheme] = useState("light");

    useEffect(() => {
        // Retrieve the theme from localStorage or use the default theme
        const savedTheme = localStorage.getItem("theme") || "light";
        setCurrentTheme(savedTheme);

        // Apply the saved theme
        document.documentElement.setAttribute("data-theme", savedTheme);

        themeChange(false);
    }, []);

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="dropdown">
                <IpadCursorBlockWrapper>
                    <div tabIndex={0} role="button" className="btn">
                        <div className="flex items-center space-x-2">
                            <span>Theme</span> <IconChevronDown size={20} />
                        </div>
                    </div>
                </IpadCursorBlockWrapper>
                <ul
                    tabIndex={0}
                    className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
                >
                    {themes.map((theme) => (
                        <li key={theme}>
                            <IpadCursorBlockWrapper>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label={
                                        theme.charAt(0).toUpperCase() +
                                        theme.slice(1)
                                    }
                                    value={theme}
                                    checked={currentTheme === theme}
                                    onChange={() => handleThemeChange(theme)}
                                />
                            </IpadCursorBlockWrapper>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ThemeController;
