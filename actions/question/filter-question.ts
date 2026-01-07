"use server";

import { Prisma } from "@/app/generated/prisma/client";
import db from "@/lib/prisma";
import { QuestionFilterParamsSchema } from "@/schemas";
import { QuestionFilterParams } from "@/types/types";

export const filterQuestion = async (filterParams: QuestionFilterParams) => {
  const validatedFields = QuestionFilterParamsSchema.safeParse(filterParams);
  if (!validatedFields.success) {
    return { error: "Something went wrong! Please refresh the page." };
  }

  const { page = 1, pageSize = 10, query, filter, sort } = validatedFields.data;

  // calculating the page number while pagination
  const pageSkip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  //http://localhost:3000/?filter=react&query=title

  const where: Prisma.QuestionWhereInput = {};

  // if we have query coming to the action
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } },
    ];
  }

  // todo add the filters logic here

  // if we have sort coming to the action
  let orderBy: Prisma.QuestionMinOrderByAggregateInput;
  switch (filter) {
    case "newest": {
      orderBy = { createdAt: "desc" };
      break;
    }
    case "unanswered": {
      where.totalAnswers = 0;
      orderBy = { createdAt: "desc" };
      break;
    }
    case "popular": {
      orderBy = { upvotes: "desc" };
    }
    default: {
      orderBy = { createdAt: "desc" };
    }
  }

  try {
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong while filering! Please refresh the page." };
  }
};
