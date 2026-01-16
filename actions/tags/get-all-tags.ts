"use server";

import { Prisma } from "@/app/generated/prisma/client";
import db from "@/lib/prisma";
import { TagFilterParamsSchema } from "@/schemas";
import { TagFilterParams } from "@/types/types";

export const getTags = async (filterParams: TagFilterParams) => {
  const validatedFields = TagFilterParamsSchema.safeParse(filterParams);
  if (!validatedFields.success) {
    return { error: "Something went wrong! Please refresh the page." };
  }

  const { query, filter } = validatedFields.data;

  // real filtering logic begins here
  const where: Prisma.TagWhereInput = {};
  if (query) {
    where.name = { contains: query, mode: "insensitive" };
  }

  let orderBy: Prisma.TagOrderByWithRelationInput = {};
  switch (filter) {
    case "most_questions":
      orderBy = { totalQuestion: "desc" };
      break;
    case "alphabetical":
      orderBy = { name: "asc" };
      break;
  }

  try {
    const tags = await db.tag.findMany({
      where,
      orderBy,
    });
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { error: "Failed to fetch tags." };
  }
};
