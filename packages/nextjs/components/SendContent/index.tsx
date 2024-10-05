import React, { useState } from "react";
import ChatTextBox from "~~/components/ChatTextBox";

const SendContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && validateFileType(selectedFile)) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    } else {
      setError("Please upload a valid image or video file.");
      setFile(null);
      setPreviewUrl(null);
    }
  };

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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload your file</h2>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
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

      <input type="file" accept="image/*, video/*" onChange={handleFileChange} className="hidden" id="file-input" />
      <label htmlFor="file-input" className="block text-blue-500 hover:underline cursor-pointer mb-4">
        Choose a file
      </label>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ChatTextBox />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        disabled={!file || !message}
      >
        Upload
      </button>
    </div>
  );
};

export default SendContent;
