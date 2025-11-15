import { SidebarProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const SidebarWrapper = ({ children, side }: SidebarProps) => {
  const isLeft = side === "left";
  const isRight = side === "right";
  return (
    <ScrollArea>
      <div
        className={cn(
          "background-light900_dark200 dark:border-dark-300 font-inter fixed z-50 flex h-screen flex-col justify-between overflow-auto overflow-y-auto px-6 pt-32 pb-10 max-lg:hidden",
          isLeft && "top-0 left-0 border-r",
          isRight && "top-0 right-0 border-l"
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
};

export default SidebarWrapper;
