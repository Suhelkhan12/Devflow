import { getQuestions } from "@/actions/question/get-all-questions";
import Empty from "@/components/empty";
import HomeFilters from "@/components/filters/home-filters";
import PaginationComponent from "@/components/question/pagination";
import QuestionCard from "@/components/question/question-card";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface searchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: searchParams) => {
  //fetching the search params here
  const { page, pageSize, query = "", filter = "" } = await searchParams;

  const currentPage = Number(page) || 1;
  // fetching questions from the database
  const { data, pagination } = await getQuestions({
    page: currentPage,
    pageSize: Number(pageSize) || 2,
    query: query as string,
    filter: filter as string,
  });

  // here we can filter QUESTIONS based on the params if needed
  return (
    <div className="font-inter flex flex-col">
      <section className="flex flex-col gap-7.5">
        <div className="flex-between">
          <h1 className="h1-bold font-space-grotesk">All question</h1>
          <Button variant={"primary"} asChild>
            <Link href={"/ask-question"}>Ask a question</Link>
          </Button>
        </div>
        <LocalSearch route="/" placeholder="Search for questions here..." />
        <HomeFilters />
      </section>
      <section className="mt-10 flex flex-col gap-6">
        {data && data.length > 0 ? (
          data.map((q) => (
            <QuestionCard
              key={q.id}
              {...q}
              author={{ id: q.author.id, name: q.author.name as string, image: q.author.image as string }}
            />
          ))
        ) : (
          <Empty
            heading="It’s quiet here 👀"
            description="No questions yet. Ask the first one and get the conversation going!"
          />
        )}
      </section>

      <PaginationComponent
        currentPage={pagination?.page as number}
        totalPages={pagination?.totalPages as number}
        baseUrl="/"
        query={query as string}
        filter={filter as string}
      />
    </div>
  );
};

export default page;
