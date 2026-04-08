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
