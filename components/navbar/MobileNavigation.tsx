import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Logo from "./Logo";
import NavLink from "./NavLink";
import AuthButton from "../auth/auth-button";
import { Navlinks } from "@/lib/data-object";

const MobileNavigation = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            className="dark:hover:bg-dark-400 hover:bg-primary-500 dark:text-light-900 text-dark-100 hover:text-light-900 cursor-pointer rounded-xl"
          >
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-dark-100 dark:text-light-900 hover:text-light-900 transition"
            >
              <path
                d="M1 7H15M1 1H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="background-light900_dark200 flex flex-col justify-between border-0">
          <SheetHeader>
            <SheetTitle className="hidden">Navigation</SheetTitle>
            <Logo isMobile={true} />
          </SheetHeader>
          <SheetDescription asChild>
            <section className="flex flex-col gap-3.5">
              {Navlinks.map((l) => (
                <NavLink key={l.id} {...l} />
              ))}
            </section>
          </SheetDescription>
          <div className="flex flex-col gap-3 px-4 pb-4">
            <AuthButton route="/auth/log-in">
              <Button
                variant={"default"}
                className="background-light800_dark400! text-primary-500 w-full cursor-pointer hover:shadow-sm"
              >
                Log in
              </Button>
            </AuthButton>
            <AuthButton route="/auth/sign-in">
              <Button
                variant={"default"}
                className="background-light700_dark300 border-light-700 dark:border-dark-400 w-full cursor-pointer border hover:shadow-sm"
              >
                Sign in
              </Button>
            </AuthButton>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
