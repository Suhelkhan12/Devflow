"use client";

import { useRef } from "react";
import { AskQuestionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import QuestionTags from "./question-tag";
import { toast } from "sonner";

const QuestionForm = () => {
  const form = useForm<z.infer<typeof AskQuestionFormSchema>>({
    resolver: zodResolver(AskQuestionFormSchema),
    defaultValues: {
      questionExplaination: "",
      questionTitle: "",
      questionTags: [],
    },
  });

  function onSubmit(data: z.infer<typeof AskQuestionFormSchema>) {
    console.log(data);
    toast.success("Question submitted successfully.");
    form.reset();
  }

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
                <Input
                  {...field}
                  id={"form-ask-question-title"}
                  aria-invalid={fieldState.invalid}
                  className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 background-light800_dark300 rounded tracking-wide focus-visible:ring-0"
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
                <QuestionTags id="form-ask-question-tags" ariaInvalid={fieldState.invalid} fieldd={field} />
                {fieldState.error && <FieldError className="text-xs text-red-500" errors={[fieldState.error]} />}
                <FieldDescription className="text-light-500 body-regular mt-0.5">
                  Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                </FieldDescription>
              </div>
            </Field>
          )}
        />
      </FieldGroup>
      <Field className="mt-20 flex justify-end" orientation={"horizontal"}>
        <Button type="submit" variant={"primary"} form="form-ask-question">
          Ask Question
        </Button>
      </Field>
    </form>
  );
};

export default QuestionForm;
