import HomeFilters from "@/components/filters/home-filters";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QUESTIONS = [
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
    },
    upvotes: 10,
    answers: 2,
    views: 150,
    createdAt: new Date(),
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
    },
    upvotes: 25,
    answers: 5,
    views: 480,
    createdAt: new Date(),
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
    },
    upvotes: 18,
    answers: 3,
    views: 320,
    createdAt: new Date(),
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
    },
    upvotes: 12,
    answers: 1,
    views: 210,
    createdAt: new Date(),
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
    },
    upvotes: 40,
    answers: 7,
    views: 900,
    createdAt: new Date(),
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
      <div className="flex flex-col gap-7.5">
        <div className="flex-between">
          <h1 className="h1-bold">All question</h1>
          <Button variant={"primary"} asChild>
            <Link href={"/ask-a-question"}>Ask a question</Link>
          </Button>
        </div>
        <LocalSearch route="/" placeholder="Search for questions here..." />
        <HomeFilters />
      </div>
      <div className="mt-10 flex flex-col gap-4">
        {filteredQuestions.map((q) => (
          <h1 className="body-medium" key={q._id}>
            {q.title}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default page;
