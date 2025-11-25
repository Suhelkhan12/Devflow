import Link from "next/link";
import { getTimeStamp } from "@/lib/utils";
import { Question } from "@/lib/types";
import { ROUTES } from "@/lib/routes";
import Metric from "../Metric";
import TagCard from "../tag/tag-card";

const QuestionCard = ({ _id, title, tags, author, createdAt, upvotes, answers, views }: Question) => {
  return (
    <div className="card-wrapper hover:shadow-primary-100 dark:hover:shadow-primary-500/20 rounded-[10px] border p-4 transition sm:px-5 sm:py-4 md:p-6 dark:border-0">
      <div className="flex flex-col gap-3.5">
        <Link href={ROUTES.QUESTION(_id)}>
          <h3 className="h3-semibold">{title}</h3>
        </Link>
        <div className="w-ful rounded-1 flex flex-wrap gap-2">
          {tags.map((tg) => (
            <TagCard key={tg._id} {...tg} compact={true} />
          ))}
        </div>
      </div>
      <div className="flex-between mt-6 flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          href={ROUTES.USER(author._id)}
          value={author.name}
          textStyles="body-medium"
          titleStyles="body-regular"
          title={`- asked ${getTimeStamp(new Date(createdAt))}`}
        />
        <div className="flex items-center gap-2.5">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like-icon"
            value={`${upvotes}k`}
            title="Votes"
            textStyles="small-medium"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="message-icon"
            value={`${answers}k`}
            title="Votes"
            textStyles="small-medium"
          />
          <Metric imgUrl="/icons/eye.svg" alt="eye-icon" value={`${views}k`} title="Votes" textStyles="small-medium" />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
