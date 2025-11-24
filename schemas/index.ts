import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const AskQuestionFormSchema = z.object({
  questionTitle: z.string().min(30, "Title must be at least 30 characters long"),
  questionExplaination: z.string().min(100, "Explaination must be at least 100 characters long"),
  // tags: z.array(z.string()).length(1, "You must provide exactly 3 tags"),
});
