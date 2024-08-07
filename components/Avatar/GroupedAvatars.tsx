import { AssignedTo } from "@/utils/types";
import React from "react";

function GroupedAvatars({ assignedTo }: { assignedTo: AssignedTo[] }) {
    return (
        <>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {assignedTo.map((assignedTo) => (
                    <div className="avatar">
                        <div className="w-8 rounded">
                            <img
                                src={
                                    assignedTo.img ||
                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                            />
                        </div>
                    </div>
                ))}

                {assignedTo.length > 2 && (
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-8">
                            <span>+99</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default GroupedAvatars;
