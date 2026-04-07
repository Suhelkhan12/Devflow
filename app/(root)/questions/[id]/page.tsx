import AnswerForm from "@/components/answer/answer-form";
import Empty from "@/components/empty";
import QuestionDetails from "@/components/question/question-details";
import { getQuestionById } from "@/data/question-answer";
import { getUserSession } from "@/data/user";
import { trackQuestionViews } from "@/lib/track-question-views";
import { RouteParams } from "@/types/types";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const session = await getUserSession();
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

  // using track question view event to track question views and also to prevent users from viewing questions that they don't have access to
  if (session?.user.id && session.user.id !== question.userId) {
    await trackQuestionViews({
      userId: session.user.id,
      questionId: id,
    });
  }

  return (
    <>
      <QuestionDetails {...question} /> <AnswerForm questionId={id} />
    </>
  );
};

export default page;
