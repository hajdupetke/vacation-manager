import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createCategory } from "~/server/action";

export default async function LeaveCategoriesCreatePage() {
  const session = await auth();
  if (!session?.user || session?.user?.role != UserRole.ADMINISTRATOR)
    redirect("/");

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <form className="form-control w-full max-w-md" action={createCategory}>
        <div className="label">
          <span className="label-text">Category name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-md"
          name="name"
        />
        <button type="submit" className="btn btn-primary my-4 w-1/3">
          Create
        </button>
      </form>
    </main>
  );
}
