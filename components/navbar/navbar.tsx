import Logo from "./logo";
import ThemeToggle from "./theme-toggle";

const navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full p-6 dark:shadow-none">
      <Logo />

      <ThemeToggle />
    </nav>
  );
};

export default navbar;
