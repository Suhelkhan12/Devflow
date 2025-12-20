"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/routes";

const UserProfile = () => {
  return (
    <Link href={`${ROUTES.PROFILE("lsdlkdlskdlskd")}`} className="rounded-full max-lg:hidden">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserProfile;
