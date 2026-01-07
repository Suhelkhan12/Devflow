"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import Image from "next/image";

const FILTERS = [
  {
    name: "React",
    value: "react",
  },
  {
    name: "JavaScript",
    value: "javascript",
  },
  // {
  //   name: "All",
  //   value: "all",
  // },
  // {
  //   name: "Popular",
  //   value: "popular",
  // },
  // {
  //   name: "Newest",
  //   value: "newest",
  // },
  // {
  //   name: "Recommended",
  //   value: "recommended",
  // },
  // {
  //   name: "Answered",
  //   value: "answered",
  // },
  // {
  //   name: "Unanswered",
  //   value: "unanswered",
  // },
];

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [activeFilter, setActiveFilter] = useState(filterParams || "");

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) {
      setActiveFilter("");
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
      router.push(newUrl);
    } else {
      setActiveFilter(filter);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
      router.push(newUrl);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Image src={"/icons/filter.svg"} className="dark:text-white" width={24} height={24} alt="filter icon" />
      {FILTERS.map((ftr) => (
        <Button
          size={"lg"}
          key={ftr.name}
          className={cn(
            "bg-light-800 dark:bg-dark-300 text-light-500 body-medium cursor-pointer rounded-lg",
            "hover:bg-primary-100 dark:hover:bg-dark-400",
            activeFilter === ftr.value && "text-primary-500 bg-primary-100 dark:bg-dark-400"
          )}
          onClick={() => handleFilterChange(ftr.value)}
        >
          {ftr.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
