import HomeFilters from "@/components/filters/home-filters";
import QuestionCard from "@/components/question/question-card";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { getAllQuestions } from "@/data/question-answer";
import Link from "next/link";

interface searchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: searchParams) => {
  //fetching the search params here
  const { query = "", filter = "" } = await searchParams;

  // fetching questions from the database
  const DB_QUESTIONS = await getAllQuestions();

  // filtering the questions based on search params
  const filteredQuestions = DB_QUESTIONS.filter((q) => {
    const matchesQuery = q.title.toLowerCase().includes((query as string).toLowerCase());
    const matchesFilter = filter
      ? q.tags.some((tg) => tg.tag.name.toLowerCase() === (filter as string).toLowerCase())
      : true;
    return matchesQuery && matchesFilter;
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
        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            {...q}
            author={{ id: q.author.id, name: q.author.name as string, image: q.author.image as string }}
          />
        ))}
      </section>
    </div>
  );
};

export default page;
