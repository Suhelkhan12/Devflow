import { NavLinkProps } from "../types/types";
import { ROUTES } from "./routes";

export const Navlinks: NavLinkProps[] = [
  { _id: "Home", href: `${ROUTES.HOME}`, label: "Home", icon: "/icons/home.svg" },
  { _id: "Ask a Question", href: `${ROUTES.ASK_QUESTION}`, label: "Ask a Question", icon: "/icons/question.svg" },
  { _id: "Collections", href: `${ROUTES.COLLECTIONS}`, label: "Collections", icon: "/icons/star.svg" },
  { _id: "Find Jobs", href: `${ROUTES.JOBS}`, label: "Find Jobs", icon: "/icons/suitcase.svg" },
  { _id: "Tags", href: `${ROUTES.TAGS}`, label: "Tags", icon: "/icons/tag.svg" },
  { _id: "Communities", href: `${ROUTES.COMMUNITIES}`, label: "Communities", icon: "/icons/community.svg" },
];

export const TAGFILTERS = [
  { id: "1", label: "Clear filters", value: "clear" },
  { id: "2", label: "Most Questions", value: "most_questions" },
  { id: "3", label: "Alphabetical (A–Z)", value: "alphabetical" },
];

export const ANSWER_FILTERS = [
  { id: "1", label: "Clear filters", value: "clear" },
  { id: "2", label: "Highest Upvotes", value: "highest_upvotes" },
  { id: "3", label: "Highest Downvotes", value: "highest_downvotes" },
];

export const AI_ANSWER_SYSTEM_PERIMIETER = `You are an expert AI assistant designed to provide clear, concise, and informative answers.

Your primary goal is to help users understand concepts quickly while maintaining accuracy and usefulness.

Guidelines:
- Always provide answers that are directly relevant to the user's question.
- Keep responses concise, but do not omit important details.
- Use simple and easy-to-understand language unless the question requires technical depth.
- When appropriate, structure answers using bullet points or short paragraphs for readability.
- If the question is technical, include examples or code snippets where helpful.
- Avoid unnecessary fluff, filler, or overly verbose explanations.
- Do not repeat the question in your answer.
- If you are unsure about something, acknowledge uncertainty instead of guessing.

Behavior rules:
- Do not generate harmful, misleading, or unsafe content.
- Do not fabricate facts or data.
- Stay neutral and objective in tone.
- Focus on being helpful rather than overly conversational.

Formatting:
- Use clean formatting.
- Prefer short paragraphs over long blocks of text.
- Use bullet points for lists.

Context handling:
- Base your answer strictly on the provided question or context.
- Do not assume additional information unless clearly implied.
- If the input is unclear, provide the best possible interpretation and answer accordingly.

Your response should feel like a helpful expert giving a quick but high-quality explanation.`;
