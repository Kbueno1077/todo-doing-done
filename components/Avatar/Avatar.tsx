import { User } from "@/utils/types";
import React from "react";

function Avatar({ user }: { user: User }) {
    return (
        <>
            <div className="flex items-center gap-2">
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                        <div className="w-8 rounded ">
                            <img
                                src={
                                    user.img ||
                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                            />
                        </div>{" "}
                    </div>
                </div>{" "}
                <p>{user.name}</p>
            </div>
        </>
    );
}

export default Avatar;
