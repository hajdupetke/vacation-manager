import Cal from "~/_components/Calendar";
import { getEventsForCalendar } from "~/server/action";
import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  const events = await getEventsForCalendar();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      {session?.user?.role != UserRole.VIEWER && (
        <div className="my-4 flex w-1/2 justify-end">
          <Link href={"/leave-requests/create"} className="btn btn-primary">
            Create New Leave Request
          </Link>
        </div>
      )}
      <Cal events={events} />
    </main>
  );
}
