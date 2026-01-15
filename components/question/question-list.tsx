// components/question/question-list.tsx
import QuestionCard from "./question-card";
import Empty from "../empty";
import { Question } from "@/types/types";

interface QuestionListProps {
  data: Question[]; // You can type it properly based on your Question type
}

const QuestionList = ({ data }: QuestionListProps) => {
  if (!data || data.length === 0) {
    return (
      <Empty
        heading="It’s quiet here 👀"
        description="No questions yet. Ask the first one and get the conversation going!"
      />
    );
  }

  return (
    <section className="mt-10 flex flex-col gap-6">
      {data.map((q) => (
        <QuestionCard
          key={q.id}
          {...q}
          author={{
            id: q.author.id,
            name: q.author.name as string,
            image: q.author.image as string,
          }}
        />
      ))}
    </section>
  );
};

export default QuestionList;
