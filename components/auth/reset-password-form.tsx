"use client";

import { useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordFormSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/auth/reset-password";

const ResetPasswordForm = () => {
  // getting token from the url
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordFormSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      const data = await resetPassword(token as string, values.newPassword);
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.success);
        form.reset();
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset your password"
      backBtnHref="/auth/log-in"
      backBtnLabel="Back to log in"
      socialsDisabled={isPending}
    >
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="items-start gap-2">
          <div className="flex w-full flex-col items-start gap-7">
            <Controller
              control={form.control}
              name={"newPassword"}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-reset-password-password">New password</FieldLabel>
                  <Input
                    {...field}
                    id="form-reset-password-password"
                    aria-invalid={fieldState.invalid}
                    type={"password"}
                    disabled={isPending}
                    placeholder="Enter your new password"
                    className="caret-primary-500 background-light800_dark300 py-5"
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name={"confirmPassword"}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-reset-password-confirm-password">Confirm new password</FieldLabel>
                  <Input
                    {...field}
                    id="form-reset-password-confirm-password"
                    aria-invalid={fieldState.invalid}
                    type={"password"}
                    disabled={isPending}
                    placeholder="Confirm your new password"
                    className="caret-primary-500 background-light800_dark300 py-5"
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Field>
            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              disabled={isPending}
              className="tarnsition mt-4 w-full cursor-pointer hover:opacity-80"
            >
              {isPending ? <Spinner /> : "Update password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
