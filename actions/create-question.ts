"use server";

import * as z from "zod";
import { AskQuestionFormSchema } from "@/schemas";
import { auth } from "@/auth";

export const createQuestion = async (values: z.infer<typeof AskQuestionFormSchema>) => {
  // validating the fields
  const validatedFields = AskQuestionFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields in the question data." };
  }
  // get the fields
  const { questionTitle, questionExplaination, questionTags } = validatedFields.data;
  // checking the sesssion if user is logged in or not
  const session = await auth();
  if (!session) {
    return { error: "Please login to ask the question." };
  }

  return { success: "Question submitted successfully." };
};
