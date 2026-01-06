"use server";

import { getQuestionById, getQuestionTags } from "@/data/question-answer";
import { getUserSession } from "@/data/user";
import db from "@/lib/prisma";
import { EditQuestionFormSchema } from "@/schemas";
import * as z from "zod";

export const updateQuestion = async (values: z.infer<typeof EditQuestionFormSchema>) => {
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
  if (question.userId !== userSession.user.id) {
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
    // real update logic
    // using transaction becoz if anything fails the whole edit will be rolled back
    await db.$transaction(async (tx) => {
      // updating question title and questin content
      await tx.question.update({
        where: { id: questionId },
        data: {
          title,
          content,
          updatedAt: new Date(),
        },
      });

      //updating tags (remove + add)
      // removing
      if (tagsToRemove.length > 0) {
        const removedTags = await tx.tag.findMany({
          where: { name: { in: tagsToRemove } },
          select: { id: true },
        });

        // removing the relation
        await tx.questionTag.deleteMany({
          where: { questionId, tagId: { in: removedTags.map((tg) => tg.id) } },
        });

        // decreamenting totalQuestion count assosiated with a tag
        await tx.tag.updateMany({
          where: { id: { in: removedTags.map((tg) => tg.id) } },
          data: {
            totalQuestion: { decrement: 1 },
          },
        });
      }

      // adding
      if (tagsToAdd.length > 0) {
        const upsertedTags = await Promise.all(
          tagsToAdd.map((name) =>
            tx.tag.upsert({
              where: { name },
              update: {
                totalQuestion: { increment: 1 },
              },
              create: {
                name,
                totalQuestion: 1,
              },
            })
          )
        );

        await tx.questionTag.createMany({
          data: upsertedTags.map((tag) => ({
            questionId,
            tagId: tag.id,
          })),
          skipDuplicates: true,
        });
      }
    });

    return { success: "Question updated successfully." };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
