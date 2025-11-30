"use client";

import { useTransition } from "react";

import CardWrapper from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterFormSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { register } from "@/actions/register";
import { Spinner } from "../ui/spinner";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { toast } from "sonner";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
    startTransition(async () => {
      const data = await register(values);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Join DevFlow"
      backBtnHref="/auth/log-in"
      backBtnLabel="Already have an account?"
      socialsDisabled={isPending}
      showSocials
    >
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name={"name"}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-login-email"
                  aria-invalid={fieldState.invalid}
                  type={"text"}
                  disabled={isPending}
                  placeholder="Enter your name"
                  className="caret-primary-500 background-light800_dark300 py-5"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
              </Field>
            )}
          />

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

          <Field>
            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              disabled={isPending}
              className="tarnsition w-full cursor-pointer hover:opacity-80"
            >
              {isPending ? <Spinner /> : "Sign Up"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default RegisterForm;
