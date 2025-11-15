"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NavLinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

export default function NavLink({ id, href, label, icon, isMobile = false }: NavLinkProps) {
  const pathname = usePathname();

  const isProfile = href.includes("profile");
  //user id will need to be fetched here.
  const userId = 1298174927;
  if (isProfile) {
    href = href + "/" + userId;
  }
  const isActive = pathname === href;

  const linkComponent = (
    <div
      className={cn(
        "rounded-2 text-dark-light100_light-dark900 hover:bg-light-800 dark:hover:bg-dark-400 base-medium flex items-center gap-2 p-3 transition",
        isActive && "primary-gradient base-semibold text-light-900",
        isProfile && "lg:hidden"
      )}
    >
      <Image
        src={icon}
        alt={id}
        width={20}
        height={20}
        preload
        className={`${isActive ? "text-light-900" : "invert-colors"}`}
      />
      {label}
    </div>
  );

  return <Link href={href}>{isMobile ? <SheetClose asChild>{linkComponent}</SheetClose> : linkComponent}</Link>;
}
