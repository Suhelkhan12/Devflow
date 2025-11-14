"use client";

import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Welcome"
      headerDescription="log in to DevOverflow"
      backBtnHref="/auth/sign-in"
      backBtnLabel="Don't have an account?"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                      className="caret-primary-500 focus-visible:ring-primary-500 background-light800_dark300 light-border-2 py-5 focus-visible:ring-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" size={"lg"} variant={"primary"} className="w-full cursor-pointer">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
