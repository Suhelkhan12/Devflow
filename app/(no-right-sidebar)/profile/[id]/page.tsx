import { auth } from "@/auth";
import ProfileStats from "@/components/profile/profile-stats";
import ProfileTop from "@/components/profile/profile-top";

const page = async () => {
  const session = await auth();
  return (
    <>
      <ProfileTop />
      <ProfileStats />
    </>
  );
};

export default page;
