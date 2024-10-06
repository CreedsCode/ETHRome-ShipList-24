import type { NextPage } from "next";
import SendContent from "~~/components/SendContent";
import { APP_NAME } from "~~/const";

const LoggedInHome: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">{APP_NAME}</span>
          </h1>
          <p>The easiest way to Send secure Content</p>
        </div>
        <div className="px-5 mt-10">
          <SendContent />
        </div>
      </div>
    </>
  );
};

export default LoggedInHome;
