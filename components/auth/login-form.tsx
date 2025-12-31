"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
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
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      const data = await login(values);
      if (data?.error) {
        setError(data.error);
      } else {
        setSuccess(data?.success);
        router.push(DEFAULT_LOGIN_REDIRECT);
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
        <FieldGroup className="items-start gap-2">
          <div className="flex w-full flex-col items-start gap-7">
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
          </div>

          <Button asChild variant={"link"} size={"sm"} className="w-auto justify-start px-0 font-normal">
            <Link href={"/auth/reset"}>Forgot password?</Link>
          </Button>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Field>
            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              disabled={isPending}
              className="tarnsition mt-4 w-full cursor-pointer hover:opacity-80"
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
