import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PaginationProps } from "@/types/types";

const PaginationComponent = ({ currentPage, totalPages, filter, query, baseUrl }: PaginationProps) => {
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
    const params = new URLSearchParams();
    params.set("page", page.toString());

    // adding query and filter to the url if they exits
    if (query) params.set("query", query.toString());
    if (filter) params.set("filter", filter.toString());

    return `${baseUrl}?${params.toString()}`;
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
