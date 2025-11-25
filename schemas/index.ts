import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const AskQuestionFormSchema = z.object({
  questionTitle: z.string().min(30, "Title must be at least 30 characters long"),
  questionExplaination: z.string().min(100, "Explaination must be at least 100 characters long"),
  questionTags: z.array(z.string()).min(3, "Add atleast 3 tags"),
});
