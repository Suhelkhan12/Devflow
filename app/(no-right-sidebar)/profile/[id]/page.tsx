import { auth } from "@/auth";
import ProfileQuestionsAnswers from "@/components/profile/profile-question-answers";
import ProfileStats from "@/components/profile/profile-stats";
import ProfileTop from "@/components/profile/profile-top";

const page = async () => {
  const session = await auth();
  return (
    <>
      <ProfileTop />
      <ProfileStats />
      <ProfileQuestionsAnswers />
    </>
  );
};

export default page;
