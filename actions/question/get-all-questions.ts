import { Prisma } from "@/app/generated/prisma/client";
import { getAllQuestions } from "@/data/question-answer";
import db from "@/lib/prisma";
import { FilterParamsSchema } from "@/schemas";
import { FilterParams } from "@/types/types";

export const getQuestions = async (filterParams: FilterParams) => {
  const validatedFields = FilterParamsSchema.safeParse(filterParams);
  if (!validatedFields.success) {
    return { error: "Something went wrong! Please refresh the page." };
  }

  const { page = 1, pageSize = 5, query, filter } = validatedFields.data;

  // creating skip and limit for paginatin
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  // todo we will need to make recommened as well here

  // real filtering logic begins here
  const where: Prisma.QuestionWhereInput = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } },
    ];
  }

  let orderBy: Prisma.QuestionOrderByWithRelationInput;

  switch (filter) {
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "unanswered":
      where.totalAnswers = 0;
      orderBy = { createdAt: "desc" };
      break;
    case "popular":
      orderBy = { upvotes: "desc" };
      break;
    default:
      orderBy = { createdAt: "asc" };
      break;
  }

  try {
    const questions = await getAllQuestions({ where, orderBy, skip, take: limit });
    const totalQuestion = await db.question.count({ where });

    return {
      data: questions,
      pagination: {
        page,
        pageSize,
        totalQuestion,
        totalPages: Math.ceil(totalQuestion / pageSize),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize,
        totalQuestion: 0,
        totalPages: 0,
      },
    };
  }
};
