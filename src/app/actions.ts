'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().min(6),
  message: z.string().max(2000).optional(),
  company: z.string().max(0), // honeypot, must stay empty
});

export type BookCallState = { ok: true } | { ok: false; error: string } | null;

export async function bookCall(_: BookCallState, formData: FormData): Promise<BookCallState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: 'Please check your details.' };

  const { name, email, phone, message } = parsed.data;
  try {
    // Created per call: the constructor throws if RESEND_API_KEY is missing.
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Resend reports API failures in `error` rather than throwing.
    const { error } = await resend.emails.send({
      from: 'Website <leads@yourdomain.com>', // TODO: an address on your Resend-verified domain
      to: process.env.SALES_EMAIL!,
      replyTo: email,
      subject: `New call request — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message ?? ''}`,
    });
    if (error) throw error;
    return { ok: true };
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }
}
