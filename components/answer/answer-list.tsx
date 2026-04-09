import { getTimeStamp, pluralize } from "@/lib/utils";
import { Answer } from "@/types/types";
import FilterDropdown from "../filters/filter-dropdown";
import { ANSWER_FILTERS } from "@/lib/data-object";
import Metric from "../Metric";
import { ROUTES } from "@/lib/routes";
import ContentPreview from "../question/question-content-preview";

interface AnswerListProps {
  answers: Answer[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  return (
    <section className="mt-10">
      <div className="flex-between mb-6">
        <h2 className="text-primary-500 h2-semibold">{pluralize(answers.length, "Answer")}</h2>
        <FilterDropdown filters={ANSWER_FILTERS} />
      </div>
      {answers.map((ans) => (
        <AnswerUI key={ans.id} answer={ans} />
      ))}
    </section>
  );
};

function AnswerUI({ answer }: { answer: Answer }) {
  return (
    <div className="mb-10 flex flex-col">
      <div className="flex-between">
        <Metric
          imgUrl={answer.author.image!}
          alt={answer.author.name!}
          href={ROUTES.USER(answer.author.id)}
          value={answer.author.name!}
          textStyles="body-regular"
          title={`- answered ${getTimeStamp(new Date(answer.createdAt))}`}
        />
        <div>votes</div>
      </div>
      <ContentPreview content={answer.content} />
    </div>
  );
}

export default AnswerList;
