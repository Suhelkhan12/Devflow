import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-7.5">
        <div className="flex-between">
          <h1 className="h1-bold">All question</h1>
          <Button variant={"primary"} asChild>
            <Link href={"/ask-a-question"}>Ask a question</Link>
          </Button>
        </div>
        <LocalSearch route="/" placeholder="Search for questions here..." />
      </div>
    </div>
  );
};

export default page;
