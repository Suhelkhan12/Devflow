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
import { formUrlQuery } from "@/lib/url";
import { FilterOption } from "@/types/types";

const TagFilter = ({ filters }: { filters: FilterOption[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // state to control Select value
  const [selectedFilter, setSelectedFilter] = useState<string>(searchParams.get("filter") ?? "");

  const onValueChange = (value: string) => {
    setSelectedFilter(value); // update UI
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl);
  };

  return (
    <Select value={selectedFilter} onValueChange={onValueChange}>
      <SelectTrigger className="text-dark500_light400 dark:border-dark-400 background-light800_dark200 w-45 cursor-pointer rounded-lg px-4 py-6">
        <SelectValue placeholder="Filter tags" />
      </SelectTrigger>
      <SelectContent side={"bottom"} position={"popper"} className="dark:border-dark-400 background-light900_dark200">
        <SelectGroup>
          <SelectLabel className="text-primary-500 font-medium">Filters</SelectLabel>

          {filters.map((fl) => (
            <SelectItem
              key={fl.id}
              value={fl.value}
              className="text-dark500_light400 hover:bg-primary-100/50 dark:hover:bg-primary-500/5 data-[state=checked]:bg-primary-100 data-[state=checked]:dark:bg-primary-500/10 cursor-pointer py-2.5 capitalize transition duration-300"
            >
              {fl.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TagFilter;
