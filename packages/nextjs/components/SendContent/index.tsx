import React, { useEffect, useState } from "react";
import SendContentContext from "../../context/SendContent.context";
import { useForm } from "react-hook-form";
import UploadZone from "~~/components/UploadZone";
import TextAreaInput from "~~/components/form/TextAreaInput";
import TextInput from "~~/components/form/TextInput";
import FormContext from "~~/context/Form.context";
import { useIpfs } from "~~/hooks/ipfs.hook";
import { notification } from "~~/utils/scaffold-eth";

export interface ISendContentForm {
  files: File[];
  message: string;
  receiver: string;
}

const SendContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    formState: { errors, isValid },
    setValue,
    control,
    reset,
    handleSubmit,
  } = useForm<ISendContentForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { message: "", files: [], receiver: "" },
  });
  const { uploadToIpfs, ipfsHash } = useIpfs();

  const handleMessageSend = async (data: ISendContentForm) => {
    setIsSubmitting(true);
    try {
      //await uploadToIpfs(data);
      //console.log(ipfsHash);
      /*
                  reset();
      */
      console.log("send success toast ipfsHash: ", data);
      notification.success("Your project has been submitted");
    } catch (e) {
      console.error("Error on EditProjectForm onSubmit", e);
      notification.error("Opps that did not work, trying again won't help cause we messed up");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageError = (e: any) => {
    console.error("Error on EditProjectForm onError", e);
  };

  return (
    <form
      onSubmit={handleSubmit(handleMessageSend, handleMessageError)}
      className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <FormContext.Provider value={{ errors, setValue, control }}>
        <SendContentContext.Provider value={{ file, setFile }}>
          <TextInput name={"receiver"} label={'Your Receiver'} />
          <UploadZone name={"files"} />
          <TextAreaInput name={"message"} label={"Your Message"} />
        </SendContentContext.Provider>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Project
            {isSubmitting && (
              <div className="loading align-middle justify-center ml-4 loading-spinner loading-xs"></div>
            )}
          </button>
        </div>
      </FormContext.Provider>
    </form>
  );
};

export default SendContent;
