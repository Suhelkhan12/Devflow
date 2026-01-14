import { Question, Tag } from "@/app/generated/prisma/client";
import db from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export const getQuestionById = async (id: string): Promise<Question | null> => {
  try {
    const question = await db.question.findUnique({
      where: { id },
    });
    return question;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch question details from the database.");
  }
};

export const getAllQuestions = async (args: Prisma.QuestionFindManyArgs = {}) => {
  try {
    const questions = await db.question.findMany({
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: { select: { tag: { select: { id: true, name: true } } } },
      },
      orderBy: { createdAt: "desc" },
      where: args.where,
      skip: args.skip,
      take: args.take,
    });
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const getQuestionTags = async (id: string): Promise<Tag[] | null> => {
  try {
    const questionTags = await db.questionTag.findMany({
      where: { questionId: id },
      select: {
        tag: {
          select: {
            id: true,
            name: true,
            totalQuestion: true,
          },
        },
      },
    });
    return questionTags.map((qt) => qt.tag);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch question tags from the database.");
  }
};
