import React, { FC } from "react";

export interface ISubmitButtonProps {
  isSubmitting: boolean;
  disabled: boolean;
}

const SubmitButton: FC<ISubmitButtonProps> = ({ isSubmitting, disabled }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={disabled}
        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
        {isSubmitting && <div className="loading align-middle justify-center ml-4 loading-spinner loading-xs"></div>}
      </button>
    </div>
  );
};

export default SubmitButton;
