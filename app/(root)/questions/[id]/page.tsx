import Empty from "@/components/empty";
import QuestionDetails from "@/components/question/question-details";
import { getQuestionById } from "@/data/question-answer";
import { RouteParams } from "@/types/types";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const question = await getQuestionById(id);
  if (!question)
    return (
      <Empty
        heading="Question not available"
        description="The question you’re looking for doesn’t exist or may have been removed. Please go back to the home page and try again."
        href="/"
        buttonLabel="Back to home"
      />
    );

  return <QuestionDetails {...question} />;
};

export default page;
