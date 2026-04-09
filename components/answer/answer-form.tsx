"use client";

import { AnswerFormServerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { SetStateAction, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { createAnswer } from "@/actions/answer/create-answer";
import { toast } from "sonner";

const EditorComp = dynamic(() => import("@/components/question/editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

const AnswerForm = ({
  questionId,
  hasSubmited,
}: {
  questionId: string;
  hasSubmited: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef(null);
  const [editorKey, setEditorKey] = useState<string>(crypto.randomUUID());
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AnswerFormServerSchema>>({
    resolver: zodResolver(AnswerFormServerSchema),
    defaultValues: {
      content: "",
      questionId,
    },
  });

  function onSubmit(values: z.infer<typeof AnswerFormServerSchema>) {
    startTransition(async () => {
      const res = await createAnswer(values);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      // set submitted to true to trigger re-fetching of answers in the parent component
      hasSubmited(true);
      toast.success(res.success);

      form.reset();
      setEditorKey(crypto.randomUUID());
    });
  }
  return (
    <section className="mt-10">
      <form id="form-answer" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="question-explaination" className="body-regular font-medium">
                    Detailed explanation of your problem?<span className="text-red-500">*</span>
                  </FieldLabel>
                  {/* todo this will used to generate AI response */}
                  <Button variant={"primary"} disabled={isPending}>
                    <div className="flex items-center gap-2">
                      Generate using AI{" "}
                      <Image src={"/icons/ai.svg"} width={16} height={16} alt="ai log" className="w-4" />
                    </div>
                  </Button>
                </div>
                <div className="space-y-2">
                  <EditorComp readonly={isPending} resetKey={editorKey} editorRef={ref} field={field} />
                  {/* <Input {...field} value={"ks"} id={"form-answer-content"} aria-invalid={fieldState.invalid} hidden /> */}
                  {fieldState.error && <FieldError className="text-xs text-red-500" errors={[fieldState.error]} />}
                  <FieldDescription className="text-light-500 body-regular mt-0.5">
                    Explain the answer in detail and provide any relevant information that can help others understand
                    your solution.
                  </FieldDescription>
                </div>
              </Field>
            )}
          />
        </FieldGroup>
        <Field className="mt-5 flex justify-end" orientation={"horizontal"}>
          <Button
            type="submit"
            variant={"primary"}
            form="form-answer"
            disabled={isPending}
            className="w-full sm:max-w-80"
          >
            {isPending ? <Spinner /> : "Post Your Answer"}
          </Button>
        </Field>
      </form>
    </section>
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

export default AnswerForm;
