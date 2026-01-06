import QuestionForm from "@/components/question/question-form";

const page = () => {
  return (
    <section>
      <h1 className="h1-bold font-space-grotesk">Ask a public question</h1>
      <div className="mt-9">
        <QuestionForm mode="create" />
      </div>
    </section>
  );
};

export default page;
