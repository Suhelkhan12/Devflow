import { getQuestions } from "@/actions/question/get-all-questions";
import Empty from "@/components/empty";
import PaginationComponent from "@/components/question/pagination";
import QuestionCard from "@/components/question/question-card";
import RootTop from "@/components/question/root-top";

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
      <RootTop />
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
      <PaginationComponent currentPage={pagination?.page as number} totalPages={pagination?.totalPages as number} />
    </div>
  );
};

export default page;
