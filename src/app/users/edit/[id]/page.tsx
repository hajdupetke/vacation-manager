import {
  getCategories,
  getUser,
  getUserCategories,
  updateUser,
} from "~/server/action";
import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  const session = await auth();
  const userRoles = Object.values(UserRole);
  const categories = await getCategories();
  const userCategories = await getUserCategories(params.id);

  if (user == null) return <h1>User not found</h1>;

  if (!session?.user || session?.user?.role != UserRole.ADMINISTRATOR)
    redirect("/");

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <form className="w-1/3" action={updateUser}>
        <div className="my-2 flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={user.image as string} alt={`${user.name}'s avatar`} />
            </div>
          </div>
          <div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>
        <div className="label">
          <span className="label-text">User's role</span>
        </div>
        <select
          className="select select-bordered w-full"
          name="role"
          defaultValue={user.role}
          disabled={user.id === session.user.id}
        >
          {userRoles.map((userRole) => (
            <option value={userRole} key={userRole}>
              {userRole.charAt(0) + userRole.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <div className="label mt-4">
          <span className="label-text">User's categories</span>
        </div>

        <div className="grid grid-cols-2">
          {categories.map((category) => (
            <label
              className="label cursor-pointer justify-normal gap-2"
              key={category.id}
            >
              <input
                type="checkbox"
                defaultChecked={userCategories?.some(
                  (userCategory) => userCategory.id === category.id,
                )}
                className="checkbox-primary checkbox"
                name="category"
                value={category.id}
              />
              <span className="label-text">{category.name}</span>
            </label>
          ))}
        </div>

        <input type="hidden" name="userId" value={params.id} />

        <button type="submit" className="btn btn-primary mt-4">
          Save
        </button>
      </form>
    </main>
  );
}
