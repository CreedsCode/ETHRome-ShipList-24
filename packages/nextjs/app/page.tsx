"use client";

import type {NextPage} from "next";
import {APP_NAME} from "../const";
import ProjectGrid from "~~/components/ProjectGrid";
import PROJECT_LIST_MOCK from "~~/const/mocks";

const Home: NextPage = () => {

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">{APP_NAME}</span>
          </h1>
        </div>
        <div className="px-5 mt-10">
          <h1 className="text-center">
            <span className="block text-3xl font-bold">Recent Startups</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <ProjectGrid projects={PROJECT_LIST_MOCK}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
