// src/components/atoms/Select/Select.types.ts
export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    disabled?: boolean;
    required?: boolean;
    className?: string;
    placeholder?: string; // when you want a top "All categories" or "Select..."
}


// src/components/atoms/Select/Select.tsx
import React from "react";

export const Select = ({
    id,
    name,
    value,
    onChange,
    options,
    disabled = false,
    required = false,
    className,
    placeholder,
}: SelectProps) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={className}
        >
            {placeholder && (
                <option value="" disabled={required} hidden={required}>
                    {placeholder}
                </option>
            )}
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};
