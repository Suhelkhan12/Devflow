import { Question } from "@/types/types";
import Metric from "../Metric";
import { ROUTES } from "@/lib/routes";
import { getTimeStamp } from "@/lib/utils";
import TagCard from "../tag/tag-card";
import ContentPreview from "./question-content-preview";

const QuestionDetails = (props: Question) => {
  return (
    <>
      <div className="mb-2 flex w-full flex-col gap-2 md:mb-3.5 md:flex-row md:justify-between">
        <Metric
          imgUrl={props.author.image!}
          alt={props.author.name!}
          href={ROUTES.USER(props.author.id)}
          value={props.author.name!}
          textStyles="body-medium"
          titleStyles="body-regular"
        />
        <div className="flex items-center gap-2.5"> votes</div>
      </div>
      <h2 className="h2-semibold">{props.title}</h2>
      <section className="mt-3 flex items-center gap-4 md:mt-4">
        <Metric
          imgUrl="/icons/time.svg"
          alt="like-icon"
          textStyles="small-medium"
          title={getTimeStamp(props.createdAt)}
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="like-icon"
          value={`${new Intl.NumberFormat().format(props.totalAnswers)}`}
          title="Answers"
          textStyles="small-medium"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="message-icon"
          value={`${new Intl.NumberFormat().format(props.views)}`}
          title="Views"
          textStyles="small-medium"
        />
      </section>
      <ContentPreview content={props.content} />
      <section className="mt-5 flex flex-col gap-2 md:mt-7">
        <h3 className="h3-semibold">Associated tags:</h3>
        <div className="flex items-center gap-4">
          {props.tags.map((tag) => (
            <TagCard key={tag.tag.id} name={tag.tag.name} id={tag.tag.id} compact />
          ))}
        </div>
      </section>
    </>
  );
};

export default QuestionDetails;
