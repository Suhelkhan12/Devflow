import GlobalSearch from "./GlobalSearch";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full p-6 max-sm:p-4 dark:shadow-none">
      <Logo isMobile={false} />
      <GlobalSearch />
      <ThemeToggle />
      <MobileNavigation />
    </nav>
  );
};

export default Navbar;
