"use client";

import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadZone from "~~/components/UploadZone";
import SubmitButton from "~~/components/form/SubmitButton";
import TextInput from "~~/components/form/TextInput";
import FormContext from "~~/context/Form.context";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export interface IProfileFormData {
  profileImage: File | null;
  userName: string;
  socialLink: string;
}

const ProfileForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { writeContractAsync: WriteUserAccountManagerAsync } = useScaffoldWriteContract("UserAccountManager");
  const { data } = useScaffoldReadContract({
    contractName: "UserAccountManager",
  });
  //TODO how do i get this information
  const hasAccount = true;

  const {
    formState: { errors, isValid },
    setValue,
    control,
    reset,
    handleSubmit,
  } = useForm<IProfileFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { profileImage: null, userName: "", socialLink: "" },
  });

  useEffect(() => {
    console.log(data);
    if (hasAccount && data?.length) {
      reset({
        profileImage: data[2],
        userName: data[0],
        socialLink: data[3],
      });
    }
  }, [data]);

  const handleSave = async ({ userName, profileImage, socialLink }: IProfileFormData) => {
    setIsSubmitting(true);

    try {
      if (hasAccount) {
        await WriteUserAccountManagerAsync({
          functionName: "createUser",
          args: [userName, profileImage, socialLink],
        });
      } else {
        await WriteUserAccountManagerAsync({
          functionName: "updateSocials",
          args: [socialLink],
        });
        await WriteUserAccountManagerAsync({
          functionName: "updateProfilePicUrl",
          args: [profileImage],
        });
      }
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
