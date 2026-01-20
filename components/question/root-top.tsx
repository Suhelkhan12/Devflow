import { Button } from "../ui/button";
import Link from "next/link";
import HomeFilters from "../filters/home-filters";
import LocalSearch from "../search/LocalSearch";

const RootTop = () => {
  return (
    <section className="flex flex-col gap-7.5">
      <div className="md:flex-between">
        <h1 className="h1-bold font-space-grotesk">All question</h1>
        <Button variant={"primary"} asChild className="hidden md:inline-flex">
          <Link href={"/ask-question"}>Ask a question</Link>
        </Button>
      </div>
      <LocalSearch route="/" placeholder="Search for questions here..." />
      <HomeFilters />
    </section>
  );
};

export default RootTop;
