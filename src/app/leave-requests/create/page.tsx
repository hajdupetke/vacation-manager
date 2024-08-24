import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { createLeaveRequest, getUserCategories } from "~/server/action";
import Date from "~/_components/Date";

export default async function LeaveRequestCreatePage({
  searchParams,
}: {
  searchParams?: { startDate?: string; endDate?: string };
}) {
  const session = await auth();
  if (!session?.user || session?.user?.role == UserRole.VIEWER) redirect("/");
  const categories = await getUserCategories(session?.user?.id as string);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Create new leave request</h1>
      <form
        className="form-control w-full max-w-md"
        action={async (formData: FormData) => {
          "use server";
          if (
            searchParams?.endDate != undefined &&
            searchParams?.startDate != undefined
          ) {
            const categoryId = parseInt(formData.get("category") as string);
            await createLeaveRequest(
              searchParams.startDate,
              searchParams.endDate,
              categoryId,
            );
          }
        }}
      >
        <div className="label mt-4">
          <span className="label-text">Vacation date</span>
        </div>
        <Date />
        <div className="label mt-4">
          <span className="label-text">Leave category</span>
        </div>
        <select className="select select-bordered" name="category">
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary my-4 w-1/3">
          Create
        </button>
      </form>
    </main>
  );
}
