import { TrackQuestionViewsParams } from "@/types/types";
import db from "./prisma";
import { error } from "console";

export async function trackQuestionViews({ userId, questionId }: TrackQuestionViewsParams) {
  try {
    await db.$transaction([
      db.userActivity.create({
        data: {
          userId,
          questionId,
          type: "VIEW",
          target: "QUESTION",
        },
      }),
      db.question.update({
        where: { id: questionId },
        data: {
          views: { increment: 1 },
        },
      }),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Ignore duplicate view attempts
    if (error.code === "P2002") return;
    console.error("Error tracking view:", error);
  }
}
