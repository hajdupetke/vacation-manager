import React from "react";
import Link from "next/link";
import { auth } from "~/server/auth";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";

const Navigation = async () => {
  const session = await auth();
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={"/"}>
          Vacation Manager
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>{!session?.user ? <SignIn /> : <SignOut />}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
