import { FC } from "react";
import ProfileForm from "~~/components/ProfileForm";

const ProfileView: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfileView;
