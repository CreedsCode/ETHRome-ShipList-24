"use client";

import { useEffect, useState } from "react";
import { IExecDataProtector } from "@iexec/dataprotector";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import type { NextPage } from "next";

const TestPage: NextPage = () => {
  const [dataProtector, setDataProtector] = useState<IExecDataProtector | null>(null);
  const [protectedData, setProtectedData] = useState<any>(null);
  const [isProtecting, setIsProtecting] = useState(false);
  const { ready, authenticated, login, createWallet } = usePrivy();
  const { wallets } = useWallets();
  const [currentChain, setCurrentChain] = useState<`0x${string}` | null>(null);
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);

  useEffect(() => {
    const initializeDataProtector = async () => {
      if (wallets && wallets.length > 0 && currentChain === "0x86") {
        const ethersProvider = await wallets[0].getEthereumProvider();
        console.log("ethersProvider", ethersProvider);
        const dataProtector = new IExecDataProtector(ethersProvider);
        console.log("newDataProtector", dataProtector);
        setDataProtector(dataProtector);
      } else {
        setDataProtector(null);
      }
    };

    initializeDataProtector();
  }, [wallets, currentChain]);

  const handleLogin = async () => {
    if (!authenticated && ready) {
      await login();
    }
  };

  const handleCreateEmbeddedWallet = async () => {
    if (authenticated && ready) {
      try {
        const wallet = await createWallet();
        setEmbeddedWallet(wallet);
        alert("Embedded wallet created successfully!");
      } catch (error) {
        console.error("Error creating embedded wallet:", error);
        alert("Failed to create embedded wallet. Check console for details.");
      }
    }
  };

  const switchChain = async (chainId: `0x${string}`) => {
    if (wallets && wallets.length > 0) {
      try {
        await wallets[0].switchChain(chainId);
        setCurrentChain(chainId);
      } catch (error) {
        console.error("Error switching chain:", error);
        alert("Failed to switch chain. Check console for details.");
      }
    }
  };

  const protectData = async () => {
    if (dataProtector) {
      setIsProtecting(true);
      try {
        const result = await dataProtector.protectData({
          data: {
            email: "example@gmail.com",
          },
        });
        setProtectedData(result);
        alert("Data protected successfully!");
      } catch (error) {
        console.error("Error protecting data:", error);
        alert("Failed to protect data. Check console for details.");
      } finally {
        setIsProtecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Data Protection Test Page</h1>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={handleLogin}
          disabled={!ready || authenticated}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {authenticated ? "Logged In" : "Log In"}
        </button>

        <button
          onClick={handleCreateEmbeddedWallet}
          disabled={!authenticated || embeddedWallet}
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {embeddedWallet ? "Embedded Wallet Created" : "Create Embedded Wallet"}
        </button>

        <div className="flex justify-between">
          <button
            onClick={() => switchChain("0x14a34")}
            disabled={!authenticated || currentChain === "0x14a34"}
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
          >
            Switch to Base Sepolia
          </button>
          <button
            onClick={() => switchChain("0x86")}
            disabled={!authenticated || currentChain === "0x86"}
            className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
          >
            Switch to Belcour
          </button>
        </div>

        <button
          onClick={protectData}
          disabled={!dataProtector || isProtecting}
          className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
        >
          {isProtecting ? "Protecting..." : "Protect Data"}
        </button>
      </div>

      {protectedData && (
        <div className="mt-8 p-4 bg-green-100 rounded-lg w-full max-w-md">
          <h3 className="text-lg font-semibold text-green-800">Data Protected Successfully!</h3>
          <pre className="mt-2 text-sm text-green-700 overflow-x-auto">{JSON.stringify(protectedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;
