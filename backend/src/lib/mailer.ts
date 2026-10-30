import nodemailer, { Transporter } from "nodemailer";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

let transporter: Transporter | undefined;

const getTransporter = () => {
  if (transporter) return transporter;
  if (!env.SMPT_MAIL || !env.SMPT_PASSWORD) {
    throw new AppError("Email service is not configured", 500);
  }
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: env.SMPT_MAIL, pass: env.SMPT_PASSWORD },
  });
  return transporter;
};

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: MailOptions) => {
  await getTransporter().sendMail({ from: env.SMPT_MAIL, to, subject, html });
};
