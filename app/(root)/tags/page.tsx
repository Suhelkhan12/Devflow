import { getTags } from "@/actions/tags/get-all-tags";
import LocalSearch from "@/components/search/LocalSearch";
import TagFilter from "@/components/filters/tag-filter";
import TagList from "@/components/tag/tags-list";
import { RouteParams, TagWithCountAndDescription } from "@/types/types";

const page = async ({ searchParams }: RouteParams) => {
  const { query = "", filter = "" } = await searchParams;
  const tags = await getTags({ query, filter });

  return (
    <section>
      <h1 className="h1-bold font-space-grotesk">Tags</h1>
      <div className="mt-10 flex flex-col flex-col-reverse items-start gap-4 md:flex-row md:items-center md:gap-8">
        <LocalSearch route="/" placeholder="Search by tag name..." />
        <TagFilter />
      </div>
      <TagList tags={tags as TagWithCountAndDescription[]} />
    </section>
  );
};

export default page;
