"use client";

import { Answer, Author } from "@/types/types";
import { useOptimistic, useTransition } from "react";
import AnswerFormWrapper from "./answer-form-wrapper";

interface Props {
  intialAnswers: Answer[];
  questionId: string;
  author: Author;
}

const AnswerSection = ({ intialAnswers, questionId, author }: Props) => {
  const [isPending, startTransition] = useTransition();

  // for updating the answer list optimistically after posting a new answer without waiting for the server response
  const [optimisticAnswer, setOptimisticAnswer] = useOptimistic<Answer[], Answer>(intialAnswers, (state, newAnswer) => [
    newAnswer,
    ...state,
  ]);

  return <></>;
};

export default AnswerSection;
