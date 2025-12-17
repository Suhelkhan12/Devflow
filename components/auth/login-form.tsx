"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import CardWrapper from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { toast } from "sonner";
import FormError from "./form-error";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  // for auth error when user uses same email for two diff Oauth providers
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with different sign-in method."
      : "";

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    startTransition(async () => {
      const data = await login(values);
      if (data?.error) {
        setError(data.error);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome"
      backBtnHref="/auth/sign-up"
      backBtnLabel="Don't have an account?"
      socialsDisabled={isPending}
      showSocials
    >
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name={"email"}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-login-email"
                  aria-invalid={fieldState.invalid}
                  type={"email"}
                  disabled={isPending}
                  placeholder="Enter your email"
                  className="caret-primary-500 background-light800_dark300 py-5"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name={"password"}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="form-login-password"
                  aria-invalid={fieldState.invalid}
                  type={"password"}
                  disabled={isPending}
                  placeholder="*********"
                  className="caret-primary-500 background-light800_dark300 py-5"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
              </Field>
            )}
          />

          <FormError message={error || urlError} />

          <Field>
            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              disabled={isPending}
              className="tarnsition w-full cursor-pointer hover:opacity-80"
            >
              {isPending ? <Spinner /> : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
