"use client";

import { useEffect, useState, useTransition } from "react";

import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { LoginActionTypes, RegisterFormSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { register } from "@/actions/register";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const RegisterForm = () => {
  const [serverMessage, setServerMessage] = useState<LoginActionTypes | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!serverMessage) return;

    if (serverMessage.responsetype === "error") {
      toast.error(serverMessage.message);
    } else {
      toast.success(serverMessage.message);
    }
  }, [serverMessage]);

  const onSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
    setServerMessage(undefined);

    startTransition(async () => {
      register(values).then((data) => setServerMessage(data));
    });
  };

  return (
    <CardWrapper
      headerLabel="Join DevFlow"
      headerDescription="let's start your journey"
      backBtnHref="/auth/log-in"
      backBtnLabel="Already have an account?"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      type="text"
                      disabled={isPending}
                      className="caret-primary-500 focus-visible:ring-primary-500 background-light800_dark300 light-border-2 py-5 focus-visible:ring-1"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                      disabled={isPending}
                      className="caret-primary-500 focus-visible:ring-primary-500 background-light800_dark300 light-border-2 py-5 focus-visible:ring-1"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*********"
                      type="password"
                      disabled={isPending}
                      className="caret-primary-500 focus-visible:ring-primary-500 background-light800_dark300 light-border-2 py-5 focus-visible:ring-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              disabled={isPending}
              className="w-full cursor-pointer transition-normal hover:opacity-80"
            >
              {isPending ? <Spinner /> : "Create account"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
