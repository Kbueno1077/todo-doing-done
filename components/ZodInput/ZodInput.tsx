import React, { InputHTMLAttributes, ChangeEvent } from "react";
import { z } from "zod";

interface ZodInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    name: string;
    label: string;
    schema: z.ZodType<any>;
    value: string;
    onChange: (name: any, value: string) => void;
    error?: string;
    useLabel?: boolean;
}

const ZodInput: React.FC<ZodInputProps> = ({
    name,
    label,
    schema,
    value,
    onChange,
    error,
    className = "",
    useLabel = false,
    ...props
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // const validationResult = schema.safeParse(newValue);
        onChange(name, newValue);
    };

    return (
        <div className="form-control w-full">
            {useLabel && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input
                name={name}
                value={value}
                onChange={handleChange}
                {...props}
                className={`input input-bordered w-full ${
                    error ? "input-error" : ""
                } ${className}`}
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};

export default ZodInput;
