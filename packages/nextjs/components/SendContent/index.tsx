"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useForm } from "react-hook-form";
import UploadZone from "~~/components/UploadZone";
import SubmitButton from "~~/components/form/SubmitButton";
import TextAreaInput from "~~/components/form/TextAreaInput";
import TextInput from "~~/components/form/TextInput";
import FormContext from "~~/context/Form.context";
import { notification } from "~~/utils/scaffold-eth";

export interface ISendContentFormData {
  files: File[];
  message: string;
  receiver: string;
}

const SendContent = () => {
  const { authenticated } = usePrivy();
  const { push } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    formState: { errors, isValid },
    setValue,
    control,
    handleSubmit,
  } = useForm<ISendContentFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { message: "", files: [], receiver: "" },
  });

  useEffect(() => {
    if (!authenticated) {
      push("/");
    }
  }, [authenticated]);

  const handleSave = async (data: ISendContentFormData) => {
    setIsSubmitting(true);
    try {
      // TODO save Message Dercio
      console.log("send success toast ipfsHash: ", data);
      notification.success("Your project has been submitted");
    } catch (e) {
      console.error("Error on EditProjectForm onSubmit", e);
      notification.error("Opps that did not work, trying again won't help cause we messed up");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = (e: any) => {
    console.error("Error on EditProjectForm onError", e);
  };

  return (
    <FormContext.Provider value={{ errors, setValue, control }}>
      <form
        onSubmit={handleSubmit(handleSave, handleError)}
        className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        <TextInput name={"receiver"} label={"Your Receiver"} />
        <UploadZone name={"files"} />
        <TextAreaInput name={"message"} label={"Your Message"} />
        <SubmitButton isSubmitting={isSubmitting} disabled={!isValid} />
      </form>
    </FormContext.Provider>
  );
};

export default SendContent;
