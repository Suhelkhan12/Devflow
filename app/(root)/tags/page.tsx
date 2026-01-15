import LocalSearch from "@/components/search/LocalSearch";
import TagFilter from "@/components/tag/tag-filter";

const page = () => {
  return (
    <section>
      <h1 className="h1-bold font-space-grotesk">Tags</h1>
      <div className="mt-10 flex items-center gap-8">
        <LocalSearch route="/" placeholder="Search by tag name..." />
        <TagFilter />
      </div>
      <div className="grid-cols-3 gap-4"></div>
    </section>
  );
};

export default page;
