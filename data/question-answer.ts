import db from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export const getQuestionById = async (id: string) => {
  try {
    const question = await db.question.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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

export const getQuestionTags = async (id: string) => {
  try {
    const questionTags = await db.questionTag.findMany({
      where: { questionId: id },
      select: {
        tag: {
          select: {
            id: true,
            name: true,
            description: true,
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

export const getTagById = async (id: string) => {
  try {
    const tag = await db.tag.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            question: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                tags: {
                  include: { tag: true },
                },
              },
            },
          },
          orderBy: { question: { createdAt: "desc" } },
        },
      },
    });
    return tag;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch tag details from the database.");
  }
};

export const getAllAnswers = async (id: string, args: Prisma.AnswerFindManyArgs = {}) => {
  try {
    const answers = await db.answer.findMany({
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
      where: { questionId: id },
      orderBy: { createdAt: "desc" },
      skip: args.skip,
      take: args.take,
    });
    return answers;
  } catch (err) {
    console.log(err);
    return [];
  }
};
