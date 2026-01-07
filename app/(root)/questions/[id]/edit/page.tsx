import QuestionForm from "@/components/question/question-form";
import { getQuestionById, getQuestionTags } from "@/data/question-answer";
import { getUserSession } from "@/data/user";
import { ROUTES } from "@/lib/routes";
import { RouteParams } from "@/types/types";
import { notFound, redirect } from "next/navigation";

const page = async ({ params }: RouteParams) => {
  // if there is no id in the params
  const { id } = await params;
  if (!id) return notFound();

  // checking user login status
  const userSession = await getUserSession();
  if (!userSession) {
    return redirect("/auth/log-in");
  }

  // getting the question data from the database
  const question = await getQuestionById(id);
  const questionTags = await getQuestionTags(id);

  // edge cases
  if (!question || !questionTags) {
    return redirect("/");
  }

  // checking whether question belongs to user or not
  if (question.userId !== userSession.user.id) {
    redirect(ROUTES.QUESTION(id));
  }

  return (
    <QuestionForm
      mode="edit"
      seedData={{ id, seedTitle: question.title, seedContent: question.content, seedTags: questionTags }}
    />
  );
};

export default page;
