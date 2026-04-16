import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ProfileQuestionsAnswers = () => {
  return (
    <section className="mt-10">
      <Tabs defaultValue="questions">
        <TabsList className="background-light800_dark300 h-auto! overflow-hidden p-0">
          <TabsTrigger
            value="questions"
            className="data-[state=active]:bg-primary-fade dark:data-[state=active]:bg-dark-400 cursor-pointer rounded-none px-6 py-3"
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            className="data-[state=active]:bg-primary-fade dark:data-[state=active]:bg-dark-400 cursor-pointer rounded-none px-6 py-3"
          >
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">Questions</TabsContent>
        <TabsContent value="answers">Answers</TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfileQuestionsAnswers;
