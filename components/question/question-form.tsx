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
import { createQuestion } from "@/actions/question/create-question";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { updateQuestion } from "@/actions/question/edit-question";

const EditorComp = dynamic(() => import("./editor"), { ssr: false, loading: () => <EditorSkeleton /> });

interface QuestionSeedData {
  id?: string;
  seedTitle?: string;
  seedContent?: string;
  seedTags?: Tag[];
}

interface QuestionFormProps {
  mode: "create" | "edit";
  seedData?: QuestionSeedData;
}

const QuestionForm = ({ mode, seedData }: QuestionFormProps) => {
  const router = useRouter();
  const ref = useRef(null);
  const [tags, setTags] = useState<Tag[]>(seedData?.seedTags ?? []);
  const [tagsInputVal, setTagsInputVal] = useState<string>("");
  const [isPending, setTransition] = useTransition();
  // this key will be used to reset our editor value on submit
  const [editorKey, setEditorKey] = useState<string>(crypto.randomUUID());

  const form = useForm<z.infer<typeof AskQuestionFormSchema>>({
    resolver: zodResolver(AskQuestionFormSchema),
    defaultValues: {
      questionTitle: seedData?.seedTitle ?? "",
      questionExplaination: seedData?.seedContent ?? "",
      questionTags: seedData?.seedTags ?? [],
    },
  });

  function syncTags(newTags: Tag[]) {
    setTags(newTags);
    form.setValue("questionTags", newTags);
  }

  function onSubmit(values: z.infer<typeof AskQuestionFormSchema>) {
    setTransition(async () => {
      const res =
        mode === "create"
          ? await createQuestion(values)
          : await updateQuestion({ questionId: seedData!.id!, ...values });

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success(mode === "create" ? "Question posted successfully." : "Question updated successfully.");

      if (mode === "create") {
        form.reset();
        setTags([]);
        setTagsInputVal("");
        setEditorKey(crypto.randomUUID());
      }
      router.push(ROUTES.QUESTION(res.questionId!));
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
      const newTag = { id: crypto.randomUUID(), name: formattedValue };
      const updatedTags = [...tags, newTag];
      syncTags(updatedTags);
      setTagsInputVal("");
    }
  };

  // to remove a specific tag
  const handleRemove = (id: string) => {
    const updatedTags = tags.filter((tg) => tg.id !== id);
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
                  disabled={isPending}
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
              <FieldLabel htmlFor="question-explaination" className="body-regular font-medium">
                Detailed explanation of your problem?<span className="text-red-500">*</span>
              </FieldLabel>
              <div className="space-y-2">
                <EditorComp readonly={isPending} resetKey={editorKey} editorRef={ref} field={field} />
                {/* <Input
                  {...field}
                  value={"markdownVal"}
                  id={"form-ask-question-explaination"}
                  aria-invalid={fieldState.invalid}
                  hidden
                /> */}
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
                    disabled={isPending}
                  />
                  {tags.length > 0 && (
                    <div className="flex items-center gap-x-1.5">
                      {tags.map((tg) => (
                        <TagCard
                          key={tg.id}
                          {...tg}
                          isButton
                          compact
                          removeTag
                          handleRemove={handleRemove}
                          isRemoveDisabled={isPending}
                        />
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
          className="w-full sm:max-w-80"
        >
          {isPending ? <Spinner /> : mode === "create" ? "Ask Question" : "Save Changes"}
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
