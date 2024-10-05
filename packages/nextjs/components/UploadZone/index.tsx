"use client";

import React, { FC, useContext, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { PLACEHOLDER_PROFILE_IMAGE } from "~~/const";
import FormContext from "~~/context/Form.context";

export interface IUploadZoneProps {
  name: string;
  type?: "content" | "profileImage";
}

const UploadZone: FC<IUploadZoneProps> = ({ name, type = "content" }) => {
  const { control } = useContext(FormContext);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && validateFileType(droppedFile)) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setError(null);
    } else {
      setError("Please upload a valid image or video file.");
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const validateFileType = (file: File) => {
    const fileType = file.type;
    return fileType.startsWith("image/") || fileType.startsWith("video/");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    const fileInput = inputRef.current;
    if (fileInput) {
      // @ts-ignore
      fileInput?.click();
    }
  };

  return (
    <>
      {type === "content" && (
        <>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload your content</h2>
        </>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <input
            ref={inputRef}
            type="file"
            accept="image/*, video/*"
            onChange={onChange}
            className="hidden"
            id="file-input"
          />
        )}
      />
      {type === "content" ? (
        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg h-20 flex justify-center cursor-pointer mb-4`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          {previewUrl ? (
            <div className="relative h-full w-full">
              {/* Preview for image or video */}
              {file?.type.startsWith("image/") && (
                <img src={previewUrl} alt="preview" className="object-cover h-full w-full rounded-lg" />
              )}
              {file?.type.startsWith("video/") && (
                <video src={previewUrl} controls className="object-cover h-full w-full rounded-lg" />
              )}
            </div>
          ) : (
            <p className="text-gray-500 p-4">Drag and drop an image or video here, or click to select.</p>
          )}
        </div>
      ) : (
        <div className="mb-4 flex flex-col">
          <img
            src={previewUrl ? previewUrl : PLACEHOLDER_PROFILE_IMAGE}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full my-4 object-cover border-2 border-gray-300"
          />
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </>
  );
};

export default UploadZone;
