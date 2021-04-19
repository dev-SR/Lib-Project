import React, { useState } from "react";

export interface InputType {
    name: string;
    error?: boolean;
    value: string;
    helperText?: string;
    showHelperText?: (error: boolean) => string;
    isValid?: (value: string) => boolean;
    id?: string;
    label?: string;
    type?: string;
}

export const useInput = (inputArr: InputType[]) => {
    const [inputs, setInputs] = useState([...inputArr]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let { name, value } = e.target;

        const newInputs = [...inputs];
        const index = inputs.findIndex((input) => input.name === name);
        const input = inputs[index];
        if (
            input.isValid !== undefined &&
            input.showHelperText !== undefined &&
            input.error !== undefined
        ) {
            const isValid = input.isValid(value);
            newInputs[index] = {
                ...input,
                value: value,
                error: !isValid,
                helperText: input.showHelperText(!isValid),
            };
        } else
            newInputs[index] = {
                ...input,
                value: value,
            };
        setInputs(newInputs);
    };

    return { onChange, inputs };
};

interface Props extends InputType {
    onchange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

export const Input: React.FC<Props> = (input) => {
    return (
        <div className="w-full">
            {input.label && (
                <label
                    htmlFor="name"
                    className="text-gray-600 block text-xs pb-2"
                >
                    {input.label}
                </label>
            )}
            <input
                type={input.type === undefined ? "text" : input.type}
                name={input.name}
                className="rounded-md border-2 focus:ring-purple-500 border-purple-300 bg-purple-50 focus:border-purple-500 w-full"
                value={input.value}
                onChange={input.onchange}
            />
        </div>
    );
};
