"use server";

import * as z from "zod";
import { AnswerFormServerSchema } from "@/schemas";
import db from "@/lib/prisma";
import { getUserSession } from "@/data/user";
import { revalidatePath } from "next/cache";

export const createAnswer = async (values: z.infer<typeof AnswerFormServerSchema>) => {
  const validatedFields = AnswerFormServerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields in the answer data." };
  }
  const { content, questionId } = validatedFields.data;

  const userSession = await getUserSession();
  if (!userSession) {
    return { error: "Please login to ask the question." };
  }
  const userId = userSession.user.id;
  if (!userId) {
    return { error: "Something went wrong!" };
  }

  try {
    await db.$transaction([
      db.answer.create({
        data: {
          content,
          questionId,
          authorId: userId,
        },
      }),
      db.question.update({
        where: { id: questionId },
        data: {
          totalAnswers: { increment: 1 },
        },
      }),
      // todo useractivity should be implemented here
    ]);

    // revalidating the path
    revalidatePath(`/questions/${questionId}`);
    return { success: "Answer submitted successfully." };
  } catch (error) {
    console.error("Create Answer Error:", error);
    throw new Error("Failed to create answer");
  }
};
