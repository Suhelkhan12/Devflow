import { Tag } from "@/types/types";
import TagCard from "./tag-card";

interface TagWithCount extends Tag {
  totalQuestion: number;
}

interface TagList {
  tags: TagWithCount[];
}
const TagList = ({ tags }: TagList) => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tags.map((tg) => (
        <TagCard key={tg.id} id={tg.id} name={tg.name} numberOfQuestions={tg.totalQuestion} />
      ))}
    </div>
  );
};

export default TagList;
