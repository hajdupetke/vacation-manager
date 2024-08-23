import { signIn } from "~/server/auth";
import Image from "next/image";
import GoogleLogo from "public/assets/google-logo.svg";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className="flex items-center gap-2">
        Sign in with
        <Image src={GoogleLogo} alt="Google-Logo" width={24} />
      </button>
    </form>
  );
}
