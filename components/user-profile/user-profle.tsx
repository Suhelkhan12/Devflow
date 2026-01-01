import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/routes";
import { auth } from "@/auth";

const UserProfile = async () => {
  const session = await auth();
  // if user is not logged show nothing
  if (!session) return null;
  const user = session.user;
  const userImage = session.user.image ? session.user.image : "https://github.com/shadcn.png";
  return (
    <Link href={`${ROUTES.PROFILE(user.id as string)}`} className="rounded-full max-lg:hidden">
      <Avatar className="size-10">
        <AvatarImage src={userImage} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserProfile;
