"use client";

import UserProfile from "../user-profile/user-profle";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  // const pathname = usePathname();
  // const isHidden = pathname?.includes("/auth/");
  return (
    <nav
      className={cn(
        "flex-between background-light900_dark200 shadow-light-300 dark:border-dark-300 fixed z-100 w-full border-b p-4 md:p-5 dark:shadow-none"
      )}
    >
      <Logo isMobile={false} />
      <p className="max-md:hidden">Global search bar comes here</p>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserProfile />
      </div>
      <MobileNavigation />
    </nav>
  );
};

export default Navbar;
