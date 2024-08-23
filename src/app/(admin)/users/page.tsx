import { auth } from "~/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user || session?.user?.role != UserRole.ADMINISTRATOR)
    redirect("/");

  return <h1>Admin Users Page</h1>;
}
