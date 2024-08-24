"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "./db";
import { redirect } from "next/navigation";
import { User, UserRole, LeaveState } from "@prisma/client";
import { auth } from "./auth";

export const getEvents = async (where = {}) => {
  noStore();

  const data = await db.leaveRequest.findMany({
    where: where,
    include: {
      user: true,
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return data;
};

export const getEventsForCalendar = async () => {
  noStore();

  const data = await getEvents({ NOT: [{ state: LeaveState.DECLINED }] });

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
  categoryId: number,
) => {
  const session = await auth();
  console.log(session?.user);
  console.log(startDate, endDate);

  const newEvent = await db.leaveRequest.create({
    data: {
      startDate: startDate,
      endDate: endDate,
      user: {
        connect: {
          id: session?.user?.id,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  redirect("/");
};

export const getUsers = async () => {
  const session = await auth();
  const users = await db.user.findMany();

  return users;
};

export const getUser = async (id: string) => {
  const user = await db.user.findFirst({ where: { id: id } });

  return user;
};

export const getUserCategories = async (id: string) => {
  const session = await auth();

  const user = await db.user.findFirst({
    where: { id: id },
    include: { categories: true },
  });

  return user?.categories;
};

export const getAllCategoires = async () => {
  const categories = await db.leaveCategory.findMany();

  return categories;
};

export const updateUser = async (formData: FormData) => {
  const role = formData.get("role") as UserRole;
  const categories = formData.getAll("category");
  const categoryIds = categories.map((id) => {
    return { id: parseInt(id as string) };
  });
  const userId = formData.get("userId") as string;

  const categoriesDB = await db.user.update({
    where: { id: userId },
    data: {
      ...(role != null ? { role: role } : {}),
      categories: {
        set: categoryIds,
      },
    },
  });

  console.log(role, categoryIds, userId);
  redirect("/users");
};

export const acceptRequest = async (reqId: number) => {
  const request = await db.leaveRequest.update({
    where: { id: reqId },
    data: { state: LeaveState.ACCEPTED },
  });

  revalidatePath("/leave-request");
  revalidatePath("/");
};

export const declineReq = async (reqId: number) => {
  const request = await db.leaveRequest.update({
    where: { id: reqId },
    data: { state: LeaveState.DECLINED },
  });

  revalidatePath("/leave-request");
  revalidatePath("/");
};
