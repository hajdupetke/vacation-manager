import { signOut } from "~/server/auth";
import LogOut from "public/assets/logout.svg";
import Image from "next/image";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="flex items-center gap-2">
        Sign Out
        <Image src={LogOut} alt="logout icon" width={20} />
      </button>
    </form>
  );
}
