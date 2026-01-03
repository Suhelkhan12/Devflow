"use server";

import { getQuestionById, getQuestionTags } from "@/data/question-answer";
import { getUserSession } from "@/data/user";
import { EditQuestionFormSchema } from "@/schemas";
import * as z from "zod";

export const createQuestion = async (values: z.infer<typeof EditQuestionFormSchema>) => {
  const validatedFields = EditQuestionFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields in the question data." };
  }
  const {
    questionTitle: title,
    questionExplaination: content,
    questionTags: newTags,
    questionId,
  } = validatedFields.data;

  // checking if user is logged in
  const userSession = await getUserSession();
  if (!userSession) return { error: "Please log in to edit question." };

  // fetching question from the database
  const question = await getQuestionById(questionId);
  if (!question) {
    return { error: "This question do not exists." };
  }
  // checking if the question that is being edited whether it is created by the logged in user or someone else
  const isQuestionBelongToUser = question.userId && userSession.user.id;
  if (!isQuestionBelongToUser) {
    return { error: "You do not have access to edit this question." };
  }

  // fetching tags assosiated with the question to update then as well
  const existingTags = await getQuestionTags(questionId);
  if (!existingTags) {
    return { error: "Something went wrong. Please try again later." };
  }
  // normalising only names assosiated with tags and removing duplicates just incase
  const existingTagNames = new Set(existingTags.map((tg) => tg.name));
  const newTagNames = new Set(newTags.map((tg) => tg.name.toLowerCase())); // they are sent by user from ui

  // filtered new tags which will be added to database
  const tagsToAdd = [...newTagNames].filter((tg) => !existingTagNames.has(tg));
  // filtered tags which will be removed from database
  const tagsToRemove = [...existingTagNames].filter((tg) => !newTagNames.has(tg));

  try {
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
