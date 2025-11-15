"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NavLinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

export default function NavLink({ id, href, label, icon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const isProfile = href.includes("profile");
  //user id will need to be fetched here.
  const userId = 1298174927;
  const profileLink = href + "/" + userId;
  console.log(pathname);

  return (
    <Link href={isProfile ? profileLink : href}>
      <SheetClose asChild>
        <div
          className={cn(
            "rounded-2 text-dark-light100_light-dark900 hover:bg-light-800 dark:hover:bg-dark-400 base-medium flex items-center gap-2 p-3 transition",
            isActive && "primary-gradient base-semibold"
          )}
        >
          <Image src={icon} alt={id} width={20} height={20} preload className="invert-colors" />
          {label}
        </div>
      </SheetClose>
    </Link>
  );
}
