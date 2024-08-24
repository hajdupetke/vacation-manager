import { auth } from "~/server/auth";
import { getUser, saveSettings } from "~/server/action";

export default async function SettingsPage() {
  const session = await auth();

  const user = await getUser(session?.user?.id as string);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <form className="form-control w-10/12 md:w-full" action={saveSettings}>
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
