"use client";

import UserProfile from "../user-profile/user-profle";
import GlobalSearch from "./GlobalSearch";
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
        "flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full p-6 max-sm:p-4 dark:shadow-none"
      )}
    >
      <Logo isMobile={false} />
      <GlobalSearch />
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserProfile />
      </div>
      <MobileNavigation />
    </nav>
  );
};

export default Navbar;
