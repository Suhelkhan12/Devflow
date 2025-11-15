"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MobileNavlinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

export default function MobileNavlink({ id, href, label, icon }: MobileNavlinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
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
