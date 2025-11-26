"use client";

import { ControllerRenderProps } from "react-hook-form";
import { Input } from "../ui/input";
import { KeyboardEventHandler, useState } from "react";
import { toast } from "sonner";
import TagCard from "../tag/tag-card";
import { Tag } from "@/lib/types";

type QuestionTagsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldd: ControllerRenderProps<any>;
  id: string;
  ariaInvalid: boolean;
};
const QuestionTags = ({ id, fieldd, ariaInvalid }: QuestionTagsProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputVal, setInputVal] = useState<string>("");

  // to enter multile tags related to the question
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      //creating new tag
      const tagId = crypto.randomUUID();
      const newTagVal = inputVal.trim().charAt(0).toUpperCase() + inputVal.slice(1);
      const newTag: Tag = { _id: tagId, name: newTagVal };

      // handling empty and already present tag case
      if (!newTag.name || !newTag._id) return;
      if (tags.some((tg) => tg._id === tagId)) {
        toast.error("Tag already present in the list.");
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

  // to remove a specific tag
  const handleRemove = (_id: string) => {
    const filteredTags = tags.filter((tg) => tg._id !== _id);
    fieldd.onChange(filteredTags);
    setTags(filteredTags);
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
        <div className="flex items-center gap-x-1.5">
          {tags.map((tg) => (
            <TagCard key={tg._id} {...tg} isButton compact removeTag handleRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionTags;
