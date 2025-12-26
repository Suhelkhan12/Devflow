import Image from "next/image";
import LoginSigninButtons from "@/components/auth/login-signin-button";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

const LeftSidebarButton = async () => {
  const session = await auth();

  return (
    <>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut({});
          }}
        >
          <Button variant={"primary"} className="w-full">
            <Image src={"/icons/logout.svg"} alt="logout icon" width={20} height={20} className="dark:invert-colors" />
            Logout
          </Button>
        </form>
      ) : (
        <LoginSigninButtons />
      )}
    </>
  );
};

export default LeftSidebarButton;
