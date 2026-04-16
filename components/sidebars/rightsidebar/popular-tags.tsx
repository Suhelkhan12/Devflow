import TagCard from "@/components/tag/tag-card";
import db from "@/lib/prisma";

const PopularTags = async () => {
  const tags = await db.tag.findMany();
  return (
    <div className="flex flex-col justify-between gap-6">
      <h2 className="h3-semibold font-space-grotesk">Popular tags</h2>
      <div className="flex flex-col gap-4">
        {tags.map((tg) => (
          <div key={tg.id} className="flex items-center justify-between">
            <TagCard key={tg.id} name={tg.name} compact id={String(tg.id)} />
            <p className="text-xs">{tg.totalQuestion}+</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
