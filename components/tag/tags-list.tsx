import { TagWithCountAndDescription } from "@/types/types";
import TagCard from "./tag-card";
import Empty from "../empty";

interface TagList {
  tags: TagWithCountAndDescription[];
}

const TagList = ({ tags }: TagList) => {
  if (tags.length === 0) {
    return (
      <Empty
        heading="No tags available"
        description="Tags will appear here once they are created. Start by adding your first tag."
      />
    );
  }
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tags.map((tg) => (
        <TagCard
          key={tg.id}
          id={tg.id}
          name={tg.name}
          numberOfQuestions={tg.totalQuestion}
          description={tg.description}
        />
      ))}
    </div>
  );
};

export default TagList;
