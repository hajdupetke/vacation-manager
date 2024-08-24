"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "./db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { auth } from "./auth";

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
      start: event.startDate,
      end: event.endDate,
    };
  });

  return events;
};

export const getUserRole = async (userEmail: string) => {
  const user = await db.user.findFirst({ where: { email: userEmail } });

  return user?.role;
};

export const getCategories = async () => {
  const categories = await db.leaveCategory.findMany();

  return categories;
};

export const deleteCategory = async (categoryId: number) => {
  const category = await db.leaveCategory.delete({ where: { id: categoryId } });

  revalidatePath("/leave-categories");
};

export const createCategory = async (formData: FormData) => {
  const name = formData.get("name") as string;

  const category = await db.leaveCategory.create({ data: { name: name } });

  redirect("/leave-categories");
};

export const createLeaveRequest = async (
  startDate: string,
  endDate: string,
) => {
  const session = await auth();
  console.log(session?.user);
  console.log(startDate, endDate);

  // const newEvent = await db.leaveRequest.create({
  //   data: {
  //     startDate: startDate,
  //     endDate: endDate,
  //     user: {
  //       connect: {
  //         id: session?.user?.id,
  //       },
  //     },

  //   },
  // });
};
