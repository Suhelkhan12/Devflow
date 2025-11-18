"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { LocalSearchProps } from "@/lib/types";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

const LocalSearch = ({ route, placeholder }: LocalSearchProps) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState<string>(query);

  useEffect(() => {
    if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: searchQuery,
      });

      router.push(newUrl);
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["query"],
      });
      router.push(newUrl);
    }
  }, [searchQuery, router, route]);

  return (
    <div className={cn("flex min-w-lg flex-col gap-10 max-lg:hidden")}>
      <Input
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 rounded-[10px] p-6 tracking-wide focus-visible:ring-0"
        type={"search"}
      />
      <div className="flex flex-col gap-6">
        <p>SearchQuery: {searchQuery.toString()}</p>
        <p>SearchParams: {searchParams.toString()}</p>
      </div>
    </div>
  );
};

export default LocalSearch;
