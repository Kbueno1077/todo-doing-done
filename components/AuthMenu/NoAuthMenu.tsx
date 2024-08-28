"use client";

import {
    IconDeviceDesktop,
    IconHome,
    IconKey,
    IconUser,
    IconUserPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";

function NoAuthMenu() {
    const router = usePathname();

    return (
        <>
            <div className="dropdown dropdown-end">
                <IpadCursorBlockWrapper>
                    <button className="btn btn-ghost">
                        <IconUser size={20} />
                    </button>
                </IpadCursorBlockWrapper>

                <div
                    tabIndex={0}
                    className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-48 p-2 shadow"
                >
                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full" href="/login">
                            <IconKey size={20} /> Login
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full" href="/signup">
                            <IconUserPlus size={20} /> Register
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full" href="/">
                            <IconHome size={20} /> Home
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full" href="/demo">
                            <IconDeviceDesktop size={20} /> Demo
                        </Link>
                    </IpadCursorBlockWrapper>
                </div>
            </div>
        </>
    );
}

export default NoAuthMenu;
