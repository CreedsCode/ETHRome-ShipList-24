"use client";

import { useRouter } from "next/navigation";
import { APP_NAME } from "../const";
import { usePrivy } from "@privy-io/react-auth";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { push } = useRouter();
  const { authenticated } = usePrivy();

  const redirectIfIsAuthenticated = (): void => {
    return authenticated ? push("/send-content") : push("/signin");
  };

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
        <div className="px-5 mt-10">Lorem Ipsum dolor sit amet</div>
        <button
          onClick={redirectIfIsAuthenticated}
          className="mt-10 relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-l"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-50 blur-md rounded-full animate-pulse"></span>
          <span className="relative">Start Sending Your Precious Content</span>
          <svg
            className="ml-3 w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Home;
