import Link from "next/link";
import { getTimeStamp } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Question } from "@/lib/types";
import { Badge } from "../ui/badge";

const QuestionCard = ({ _id, title, tags, author, createdAt, upvotes, answers, views }: Question) => {
  return (
    <Link href={""}>
      <Card className="card-wrapper rounded-[10px] p-4 sm:px-7 sm:py-5 md:px-11 md:py-9 dark:border-0">
        <div className="flex flex-col gap-3.5">
          <h3 className="h3-semibold">{title}</h3>
          <div className="w-ful flex flex-wrap">
            {tags.map((tg) => (
              <Badge key={tg._id}>{tg.name}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default QuestionCard;
