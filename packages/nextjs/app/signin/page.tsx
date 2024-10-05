"use client";

import { usePrivy } from "@privy-io/react-auth";
import type { NextPage } from "next";

const SignIn: NextPage = () => {
  const { ready, authenticated, login, linkFarcaster } = usePrivy();

  const handleLogin = async () => {
    if (!authenticated && ready) {
      await login();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Login</h1>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={handleLogin}
          disabled={!ready || authenticated}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {authenticated ? "Logged In" : "Log In"}
        </button>
        <button
          onClick={linkFarcaster}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Link your Farcaster
        </button>
      </div>
    </div>
  );
};

export default SignIn;
