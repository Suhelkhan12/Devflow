import { SidebarProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const SidebarWrapper = ({ children }: SidebarProps) => {
  return (
    <ScrollArea>
      <div
        className={cn(
          "background-light900_dark200 dark:border-dark-300 font-inter sticky top-0 z-50 flex h-screen flex-col justify-between overflow-auto overflow-y-auto px-6 pt-32 pb-10 [scrollbar-width:none] max-lg:hidden"
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
};

export default SidebarWrapper;
