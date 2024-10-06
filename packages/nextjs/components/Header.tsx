"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { APP_NAME, PLACEHOLDER_PROFILE_IMAGE } from "../const";
import { usePrivy } from "@privy-io/react-auth";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const { user, authenticated } = usePrivy();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            ></ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 align-middle justify-center">ET</div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">{APP_NAME}</span>
            <span className="text-xs">Send Secure Content</span>
          </div>
        </Link>
      </div>
      <div className="navbar-end">
        {authenticated ? (
          <Link href="/profile" passHref>
            <img
              src={PLACEHOLDER_PROFILE_IMAGE}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
            />
          </Link>
        ) : (
          <Link href="/signin" passHref>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
