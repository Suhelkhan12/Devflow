import { Answer } from "@/types/types";
interface AnswerListProps {
  answers: Answer[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  return <section className="mt-10">{answers.length}</section>;
};

export default AnswerList;
