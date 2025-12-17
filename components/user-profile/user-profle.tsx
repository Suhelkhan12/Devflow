"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/routes";

const UserProfile = () => {
  // fetch user id her
  const userId = 1000 + 11 + 1111 + 111;
  return (
    <Link href={`${ROUTES.PROFILE(userId.toString())}`} className="rounded-full max-lg:hidden">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserProfile;
