'use client'

import {FC, useContext} from "react";
import FormContext from "~~/context/Form.context";
import {Controller} from "react-hook-form";
import FormErrorMessage from "~~/components/form/FormErrorMessage";

export interface ITextInputProps {
    name: string;
    label : string;
    disabled? : boolean;
}

export const TextArea: FC<ITextInputProps> = (
    {
        name,
        label,
        disabled,
   }) => {
    const { control } = useContext(FormContext);

    return (
        <Controller
            name={name}
            control={control}
            render={({
                     field: { onChange, onBlur, value, name },
                     fieldState: { error },
                 }) => (
                <div className="mb-4">
                    <label htmlFor={name}
                           className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <textarea
                        id={name}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={disabled}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                    </textarea>
                    <FormErrorMessage error={error} />
                </div>
            )}
        />
    );
}

export default TextArea;
