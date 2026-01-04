"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NavLinkProps } from "@/types/types";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";
import { ROUTES } from "@/lib/routes";

export default function NavLink({ _id, href, label, icon, isMobile = false }: NavLinkProps) {
  const pathname = usePathname();

  //user id will need to be fetched here.
  const userId = 1298174927;

  const isProfile = _id === "Profile";

  // for dynamic contents
  let finalHref = href;
  if (finalHref === "PROFILE") {
    finalHref = ROUTES.PROFILE(userId.toFixed());
  }
  const isActive = pathname === href;

  const linkComponent = (
    <div
      className={cn(
        "rounded-2 text-dark-light100_light-dark900 hover:bg-light-800 dark:hover:bg-dark-400 flex items-center gap-2 p-2 font-semibold transition sm:px-4 sm:py-3",
        isActive && "primary-gradient text-light-900",
        isProfile && "lg:hidden"
      )}
    >
      <Image
        src={icon}
        alt={_id}
        width={20}
        height={20}
        preload
        className={`${isActive ? "text-light-900" : "invert-colors"}`}
      />
      {label}
    </div>
  );

  return <Link href={finalHref}>{isMobile ? <SheetClose asChild>{linkComponent}</SheetClose> : linkComponent}</Link>;
}
