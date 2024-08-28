"use client";

import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import ZodInput from "@/components/ZodInput/ZodInput";
import { useStoreContext } from "@/store/useStoreContext";
import { IconMailbox } from "@tabler/icons-react";
import React, { useState } from "react";
import { z } from "zod";

const inviteUserSchema = z.object({
    email: z.string().min(1, { message: "User email is required" }).email({
        message: "Invalid email",
    }),
});

type InviteUserFormData = z.infer<typeof inviteUserSchema>;

function InviteUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<InviteUserFormData>({
        email: "",
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof InviteUserFormData, string>>
    >({});

    const { sendInvite } = useStoreContext((s) => {
        return {
            sendInvite: s.sendInvite,
        };
    });

    const handleFormChange = (
        name: keyof InviteUserFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate the field
        const result = inviteUserSchema.shape[name].safeParse(value);
        if (!result.success) {
            setErrors((prev) => ({
                ...prev,
                [name]: result.error.errors[0].message,
            }));
        } else {
            setErrors((prev) => {
                const { [name]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const handleSubmit = async () => {
        const result = inviteUserSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Partial<Record<keyof InviteUserFormData, string>> =
                {};
            result.error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    newErrors[issue.path[0] as keyof InviteUserFormData] =
                        issue.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        const response = await sendInvite(formData.email);
        setIsLoading(false);
    };

    return (
        <div>
            <IpadCursorBlockWrapper type="text">
                <div className="flex gap-4 items-center py-4">
                    <IconMailbox size={30} />
                    <h1 className="font-bold text-2xl">Invite User</h1>
                </div>
            </IpadCursorBlockWrapper>

            <div className="flex gap-4">
                <IpadCursorBlockWrapper type="text" className="w-full">
                    <ZodInput
                        schema={inviteUserSchema}
                        name="email"
                        label="User Email"
                        value={formData.email}
                        onChange={handleFormChange}
                        error={errors.email}
                        placeholder="User Email"
                        className="input input-bordered w-full text-lg"
                    />
                </IpadCursorBlockWrapper>

                <IpadCursorBlockWrapper>
                    <button onClick={handleSubmit} className="btn btn-success">
                        {isLoading ? (
                            <span className="loading loading-bars loading-xs"></span>
                        ) : (
                            "Send Invite"
                        )}
                    </button>
                </IpadCursorBlockWrapper>
            </div>
        </div>
    );
}

export default InviteUser;
