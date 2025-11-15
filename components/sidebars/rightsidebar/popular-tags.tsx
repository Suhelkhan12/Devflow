import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const POPULARTAGS = [
  {
    id: 1,
    tagname: "JavaScript",
    tags: 8362,
  },
  {
    id: 2,
    tagname: "Python",
    tags: 3453,
  },
  {
    id: 3,
    tagname: "C++",
    tags: 9874,
  },
  {
    id: 4,
    tagname: "Java",
    tags: 3456,
  },
  {
    id: 5,
    tagname: "TypeScript",
    tags: 8762,
  },
  {
    id: 6,
    tagname: "Go",
    tags: 6543,
  },
  {
    id: 7,
    tagname: "Rust",
    tags: 12312,
  },
];

const PopularTags = () => {
  return (
    <div className="flex flex-col justify-between gap-6">
      <h2 className="h3-semibold">Popular tags</h2>
      <div className="flex flex-col gap-4">
        {POPULARTAGS.map((tg) => (
          <div key={tg.id} className="flex items-center justify-between">
            <Badge className="rouned-md" asChild>
              <Link href="/">{tg.tagname}</Link>
            </Badge>
            <p className="text-xs">{tg.tags}+</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
