import { auth } from "@/auth";
import ProfileTop from "@/components/profile/profile-top";

const page = async () => {
  const session = await auth();
  return (
    <>
      <ProfileTop />
    </>
  );
};

export default page;
