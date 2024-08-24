import React from "react";
import Link from "next/link";
import { auth } from "~/server/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { UserRole } from "@prisma/client";

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

          <li>{!session?.user ? <SignIn /> : <SignOut />}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
