import React, { InputHTMLAttributes, ChangeEvent } from "react";
import { z } from "zod";

interface ZodTextarea
    extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
    name: string;
    label: string;
    schema: z.ZodType<any>;
    value: string;
    onChange: (name: string, value: string) => void;
    error?: string;
    useLabel?: boolean;
    rows?: number;
}

const ZodTextarea: React.FC<ZodTextarea> = ({
    name,
    label,
    schema,
    value,
    onChange,
    error,
    className = "",
    useLabel = false,
    rows = 3,
    ...props
}) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        // const validationResult = schema.safeParse(newValue);
        onChange(name, newValue);
    };

    return (
        <div className="form-control h-full w-full">
            {useLabel && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}

            <textarea
                rows={rows}
                name={name}
                value={value}
                onChange={handleChange}
                className={`textarea textarea-bordered w-full text-lg ${
                    error ? "textarea-error input-error" : ""
                } ${className}`}
                {...props}
            ></textarea>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};

export default ZodTextarea;
