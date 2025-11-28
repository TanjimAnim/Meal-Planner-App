import React from "react";

export interface InputProps {
    id?: string;
    name?: string;
    type?: "text" | "email" | "password" | "number" | "search";
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string; // allows extending styles
}

export const Input = ({
    id,
    name,
    type = "text",
    value,
    placeholder,
    onChange,
    disabled = false,
    required = false,
    className,
}: InputProps) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  disabled:bg-gray-100 disabled:cursor-not-allowed ${className || ""}`}
        />
    );
};
