"use client";

import { FC, useContext } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import FormErrorMessage from "~~/components/form/FormErrorMessage";
import FormContext from "~~/context/Form.context";

export interface ITextInputProps {
  name: string;
  label: string;
  disabled?: boolean;
}

export const TextArea: FC<ITextInputProps> = ({ name, label, disabled }) => {
  // @ts-ignore
  const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), { ssr: false });

  const { control } = useContext(FormContext);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <Editor
            apiKey="sjc2psnj6kgfubqu3hv4pwhhir6gao5pkcket3f8uyi65qsc"
            onEditorChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            value={value}
            init={{
              height: 180,
              menubar: false,
              plugins: "emoticons",
              toolbar: "undo redo | bold italic underline | emoticons",
              emoticons_append: {
                custom_mind_blown: {
                  keywords: ["mind", "blown"],
                  char: "🤯",
                },
              },
            }}
          />
          <FormErrorMessage error={error} />
        </div>
      )}
    />
  );
};

export default TextArea;
