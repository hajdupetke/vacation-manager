import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { createLeaveRequest } from "~/server/action";
import Date from "~/_components/Date";

export default async function LeaveRequestCreatePage({
  searchParams,
}: {
  searchParams?: { startDate?: string; endDate?: string };
}) {
  const session = await auth();
  if (!session?.user || session?.user?.role == UserRole.VIEWER) redirect("/");

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <form
        className="form-control w-full max-w-md"
        action={async () => {
          "use server";
          if (
            searchParams?.endDate != undefined &&
            searchParams?.startDate != undefined
          )
            await createLeaveRequest(
              searchParams.startDate,
              searchParams.endDate,
            );
        }}
      >
        <Date />
        <button type="submit" className="btn btn-primary my-4 w-1/3">
          Create
        </button>
      </form>
    </main>
  );
}
