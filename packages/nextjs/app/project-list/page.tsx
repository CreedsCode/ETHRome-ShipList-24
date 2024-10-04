import {FC} from "react";
import ProjectGrid from "~~/components/ProjectGrid";
import {IProject} from "~~/models";


const ProjectListView:FC = () => {
    const PROJECT_LIST_MOCK: IProject[] = [];


    return(
        <div className="flex items-center flex-col flex-grow pt-10">
            <h1>Project List View</h1>
            <ProjectGrid/>
        </div>
    )
}

export default ProjectListView;
