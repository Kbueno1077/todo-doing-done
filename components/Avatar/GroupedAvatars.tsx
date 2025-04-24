import { User } from "@/utils/types";
import React, { Fragment } from "react";

function GroupedAvatars({ assignedTo }: { assignedTo: User[] }) {
    return (
        <>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {assignedTo.map((assignedTo, index) => (
                    <Fragment key={assignedTo.id}>
                        {index < 2 && (
                            <div className="avatar" key={assignedTo.id}>
                                <div className="w-8 rounded">
                                    <img
                                        src={
                                            assignedTo.img ||
                                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </Fragment>
                ))}

                {assignedTo.length > 2 && (
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-8">
                            <span>+{assignedTo.length - 2}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default GroupedAvatars;
