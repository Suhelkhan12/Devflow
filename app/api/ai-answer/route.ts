import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { AiAnswerSchema } from "@/schemas";
import { treeifyError } from "zod";
import { AI_ANSWER_SYSTEM_PERIMIETER } from "@/lib/data-object";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, content } = await req.json();

  try {
    const validatedData = AiAnswerSchema.safeParse({ question, content });
    if (!validatedData.success) {
      return new Response(JSON.stringify({ error: treeifyError(validatedData.error) }), { status: 400 });
    }

    const googleAi = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await generateText({
      model: googleAi("gemini-2.0-flash"),
      prompt: `Generate a markdown formatted answer to the following question based on the provided content. The answer should be concise and informative.\n\nQuestion: ${question}\n\nContent: ${content}`,
      system: AI_ANSWER_SYSTEM_PERIMIETER,
    });

    return NextResponse.json({
      success: true,
      data: result.text,
    });
  } catch (error) {
    console.error("Error generating answer:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to generate answer" }), { status: 500 });
  }
}
