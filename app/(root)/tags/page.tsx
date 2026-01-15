import LocalSearch from "@/components/search/LocalSearch";
import TagFilter from "@/components/tag/tag-filter";
import TagList from "@/components/tag/tags-list";
import { getAllTags } from "@/data/question-answer";
import { TagWithCount } from "@/types/types";

const page = async () => {
  const tags = await getAllTags();
  return (
    <section>
      <h1 className="h1-bold font-space-grotesk">Tags</h1>
      <div className="mt-10 flex items-center gap-8">
        <LocalSearch route="/" placeholder="Search by tag name..." />
        <TagFilter />
      </div>
      <TagList tags={tags as TagWithCount[]} />
    </section>
  );
};

export default page;
