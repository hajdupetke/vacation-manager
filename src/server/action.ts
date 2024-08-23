"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "./db";

export const getEventsForCalendar = async () => {
  noStore();

  const data = await db.leaveRequest.findMany({
    include: {
      user: true,
    },
  });

  const events = await data.map((event) => {
    return {
      title: `${event.user.name}'s vacation`,
      start: event.startDate.toISOString().split("T")[0],
      end: event.endDate.toISOString().split("T")[0],
      state: event.state
    };
  });

  return events;
};