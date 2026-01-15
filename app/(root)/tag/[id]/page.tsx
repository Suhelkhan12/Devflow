import { RouteParams } from "@/types/types";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>{JSON.stringify(id)}</div>;
};

export default page;
