import Image from "next/image";
import Link from "next/link";

type MobileNavlinkProps = {
  id: string;
  href: string;
  label: string;
  icon: string;
};

export const MOBILENAVLINKS: MobileNavlinkProps[] = [
  { id: "Home", href: "/about", label: "Home", icon: "/icons/home.svg" },
  { id: "Community", href: "/features", label: "Community", icon: "/icons/users.svg" },
  { id: "Collections", href: "/pricing", label: "Collections", icon: "/icons/star.svg" },
  { id: "Find Jobs", href: "/contact", label: "Find Jobs", icon: "/icons/suitcase.svg" },
  { id: "Tags", href: "/contact", label: "Tags", icon: "/icons/tag.svg" },
  { id: "Communities", href: "/contact", label: "Communities", icon: "/icons/community.svg" },
  { id: "Ask a Question", href: "/contact", label: "Ask a Question", icon: "/icons/question.svg" },
];

export default function MobileNavlink({ id, href, label, icon }: MobileNavlinkProps) {
  return (
    <Link href={href} className="rounded-2 text-dark-light100_light-dark900 flex items-center gap-4 p-3 font-medium">
      <Image src={icon} alt={id} width={20} height={20} preload className="invert-colors" />
      {label}
    </Link>
  );
}
