import { resend } from "@/lib/resend";

export default async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  return resend.emails.send({
    from: "onboarding@resend.dev", // testing sender
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Hello ${username}</h1>
      <p>Your verification code is:</p>
      <h2>${verifyCode}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  });
}
