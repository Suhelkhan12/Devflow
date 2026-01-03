"use server";

import * as z from "zod";
import { AskQuestionFormSchema } from "@/schemas";
import db from "@/lib/prisma";
import { getUserSession } from "@/data/user";

export const createQuestion = async (values: z.infer<typeof AskQuestionFormSchema>) => {
  // validating the fields
  const validatedFields = AskQuestionFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields in the question data." };
  }
  // get the fields
  const { questionTitle: title, questionExplaination: content, questionTags: tags } = validatedFields.data;
  // checking the sesssion if user is logged in or not
  const userSession = await getUserSession();
  if (!userSession) {
    return { error: "Please login to ask the question." };
  }
  const userId = userSession.user.id;
  if (!userId) {
    return { error: "Something went wrong!" };
  }

  try {
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
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
