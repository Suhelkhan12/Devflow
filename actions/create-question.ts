"use server";

import * as z from "zod";
import { AskQuestionFormSchema } from "@/schemas";
import { auth } from "@/auth";
import db from "@/lib/prisma";

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

  // const upsertedTags = await db.$transaction(
  //   questionTags.map((tag) =>
  //     db.tag.upsert({
  //       where: { name: tag.name },
  //       update: {},
  //       create: { name: tag.name },
  //       select: { id: true },
  //     })
  //   )
  // );


  return { success: "Question submitted successfully." };
};
