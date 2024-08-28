"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {};

export function SubmitButton({ children, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <button {...props} type="submit" aria-disabled={pending}>
            {isPending ? (
                <span className="loading loading-bars loading-xs"></span>
            ) : (
                children
            )}
        </button>
    );
}
