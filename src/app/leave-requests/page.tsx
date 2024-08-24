import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { getEvents } from "~/server/action";
import StatusBadge from "~/_components/StatusBadge";
import AcceptRequest from "~/_components/AcceptRequest";
import DeclineRequest from "~/_components/DeclineRequest";

export default async function LeaveRequestsPage() {
  const session = await auth();
  if (!session?.user || session?.user?.role != UserRole.ADMINISTRATOR)
    redirect("/");
  const events = await getEvents();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="my-4 text-4xl font-bold">Leave Requests</h1>
      <div className="w-10/12 overflow-auto md:w-11/12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Person</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Category</th>
              <th>State of request</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr>
                <th>{event.id}</th>
                <td>{event.user.name}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.category.name}</td>
                <td>
                  <StatusBadge status={event.state} />
                </td>
                <td>
                  <AcceptRequest id={event.id} />
                </td>
                <td>
                  {" "}
                  <DeclineRequest id={event.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
