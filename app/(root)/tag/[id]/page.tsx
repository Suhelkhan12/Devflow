import Empty from "@/components/empty";
import QuestionList from "@/components/question/question-list";
import { getTagById } from "@/data/question-answer";
import { RouteParams } from "@/types/types";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const tag = await getTagById(id);
  if (!tag) {
    return (
      <Empty
        heading="Tag not found"
        description="Sorry, we couldn’t find any questions for this tag. Try searching for a different topic or check back later."
        buttonLabel="Back to home"
        href="/"
      />
    );
  }
  // destructure questions from tag
  const questions = tag.questions.map((q) => q.question);
  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-10">
        <h1 className="h1-bold font-space-grotesk capitalize">[{tag.name}]</h1>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">{tag.totalQuestion}+</span>
          Questions
        </p>
      </div>
      <p className="mt-3">{tag.description} </p>
      <QuestionList data={questions} />
    </section>
  );
};

export default page;
