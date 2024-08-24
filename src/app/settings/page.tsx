import { auth } from "~/server/auth";
import { getUser, saveSettings } from "~/server/action";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  const user = await getUser(session?.user?.id as string);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <form
        className="form-control w-10/12 md:w-2/3 lg:w-1/2"
        action={saveSettings}
      >
        <label className="label cursor-pointer gap-2">
          <span className="label-text">
            Send me email notifications when status of my request changes
          </span>
          <input
            type="checkbox"
            defaultChecked={user?.notifications ?? true}
            className="checkbox"
            name="notifications"
          />
        </label>
        <button type="submit" className="btn btn-primary w-1/3">
          Save settings
        </button>
      </form>
    </main>
  );
}
