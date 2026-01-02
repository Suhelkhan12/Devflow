import Image from "next/image";
import LoginSigninButtons from "@/components/auth/login-signin-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import LogoutButton from "@/components/auth/log-out-button";

const LeftSidebarButton = async () => {
  const session = await auth();

  return (
    <>
      {session ? (
        <LogoutButton>
          <Button variant={"primary"} className="w-full">
            <Image src={"/icons/logout.svg"} alt="logout icon" width={20} height={20} className="dark:invert-colors" />
            Logout
          </Button>
        </LogoutButton>
      ) : (
        <LoginSigninButtons />
      )}
    </>
  );
};

export default LeftSidebarButton;
