"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import QuestionTabContent from "./question-tab-content";
import AnswerTabContent from "./answer-tab-content";

const ProfileQuestionsAnswers = () => {
  const [activeTab, setActiveTab] = useState<"questions" | "answers">("questions");

  return (
    <section className="mt-10">
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "questions" | "answers")}>
        <TabsList className="background-light800_dark300 h-auto! overflow-hidden p-0">
          <TabsTrigger
            value="questions"
            className="data-[state=active]:bg-primary-fade dark:data-[state=active]:bg-dark-400 text-primary-500 cursor-pointer rounded-none px-6 py-3 text-base shadow-none"
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            className="data-[state=active]:bg-primary-fade dark:data-[state=active]:bg-dark-400 text-primary-500 cursor-pointer rounded-none px-6 py-3 text-base shadow-none"
          >
            Answers
          </TabsTrigger>
        </TabsList>
        <Suspense>
          {activeTab === "questions" && (
            <TabsContent value={"questions"}>
              <QuestionTabContent userId="121212122" />
            </TabsContent>
          )}
        </Suspense>
        <Suspense>
          {activeTab === "answers" && (
            <TabsContent value={"answers"}>
              <AnswerTabContent userId="we4234234" />
            </TabsContent>
          )}
        </Suspense>
      </Tabs>
    </section>
  );
};

export default ProfileQuestionsAnswers;
