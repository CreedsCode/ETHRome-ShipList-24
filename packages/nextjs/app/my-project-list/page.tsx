import {FC} from "react";
import {useForm} from "react-hook-form";


const MyProjectList:FC = () => {
    const form = useForm();

    return(
        <div className="flex items-center flex-col flex-grow pt-10">
            <h1>My Project List View</h1>
        </div>
    );
}

export default MyProjectList;
