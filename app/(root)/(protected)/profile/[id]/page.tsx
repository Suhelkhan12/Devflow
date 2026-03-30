import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  return <section></section>;
};

export default page;
