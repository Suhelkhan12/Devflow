import { NavLinkProps } from "../types/types";
import { ROUTES } from "./routes";
export const Navlinks: NavLinkProps[] = [
  { _id: "Home", href: `${ROUTES.HOME}`, label: "Home", icon: "/icons/home.svg" },
  { _id: "Collections", href: `${ROUTES.COLLECTIONS}`, label: "Collections", icon: "/icons/star.svg" },
  { _id: "Find Jobs", href: `${ROUTES.JOBS}`, label: "Find Jobs", icon: "/icons/suitcase.svg" },
  { _id: "Tags", href: `${ROUTES.TAGS}`, label: "Tags", icon: "/icons/tag.svg" },
  { _id: "Communities", href: `${ROUTES.COMMUNITIES}`, label: "Communities", icon: "/icons/community.svg" },
  { _id: "Ask a Question", href: `${ROUTES.ASK_QUESTION}`, label: "Ask a Question", icon: "/icons/question.svg" },
  { _id: "Profile", href: "PROFILE", label: "Profile", icon: "/icons/user.svg" },
];

export const NavlinksDesktop: NavLinkProps[] = [
  { _id: "Home", href: `${ROUTES.HOME}`, label: "Home", icon: "/icons/home.svg", isMobile: true },
  { _id: "Collections", href: `${ROUTES.COLLECTIONS}`, label: "Collections", icon: "/icons/star.svg", isMobile: true },
  { _id: "Find Jobs", href: `${ROUTES.JOBS}`, label: "Find Jobs", icon: "/icons/suitcase.svg", isMobile: true },
  { _id: "Tags", href: `${ROUTES.TAGS}`, label: "Tags", icon: "/icons/tag.svg", isMobile: true },
  {
    _id: "Communities",
    href: `${ROUTES.COMMUNITIES}`,
    label: "Communities",
    icon: "/icons/community.svg",
    isMobile: true,
  },
  {
    _id: "Ask a Question",
    href: `${ROUTES.ASK_QUESTION}`,
    label: "Ask a Question",
    icon: "/icons/question.svg",
    isMobile: true,
  },
  { _id: "Profile", href: "PROFILE", label: "Profile", icon: "/icons/user.svg", isMobile: true },
];
