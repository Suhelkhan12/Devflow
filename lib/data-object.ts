import { NavLinkProps } from "./types";

export const Navlinks: NavLinkProps[] = [
  { id: "Home", href: "/", label: "Home", icon: "/icons/home.svg" },
  { id: "Collections", href: "/collections", label: "Collections", icon: "/icons/star.svg" },
  { id: "Find Jobs", href: "/jobs", label: "Find Jobs", icon: "/icons/suitcase.svg" },
  { id: "Tags", href: "/tags", label: "Tags", icon: "/icons/tag.svg" },
  { id: "Communities", href: "/community", label: "Communities", icon: "/icons/community.svg" },
  { id: "Ask a Question", href: "/ask-a-question", label: "Ask a Question", icon: "/icons/question.svg" },
  { id: "Profile", href: "/profile", label: "Profile", icon: "/icons/user.svg" },
];

export const NavlinksDesktop: NavLinkProps[] = [
  { id: "Home", href: "/", label: "Home", icon: "/icons/home.svg", isMobile: true },
  { id: "Collections", href: "/collections", label: "Collections", icon: "/icons/star.svg", isMobile: true },
  { id: "Find Jobs", href: "/jobs", label: "Find Jobs", icon: "/icons/suitcase.svg", isMobile: true },
  { id: "Tags", href: "/tags", label: "Tags", icon: "/icons/tag.svg", isMobile: true },
  { id: "Communities", href: "/community", label: "Communities", icon: "/icons/community.svg", isMobile: true },
  {
    id: "Ask a Question",
    href: "/ask-a-question",
    label: "Ask a Question",
    icon: "/icons/question.svg",
    isMobile: true,
  },
  { id: "Profile", href: "/profile", label: "Profile", icon: "/icons/user.svg", isMobile: true },
];
