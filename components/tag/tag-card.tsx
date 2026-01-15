"use client";

import Image from "next/image";
import { TagCardProps } from "@/types/types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

const TagCard = (props: TagCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.handleRemove!(props.id);
  };

  const content = (
    <>
      <Badge
        className={cn(
          "bg-light-800 dark:bg-dark-300 text-light-500 body-medium border-primary-100 dark:border-primary-500/10 cursor-pointer rounded-sm border transition duration-300",
          "hover:bg-primary-100 dark:hover:bg-dark-400"
        )}
      >
        <span className="">{props.name.at(0)?.toUpperCase() + props.name.slice(1)}</span>
        {props.removeTag && (
          <Image
            src={"/icons/close.svg"}
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
          />
        )}
      </Badge>
      {props.showCount && <p className="small-medium text-dark500_light700"></p>}
    </>
  );

  if (props.compact) {
    return props.isButton ? (
      <button
        onClick={handleClick}
        disabled={props.isRemoveDisabled}
        className={cn(props.isRemoveDisabled && "opacity-50")}
      >
        {content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(props.id)}>{content}</Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(props.id)} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">{props.name}</p>
        </div>

        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">{props.numberOfQuestions}+</span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
