import { SidebarProps } from "@/types/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const SidebarWrapper = ({ children, side, additionalClasses }: SidebarProps) => {
  return (
    <ScrollArea className={cn(side === "right" && "hidden xl:block")}>
      <div
        className={cn(
          "background-light900_dark200 b dark:border-dark-300 font-inter sticky top-0 bottom-0 z-50 flex h-screen flex-col justify-between overflow-auto overflow-y-auto px-4 pt-32 pb-10 [scrollbar-width:none] max-lg:hidden sm:px-6",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          additionalClasses
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
};

export default SidebarWrapper;
