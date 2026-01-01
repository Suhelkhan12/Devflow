"use client";

import dynamic from "next/dynamic";
import { AskQuestionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Tag } from "@/types/types";
import { KeyboardEventHandler, useRef, useState, useTransition } from "react";
import TagCard from "../tag/tag-card";
import { Skeleton } from "../ui/skeleton";
import { createQuestion } from "@/actions/create-question";
import { Spinner } from "../ui/spinner";

const EditorComp = dynamic(() => import("./editor"), { ssr: false, loading: () => <EditorSkeleton /> });

const QuestionForm = () => {
  const ref = useRef(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsInputVal, setTagsInputVal] = useState<string>("");
  const [isPending, setTransition] = useTransition();
  // this key will be used to reset our editor value on submit
  const [editorKey, setEditorKey] = useState<string>(crypto.randomUUID());

  const form = useForm<z.infer<typeof AskQuestionFormSchema>>({
    resolver: zodResolver(AskQuestionFormSchema),
    defaultValues: {
      questionExplaination: "",
      questionTitle: "",
      questionTags: [],
    },
  });

  function syncTags(newTags: Tag[]) {
    setTags(newTags);
    form.setValue("questionTags", newTags);
  }

  function onSubmit(values: z.infer<typeof AskQuestionFormSchema>) {
    setTransition(async () => {
      const data = await createQuestion(values);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        form.reset();
        setTags([]);
        setTagsInputVal("");
        setEditorKey(crypto.randomUUID());
      }
    });
  }

  // to enter multile tags related to the question
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // geting input value form state
      const value = tagsInputVal.trim();
      if (!value) return;

      //formating the value
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

      //checking for duplicate tag
      const isDuplicate = tags.some((tg) => tg.name.toLocaleLowerCase() === formattedValue.toLocaleLowerCase());
      if (isDuplicate) {
        toast.error("Tags already present in the list.");
        setTagsInputVal("");
        return;
      }

      //creating new tag and changing field value
      const newTag = { _id: crypto.randomUUID(), name: formattedValue };
      const updatedTags = [...tags, newTag];
      syncTags(updatedTags);
      setTagsInputVal("");
    }
  };

  // to remove a specific tag
  const handleRemove = (_id: string) => {
    const updatedTags = tags.filter((tg) => tg._id !== _id);
    syncTags(updatedTags);
  };

  return (
    <form id="form-ask-question" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="flex flex-col gap-9">
        <Controller
          control={form.control}
          name="questionTitle"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="question-title" className="body-regular font-medium">
                Question Title<span className="text-red-500">*</span>
              </FieldLabel>
              <div className="space-y-2">
                <Input
                  {...field}
                  id={"form-ask-question-title"}
                  aria-invalid={fieldState.invalid}
                  className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 background-light800_dark300 rounded tracking-wide focus-visible:ring-0"
                />
                {fieldState.error && <FieldError className="text-xs text-red-500" errors={[fieldState.error]} />}
                <FieldDescription className="text-light-500 body-regular mt-0.5">
                  Be specific and imagine you’re asking a question to another person.
                </FieldDescription>
              </div>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="questionExplaination"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="question-title" className="body-regular font-medium">
                Detailed explanation of your problem?<span className="text-red-500">*</span>
              </FieldLabel>
              <div className="space-y-2">
                <EditorComp resetKey={editorKey} editorRef={ref} field={field} />
                <Input
                  {...field}
                  value={"markdownVal"}
                  id={"form-ask-question-explaination"}
                  aria-invalid={fieldState.invalid}
                  hidden
                />
                {fieldState.error && <FieldError className="text-xs text-red-500" errors={[fieldState.error]} />}
                <FieldDescription className="text-light-500 body-regular mt-0.5">
                  Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                </FieldDescription>
              </div>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="questionTags"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="question-title" className="body-regular font-medium">
                Tags<span className="text-red-500">*</span>
              </FieldLabel>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Input
                    {...field}
                    id={"form-ask-question-tags"}
                    value={tagsInputVal}
                    onChange={(e) => setTagsInputVal(e.target.value)}
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
                {fieldState.error && <FieldError className="text-xs text-red-500" errors={[fieldState.error]} />}
                <FieldDescription className="text-light-500 body-regular mt-0.5">
                  Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                </FieldDescription>
              </div>
            </Field>
          )}
        />
      </FieldGroup>
      <Field className="mt-10 flex justify-end" orientation={"horizontal"}>
        <Button
          type="submit"
          variant={"primary"}
          form="form-ask-question"
          disabled={isPending}
          className="w-full max-w-80"
        >
          {isPending ? <Spinner /> : "Ask Question"}
        </Button>
      </Field>
    </form>
  );
};

function EditorSkeleton() {
  return (
    <Skeleton className="flex h-full min-h-96 flex-col gap-2">
      <div className="background-light800_dark300 min-h-10 rounded-sm"></div>
      <div className="background-light800_dark300 min-h-80 rounded-sm"></div>
    </Skeleton>
  );
}

export default QuestionForm;
