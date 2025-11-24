import HomeFilters from "@/components/filters/home-filters";
import QuestionCard from "@/components/question/question-card";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { Question } from "@/lib/types";
import Link from "next/link";

const QUESTIONS: Question[] = [
  {
    _id: "1",
    title: "What is Next.js?",
    description: "I want to learn more about Next.js and its features.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    upvotes: 10,
    answers: 2,
    views: 150,
    createdAt: "2025-01-12T10:15:00.000Z",
  },
  {
    _id: "2",
    title: "How does React Server Components work?",
    description: "Can someone explain how RSCs differ from traditional client components?",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "Next.js" },
    ],
    author: {
      _id: "2",
      name: "Emily Carter",
      image: "https://github.com/shadcn.png",
    },
    upvotes: 25,
    answers: 5,
    views: 480,
    createdAt: "2025-01-12T10:15:00.000Z",
  },
  {
    _id: "3",
    title: "Best practices for TypeScript in large projects?",
    description: "Looking for suggestions on structuring and organizing TypeScript code.",
    tags: [
      { _id: "5", name: "TypeScript" },
      { _id: "6", name: "Architecture" },
    ],
    author: {
      _id: "3",
      name: "Michael Lee",
      image: "https://github.com/shadcn.png",
    },
    upvotes: 18,
    answers: 3,
    views: 320,
    createdAt: "2025-03-18T14:45:00.000Z",
  },
  {
    _id: "4",
    title: "How do I optimize images in Next.js?",
    description: "I am confused between using `<Image />` and external loaders.",
    tags: [
      { _id: "7", name: "Next.js" },
      { _id: "8", name: "Performance" },
    ],
    author: {
      _id: "4",
      name: "Sophia Williams",
      image: "https://github.com/shadcn.png",
    },
    upvotes: 12,
    answers: 1,
    views: 210,
    createdAt: "2025-04-01T19:20:00.000Z",
  },
  {
    _id: "5",
    title: "What is the difference between REST and GraphQL?",
    description: "Trying to understand when to choose REST and when GraphQL is better.",
    tags: [
      { _id: "9", name: "API" },
      { _id: "10", name: "GraphQL" },
    ],
    author: {
      _id: "5",
      name: "David Johnson",
      image: "https://github.com/shadcn.png",
    },
    upvotes: 40,
    answers: 7,
    views: 900,
    createdAt: "2025-05-10T06:55:00.000Z",
  },
];

interface searchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: searchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = QUESTIONS.filter((q) => {
    const matchesQuery = q.title.toLowerCase().includes((query as string).toLowerCase());
    const matchesFilter = filter
      ? q.tags.some((tag) => tag.name.toLowerCase() === (filter as string).toLowerCase())
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
            <Link href={"/ask-a-question"}>Ask a question</Link>
          </Button>
        </div>
        <LocalSearch route="/" placeholder="Search for questions here..." />
        <HomeFilters />
      </section>
      <section className="mt-10 flex flex-col gap-6">
        {filteredQuestions.map((q) => (
          <QuestionCard key={q._id} {...q} />
        ))}
      </section>
    </div>
  );
};

export default page;
