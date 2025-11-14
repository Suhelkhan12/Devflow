import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const GlobalSearch = () => {
  return (
    <div className={cn("min-w-lg max-lg:hidden")}>
      <Input
        placeholder="Seach globally..."
        className="border-light-700 placeholder:text-light-400 dark:dark-gradient rounded-[10px] p-6 tracking-wide focus-visible:ring-0 dark:border-0"
        type={"search"}
      />
    </div>
  );
};

export default GlobalSearch;
