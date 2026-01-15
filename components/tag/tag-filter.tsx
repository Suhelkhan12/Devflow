"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

const TAGFILTERS = [
  { id: "1", label: "Most Answered", value: "most_answered" },
  { id: "2", label: "Recently Added", value: "recent" },
  { id: "3", label: "Alphabetical (A–Z)", value: "alphabetical" },
];

const TagFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // state to control Select value
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(searchParams.get("filter") ?? undefined);

  const onValueChange = (value: string) => {
    setSelectedFilter(value); // update UI
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl);
  };

  const onClickClear = () => {
    setSelectedFilter(undefined); // reset Select UI
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["filter"],
    });
    router.push(newUrl);
  };

  return (
    <Select value={selectedFilter} onValueChange={onValueChange}>
      <SelectTrigger className="text-dark500_light400 dark:border-dark-400 background-light800_dark200 w-45 cursor-pointer rounded-lg px-4 py-6">
        <SelectValue placeholder="Filter tags" />
      </SelectTrigger>
      <SelectContent side={"bottom"} position={"popper"} className="dark:border-dark-400">
        <SelectGroup>
          <div className="mb-3 flex items-center justify-between">
            <SelectLabel className="text-primary-500 font-medium">Filters</SelectLabel>
            <Button variant={"link"} size={"sm"} className="text-xs" onClick={onClickClear}>
              Clear
            </Button>
          </div>
          {TAGFILTERS.map((tg) => (
            <SelectItem
              key={tg.id}
              value={tg.value}
              className="text-dark500_light400 hover:bg-primary-100/50 dark:hover:bg-primary-500/5 data-[state=checked]:bg-primary-100 data-[state=checked]:dark:bg-primary-500/10 cursor-pointer py-2.5 capitalize transition duration-300"
            >
              {tg.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TagFilter;
