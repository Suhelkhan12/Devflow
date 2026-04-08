"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { getAllAnswers } from "@/data/question-answer";
import db from "@/lib/prisma";
import { AnswerFilterParamsSchema } from "@/schemas";
import { AnswerFilterParams } from "@/types/types";

export const getAnswers = async (filterParams: AnswerFilterParams) => {
  const validatedFields = AnswerFilterParamsSchema.safeParse(filterParams);
  if (!validatedFields.success) {
    return { error: "Something went wrong! Please refresh the page." };
  }

  const { questionId, page = 1, pageSize = 10, filter } = validatedFields.data;

  // creating skip and limit for pagination
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  // todo we will need to make recommened as well here

  // real filtering logic begins here
  let orderBy: Prisma.AnswerOrderByWithRelationInput;

  switch (filter) {
    case "highest_upvotes":
      orderBy = { upvotes: "desc" };
      break;
    case "highest_downvotes":
      orderBy = { downvotes: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  try {
    const answers = await getAllAnswers(questionId, { orderBy, skip, take: limit });
    const totalAnswers = await db.answer.count({ where: { questionId } });
    return {
      data: answers,
      pagination: {
        page,
        pageSize,
        totalAnswers,
        totalPages: Math.ceil(totalAnswers / pageSize),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
        totalAnswer: 0,
        totalPages: 0,
      },
    };
  }
};
