"use server";
import { RegisterFormSchema } from "@/schemas";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  //safe parsing using zod method
  const validatedFields = RegisterFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input fields" };
  }

  // getting the validated fields
  const { name, email, password } = validatedFields.data;

  // encrypting the password here using bcrypt package
  const hashedPassword = await bcrypt.hash(password, 10);

  // checking if the user with the entered email in the register form is already existing in our db
  // fetching the user here
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "Account already exists. Please login." };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong. Please try again later." };
  }

  //creating the user in db
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generating verification token
  const verificationToken = await generateVerificationToken(email);

  // todo send verification email to the user
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "We've sent a verification email to your inbox." };
};
