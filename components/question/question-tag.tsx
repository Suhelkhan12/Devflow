"use client";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "../ui/input";
import { KeyboardEventHandler, useState } from "react";
import { toast } from "sonner";
import TagCard from "../tag/tag-card";

type QuestionTagsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldd: ControllerRenderProps<any>;
  id: string;
  ariaInvalid: boolean;
};
const QuestionTags = ({ id, fieldd, ariaInvalid }: QuestionTagsProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState<string>("");

  // to enter tag
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      //getting tag value
      const newTag = inputVal.trim();

      // handling empty and already present tag case
      if (!newTag) return;
      if (tags.includes(newTag)) {
        toast.error("This tag is already present.");
        setInputVal("");
        return;
      }
      // setting tags state based on previous state
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);

      // setting form field value according to new tags
      fieldd.onChange(updatedTags);
      setInputVal("");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Input
        {...fieldd}
        id={id}
        value={inputVal}
        aria-invalid={ariaInvalid}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyPress}
        className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 background-light800_dark300 rounded tracking-wide focus-visible:ring-0"
      />
      {tags.length > 0 && (
        <div className="flex items-center gap-1.5">
          {tags.map((tg) => (
            <TagCard key={tg} _id={tg} name={tg} compact={true} isButton={true} removeTag={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionTags;
