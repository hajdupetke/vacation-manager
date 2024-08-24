import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUsers } from "~/server/action";
import Link from "next/link";

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user || session?.user?.role != UserRole.ADMINISTRATOR)
    redirect("/");

  const users = await getUsers();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="w-3/4 overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => {
              return (
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image as string}
                            alt={`${user.name}'s avatar`}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-xs">{user?.email}</div>
                  </td>
                  <td>
                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                  </td>
                  <th>
                    <Link
                      className="btn btn-warning btn-sm"
                      href={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
