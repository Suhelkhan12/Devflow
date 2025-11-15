import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const GlobalSearch = () => {
  return (
    <div className={cn("min-w-lg max-lg:hidden")}>
      <Input
        placeholder="Seach globally..."
        className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 rounded-[10px] p-6 tracking-wide focus-visible:ring-0"
        type={"search"}
      />
    </div>
  );
};

export default GlobalSearch;
