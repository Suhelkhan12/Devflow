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
  const { questionTitle: title, questionExplaination: content, questionTags: tags } = validatedFields.data;
  // checking the sesssion if user is logged in or not
  const session = await auth();
  if (!session) {
    return { error: "Please login to ask the question." };
  }
  const userId = session.user.id;
  if (!userId) {
    return { error: "Something went wrong!" };
  }

  // putting the tags in the database using upsert so that it can be updated side by side as well
  const upsertedTags = await db.$transaction(
    tags.map((tag) =>
      db.tag.upsert({
        where: { name: tag.name.toLocaleLowerCase() },
        update: {
          totalQuestion: {
            increment: 1,
          },
        },
        create: { name: tag.name.toLocaleLowerCase(), totalQuestion: 1 },
        select: { id: true },
      })
    )
  );

  // creating the question here
  const question = await db.question.create({
    data: {
      title,
      content,
      userId,
      tags: {
        create: upsertedTags.map((tag) => ({
          tag: {
            connect: { id: tag.id },
          },
        })),
      },
    },
  });

  return { success: "Question submitted successfully.", questionId: question.id };
};
