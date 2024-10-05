import { FC } from "react";
import EditProjectForm from "~~/components/EditProjectForm";

const EditProjectView: FC = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <h1>Edit Project List View</h1>
      <EditProjectForm />
    </div>
  );
};

export default EditProjectView;
