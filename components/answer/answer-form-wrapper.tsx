"use client";

import { useState } from "react";
import AnswerForm from "./answer-form";

interface AnswerFormWrapperProps {
  questionId: string;
}

const AnswerFormWrapper = ({ questionId }: AnswerFormWrapperProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (submitted) {
    return (
      <div className="mt-10 flex items-center gap-3 rounded-md border border-green-400 bg-green-100 p-4 text-green-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">Thanks for your answer! It has been submitted successfully.</span>
      </div>
    );
  }
  return <AnswerForm questionId={questionId} hasSubmited={setSubmitted} />;
};

export default AnswerFormWrapper;
