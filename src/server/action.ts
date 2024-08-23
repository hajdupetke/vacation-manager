"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "./db";

export const getEvents = async () => {
  noStore();

  const data = await db.leaveRequest.findMany({
    include: {
      user: true,
    },
  });

  return data;
};

export const getEventsForCalendar = async () => {
  noStore();

  const data = await getEvents();

  const events = await data.map((event) => {
    return {
      title: `${event.user.name}'s vacation (${event.state.toLowerCase()})`,
      start: event.startDate.toISOString().split("T")[0],
      end: event.endDate.toISOString().split("T")[0],
    };
  });

  return events;
};

export const getUserRole = async (userEmail: string) => {
  const user = await db.user.findFirst({ where: { email: userEmail } });

  return user?.role;
};
