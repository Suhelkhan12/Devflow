import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string().min(1, "Password is required"),
});

export const RegisterFormSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(3, "Name should be atleast 3 characters long"),
  email: z.email({
    error: "Email is required",
  }),
  password: z.string().min(1, "Password is required"),
});

export const AskQuestionFormSchema = z.object({
  questionTitle: z.string().min(30, "Title must be at least 30 characters long"),
  questionExplaination: z.string(),
  questionTags: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .min(3, "Add atleast 3 tags"),
});

export const EditQuestionFormSchema = AskQuestionFormSchema.extend({
  questionId: z.string().min(1, { error: "Question is not valid" }),
});

export const ResetFormSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
});

export const NewPasswordFormSchema = z
  .object({
    newPassword: z
      .string({
        error: "This field is required.",
      })
      .min(6, {
        error: "Minimum of 6 characters required.",
      }),
    confirmPassword: z.string({
      error: "This field is required.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const NewPasswordServerSchema = z.object({
  newPassword: z
    .string({
      error: "This field is required.",
    })
    .min(6, {
      error: "Minimum of 6 characters required.",
    }),
});
