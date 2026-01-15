"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";
import { PaginationProps } from "@/types/types";
import { useSearchParams } from "next/navigation";

const PaginationComponent = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  //when in the db question number is less than 10
  if (totalPages <= 1) return null;

  /**
     * Pagination is URL-driven (?page=2&pageSize=10)
        Clicking a page:
        Updates the URL
        Triggers a new server render
        Calls getQuestions() again automatically
        No client-side fetching needed.
     */
  const createUrl = (page: number) => {
    return formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page.toString(),
    });
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* previous */}
        <PaginationItem>
          {/* just in case we are on first page and we don't go to the unknown page */}
          <PaginationPrevious
            href={createUrl(Math.max(currentPage - 1, 1))}
            className="hover:text-primary-500 transition"
          />
        </PaginationItem>

        {/* page number */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={createUrl(pageNumber)}
                isActive={pageNumber === currentPage}
                className={cn(
                  pageNumber === currentPage ? "bg-primary-500 border-0" : "",
                  "hover:ring-primary-500 hover:ring-1"
                )}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* next */}
        <PaginationItem>
          <PaginationNext
            href={createUrl(Math.max(currentPage + 1, totalPages))}
            className="hover:text-primary-500 transition"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
