import Empty from "@/components/empty";
import { getUserSession } from "@/data/user";

const page = async () => {
  const session = await getUserSession();
  if (!session) {
    return (
      <Empty
        heading="You’re almost there! 🔐"
        description="Log in to save questions, access your bookmarks, and join the discussion. Don’t miss out on insights tailored just for you."
        buttonLabel="Log in"
        href="/auth/log-in"
      />
    );
  }
  const collection = 0;
  if (!collection)
    return (
      <Empty
        heading="There’s no question to show"
        description=" Ask a question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
        buttonLabel="Go home"
        href="/"
      />
    );
  return <div>page</div>;
};

export default page;
