import { RouteParams } from "@/types/types";
import QuestionEdit from "@/components/question/question-edit";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>{JSON.stringify(id)}</div>;
};

export default page;
