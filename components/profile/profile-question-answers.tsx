"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ProfileQuestionsAnswers = () => {
  const [activeTab, setActiveTab] = useState<"questions" | "answers">("questions");

  return (
    <section className="mt-10">
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "questions" | "answers")}>
        <TabsList className="background-light800_dark300 h-auto! overflow-hidden p-0">
          <TabsTrigger
            value="questions"
            className="data-[state=active]:bg-primary-fade dark:data-[state=active]:bg-dark-400 text-primary-500 cursor-pointer rounded-none px-6 py-3 shadow-none"
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            className="data-[state=active]:bg-primary-fade dark:data-[state=active]:bg-dark-400 text-primary-500 cursor-pointer rounded-none px-6 py-3 shadow-none"
          >
            Answers
          </TabsTrigger>
        </TabsList>
        <Suspense>{activeTab === "questions" && <TabsContent value={"questions"}>Questions</TabsContent>}</Suspense>
        <Suspense>{activeTab === "answers" && <TabsContent value={"answers"}>Answers</TabsContent>}</Suspense>
      </Tabs>
    </section>
  );
};

export default ProfileQuestionsAnswers;
