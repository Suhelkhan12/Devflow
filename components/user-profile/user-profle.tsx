import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/routes";
import { auth } from "@/auth";

const UserProfile = async () => {
  const session = await auth();
  // if user is not logged show nothing
  if (!session) return null;
  return (
    <Link href={`${ROUTES.PROFILE(session.user.id as string)}`} className="rounded-full max-lg:hidden">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserProfile;
