import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Logo from "./Logo";
import MobileNavlink from "./MobileNavLink";
import { MobileNavlinkProps } from "@/lib/types";

const MOBILENAVLINKS: MobileNavlinkProps[] = [
  { id: "Home", href: "/", label: "Home", icon: "/icons/home.svg" },
  { id: "Collections", href: "/collections", label: "Collections", icon: "/icons/star.svg" },
  { id: "Find Jobs", href: "/jobs", label: "Find Jobs", icon: "/icons/suitcase.svg" },
  { id: "Tags", href: "/tags", label: "Tags", icon: "/icons/tag.svg" },
  { id: "Communities", href: "/communites", label: "Communities", icon: "/icons/community.svg" },
  { id: "Ask a Question", href: "/ask-a-question", label: "Ask a Question", icon: "/icons/question.svg" },
];

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
            <SheetClose asChild>
              <section className="flex flex-col gap-3.5">
                {MOBILENAVLINKS.map((l) => (
                  <MobileNavlink key={l.id} {...l} />
                ))}
              </section>
            </SheetClose>
          </SheetDescription>
          <div className="flex flex-col gap-3 px-4 pb-4">
            <SheetClose asChild>
              <Button
                variant={"default"}
                className="background-light800_dark400! text-primary-500 cursor-pointer hover:shadow-sm"
              >
                Log in
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={"default"}
                className="background-light700_dark300 border-light-700 dark:border-dark-400 cursor-pointer border hover:shadow-sm"
              >
                Sign up
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
