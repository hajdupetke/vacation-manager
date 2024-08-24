import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { getCategories } from "~/server/action";
import Link from "next/link";
import { DeleteCategory } from "~/_components/DeleteCategory";

export default async function LeaveCategoriesPage() {
  const session = await auth();
  if (!session?.user || session?.user?.role != UserRole.ADMINISTRATOR)
    redirect("/");

  const categories = await getCategories();

  return (
    <main className="flex h-full flex-col items-center justify-start pt-6">
      <div className="flex w-1/2 justify-end">
        <Link className="btn btn-primary" href={"/leave-categories/create"}>
          Create new
        </Link>
      </div>
      <table className="table w-1/2">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Category name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td align="right">
                <DeleteCategory id={category.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
