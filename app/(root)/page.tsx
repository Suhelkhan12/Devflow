import { getQuestions } from "@/actions/question/get-all-questions";
import PaginationComponent from "@/components/question/pagination";
import QuestionList from "@/components/question/question-list";
import RootTop from "@/components/question/root-top";
import { Question } from "@/types/types";

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
    pageSize: Number(pageSize) || 5,
    query: query as string,
    filter: filter as string,
  });

  // here we can filter QUESTIONS based on the params if needed
  return (
    <div className="font-inter flex flex-col">
      {/* top section */}
      <RootTop />
      {/* rendering questions */}
      <QuestionList data={data as Question[]} />
      {/* pagination */}
      <PaginationComponent currentPage={pagination?.page as number} totalPages={pagination?.totalPages as number} />
    </div>
  );
};

export default page;
