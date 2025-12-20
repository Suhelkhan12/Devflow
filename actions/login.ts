"use server";

import { signIn } from "@/auth";
import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { AuthError } from "next-auth";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  try {
    //safe parsing using zod method
    const validatedFields = LoginFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid input fields." };
    }
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    // existingUser.password will be empty for those which signed up using OAuth providers
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "User does not exist." };
    }
    // if user exists but the email is not verified then generating verification token again
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email);
      // send verification email when user tries to login without verifying email
      await sendVerificationEmail(existingUser.name as string, verificationToken.email, verificationToken.token);

      return { success: "Please verify your email before logging in." };
    }

    await signIn("credentials", { email, password, redirect: false });
  } catch (err) {
    console.log(err);
    if (err instanceof AuthError) {
      return { error: "Something went wrong!" };
    }
  }
};
