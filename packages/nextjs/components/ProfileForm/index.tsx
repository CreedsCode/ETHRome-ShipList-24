"use client";

import React, { FC, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
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
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const { writeContractAsync: WriteUserAccountManagerAsync } = useScaffoldWriteContract("UserAccountManager", {
    mutation: {
      onSuccess: () => {
        setIsSuccessful(true);
      },
      onError: (err: any) => {
        console.error("Error on EditProjectForm onError", err);
        setIsSuccessful(false);
      },
    },
  });

  const { data } = useScaffoldReadContract({
    contractName: "UserAccountManager",
  });
  const { data: hasUserData } = useScaffoldReadContract({
    contractName: "UserAccountManager",
    functionName: "hasAccount",
    args: [address],
  });

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
    console.log("data", data);
    console.log("hasUserData", hasUserData);
    if (hasUserData && data?.length) {
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
      if (hasUserData) {
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
      if (!isSuccessful) {
        throw new Error("Failed to create user");
      } else {
        notification.success("Your project has been submitted");
      }
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
        <p>Your Wallet: {address}</p>
        <UploadZone type={"profileImage"} name={"profileImage"} />
        <TextInput name={"userName"} label={"Your choosen Username"} />
        <TextInput name={"socialLink"} label={"You Social Link"} />
        <SubmitButton isSubmitting={isSubmitting} disabled={!isValid} />
      </form>
    </FormContext.Provider>
  );
};

export default ProfileForm;
