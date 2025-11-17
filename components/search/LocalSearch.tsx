"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { LocalSearchProps } from "@/lib/types";

const LocalSearch = ({ route, placeholder }: LocalSearchProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState<string>(query);
  const router = useRouter();

  return (
    <div className={cn("min-w-lg max-lg:hidden")}>
      <Input
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 rounded-[10px] p-6 tracking-wide focus-visible:ring-0"
        type={"search"}
      />
    </div>
  );
};

export default LocalSearch;
