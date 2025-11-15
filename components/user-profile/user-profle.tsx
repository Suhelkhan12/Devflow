"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
  const userId = 1000 + 11 + 1111 + 111;
  return (
    <Link href={`/profile/${userId}`} className="rounded-full max-lg:hidden">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserProfile;
