import { pluralize } from "@/lib/utils";
import { Answer } from "@/types/types";
interface AnswerListProps {
  answers: Answer[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  return (
    <section className="mt-10">
      <div className="flex-between">
        <h2 className="text-primary-500 h2-semibold">{pluralize(answers.length, "Answer")}</h2>
      </div>
    </section>
  );
};

export default AnswerList;
