import { getTags } from "@/actions/tags/get-all-tags";
import LocalSearch from "@/components/search/LocalSearch";
import FilterDropdown from "@/components/filters/filter-dropdown";
import TagList from "@/components/tag/tags-list";
import { RouteParams, TagWithCountAndDescription } from "@/types/types";
import { TAGFILTERS } from "@/lib/data-object";

const page = async ({ searchParams }: RouteParams) => {
  const { query = "", filter = "" } = await searchParams;
  const tags = await getTags({ query, filter });

  return (
    <section>
      <h1 className="h1-bold font-space-grotesk">Tags</h1>
      <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
        <LocalSearch route="/" placeholder="Search by tag name..." />
        <FilterDropdown filters={TAGFILTERS} />
      </div>
      <TagList tags={tags as TagWithCountAndDescription[]} />
    </section>
  );
};

export default page;
