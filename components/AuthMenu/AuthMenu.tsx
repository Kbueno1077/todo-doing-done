"use client";

import { createClient } from "@/utils/supabase/client";
import { UserProfile } from "@/utils/types";
import {
    IconLogout2,
    IconDeviceDesktop,
    IconLayoutCards,
    IconSettings,
    IconHome,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import IpadCursorBlockWrapper from "../IpadCursorWrapper/IpadCursorWrapper";
import Link from "next/link";
import { useStoreContext } from "@/store/useStoreContext";

function AuthMenu() {
    const router = useRouter();

    const { loggedUser, setLoggedUser } = useStoreContext((s) => {
        return {
            loggedUser: s.loggedUser,
            setLoggedUser: s.setLoggedUser,
        };
    });

    const signOut = async () => {
        const supabase = createClient();

        await supabase.auth.signOut();
        setLoggedUser(null);
        return router.replace("/");
    };

    if (!loggedUser) {
        return null;
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <IpadCursorBlockWrapper>
                    <div
                        tabIndex={0}
                        role="button"
                        className="flex items-center gap-2"
                    >
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            <div className="avatar">
                                <div className="w-12 rounded ">
                                    <img
                                        src={
                                            loggedUser.img ||
                                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        }
                                    />
                                </div>{" "}
                            </div>
                        </div>{" "}
                    </div>
                </IpadCursorBlockWrapper>

                <div
                    tabIndex={0}
                    className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-64 p-2 shadow"
                >
                    <div className="card-body">
                        <IpadCursorBlockWrapper type="text">
                            <h3 className="card-title">{loggedUser.name}</h3>
                            <p>{loggedUser.email}</p>
                        </IpadCursorBlockWrapper>
                    </div>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full" href="/">
                            <IconHome size={20} /> Home
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link
                            className="btn btn-ghost w-full "
                            href="/dashboard"
                        >
                            <IconLayoutCards size={20} /> Dashboard
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full" href="/demo">
                            <IconDeviceDesktop size={20} /> Demo
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <Link className="btn btn-ghost w-full " href="/">
                            <IconSettings size={20} /> Settings
                        </Link>
                    </IpadCursorBlockWrapper>

                    <IpadCursorBlockWrapper className="my-1">
                        <button
                            className="btn btn-ghost w-full "
                            onClick={signOut}
                        >
                            <IconLogout2 size={20} /> Log out
                        </button>
                    </IpadCursorBlockWrapper>
                </div>
            </div>
        </>
    );
}

export default AuthMenu;