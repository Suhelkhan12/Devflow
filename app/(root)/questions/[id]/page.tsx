import { getAnswers } from "@/actions/answer/get-all-answers";
import AnswerForm from "@/components/answer/answer-form";
import AnswerList from "@/components/answer/answer-list";
import Empty from "@/components/empty";
import QuestionDetails from "@/components/question/question-details";
import { Separator } from "@/components/ui/separator";
import { getQuestionById } from "@/data/question-answer";
import { getUserSession } from "@/data/user";
import { trackQuestionViews } from "@/lib/track-question-views";
import { RouteParams } from "@/types/types";

const page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, filter = "" } = await searchParams;

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

  const { data, pagination } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 5,
    filter: filter as string,
  });

  return (
    <>
      <QuestionDetails {...question} />
      <Separator className="bg-primary-500 mt-10" />
      <AnswerForm questionId={id} />
      <Separator className="bg-primary-500 mt-10" />
      {data && data.length > 0 ? (
        <AnswerList answers={data} />
      ) : (
        <Empty heading="No answers yet" description="Be the first one to answer this question." />
      )}
    </>
  );
};

export default page;
