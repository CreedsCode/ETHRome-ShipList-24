"use client";

import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import UploadZone from "~~/components/UploadZone";
import SubmitButton from "~~/components/form/SubmitButton";
import TextInput from "~~/components/form/TextInput";
import FormContext from "~~/context/Form.context";
import { notification } from "~~/utils/scaffold-eth";

export interface IProfileFormData {
  profileImage: File | null;
  userName: string;
  socialLink: string;
}

const ProfileForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    formState: { errors, isValid },
    setValue,
    control,
    handleSubmit,
  } = useForm<IProfileFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { profileImage: null, userName: "", socialLink: "" },
  });

  const handleSave = async (data: IProfileFormData) => {
    setIsSubmitting(true);
    try {
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
      <form onSubmit={handleSubmit(handleSave, handleError)} className="bg-white shadow-md rounded-lg p-6">
        <UploadZone type={"profileImage"} name={"profileImage"} />
        <TextInput name={"username"} label={"Your choosen Username"} />
        <TextInput name={"socialLink"} label={"You Social Link"} />
        <SubmitButton isSubmitting={isSubmitting} disabled={!isValid} />
      </form>
    </FormContext.Provider>
  );
};

export default ProfileForm;
