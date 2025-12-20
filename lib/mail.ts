import { VerificationEmail } from "@/components/auth/verificationemail";
import { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// creating reusable function to send verification email
export const sendVerificationEmail = async (username: string, email: string, token: string) => {
  try {
    // link which will send to user email for verification
    const confirmLink = `${process.env.EMAIL_CONFRIMATION_URL}token=${token}`;
    await resend.emails.send({
      from: "Devflow <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ userName: username, verifyUrl: confirmLink }) as ReactNode,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
