import Link from "next/link";
import { getTimeStamp } from "@/lib/utils";
import { Question } from "@/types/types";
import { ROUTES } from "@/lib/routes";
import Metric from "../Metric";
import TagCard from "../tag/tag-card";

const QuestionCard = ({ id, title, author, createdAt, upvotes, downvotes, totalAnswers, views, tags }: Question) => {
  return (
    <div className="card-wrapper dark:border-dark-400 hover:border-primary-500 dark:hover:border-primary-500 relative z-10 rounded-[10px] border p-4 transition duration-300 sm:px-5 sm:py-4 md:p-6">
      <div className="flex flex-col items-start gap-3.5">
        <Link href={ROUTES.QUESTION(id)} className="hover:text-primary-500 transition duration-300">
          <h2 className="h2-semibold">{title}</h2>
        </Link>
        <div className="rounded-1 flex w-full flex-wrap gap-2">
          {tags.map((tg) => (
            <TagCard key={tg.tag.id} name={tg.tag.name} compact={true} id={tg.tag.id} />
          ))}
        </div>
      </div>
      <div className="flex-between mt-6 flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          href={ROUTES.USER(author.id)}
          value={author.name}
          textStyles="body-medium"
          titleStyles="body-regular"
          title={`- asked ${getTimeStamp(new Date(createdAt))}`}
        />
        <div className="flex items-center gap-2.5">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like-icon"
            value={`${upvotes - downvotes}`}
            title="Votes"
            textStyles="small-medium"
          />
          <Metric
            imgUrl="/icons/like.svg"
            alt="like-icon"
            value={`${totalAnswers}`}
            title="Answers"
            textStyles="small-medium"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="message-icon"
            value={`${views}k`}
            title="Views"
            textStyles="small-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
