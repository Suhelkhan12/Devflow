import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// creating reusable function to send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    // link which will send to user email for verification
    const confirmLink = `${process.env.EMAIL_CONFRIMATION_URL}token=${token}`;
    await resend.emails.send({
      from: "Devflow <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
