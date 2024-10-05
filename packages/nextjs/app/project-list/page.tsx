import {FC} from "react";
import ProjectGrid from "~~/components/ProjectGrid";
import PROJECT_LIST_MOCK from "~~/const/mocks";


const ProjectListView:FC = () => {
    return(
        <div className="flex items-center flex-col flex-grow pt-10">
            <h1>Posts</h1>
            <ProjectGrid projects={PROJECT_LIST_MOCK} />
        </div>
    )
}

export default ProjectListView;
