"use client";

import React, { FC, useContext, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import FormContext from "~~/context/Form.context";

const UploadZone: FC<{ name: string }> = ({ name }) => {
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
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload your file</h2>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            ref={inputRef}
            value={value}
            type="file"
            accept="image/*, video/*"
            onChange={onChange}
            className="hidden"
            id="file-input"
          />
        )}
      />
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer mb-4"
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
          <p className="text-gray-500">Drag and drop an image or video here, or click to select.</p>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
    </>
  );
};

export default UploadZone;
