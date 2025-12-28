import Empty from "@/components/empty";

const page = () => {
  const collection = 0;
  if (!collection) return <Empty />;
  return <div>page</div>;
};

export default page;
