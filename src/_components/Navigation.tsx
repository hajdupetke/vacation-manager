import React from "react";
import Link from "next/link";
import { auth } from "~/server/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import SettingsIcon from "public/assets/settings.svg";

const Navigation = async () => {
  const session = await auth();
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={"/"}>
          Vacation Manager
        </Link>
      </div>
      <div className="hidden flex-none lg:flex">
        <ul className="menu menu-horizontal px-1">
          {session?.user?.role == UserRole.ADMINISTRATOR && (
            <>
              <li>
                <Link href={"/users"}>Users</Link>
              </li>
              <li>
                <Link href={"/leave-requests"}>Leave Requests</Link>
              </li>
              <li>
                <Link href={"/leave-categories"}>Leave Categories</Link>
              </li>
            </>
          )}
          <li>
            <Link href={"/settings"}>
              Settings{" "}
              <Image src={SettingsIcon} width={20} alt="Settings icon" />
            </Link>
          </li>
          <li>{!session?.user ? <SignIn /> : <SignOut />}</li>
        </ul>
      </div>
      {/* Hamburger menu for small screens */}
      <div className="dropdown dropdown-end lg:hidden">
        <button tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {session?.user?.role == UserRole.ADMINISTRATOR && (
            <>
              <li>
                <Link href={"/users"}>Users</Link>
              </li>
              <li>
                <Link href={"/leave-requests"}>Leave Requests</Link>
              </li>
              <li>
                <Link href={"/leave-categories"}>Leave Categories</Link>
              </li>
            </>
          )}
          <li>
            <Link href={"/settings"}>
              Settings{" "}
              <Image src={SettingsIcon} width={20} alt="Settings icon" />
            </Link>
          </li>
          <li>{!session?.user ? <SignIn /> : <SignOut />}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
