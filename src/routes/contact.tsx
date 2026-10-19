import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ReelMatch" },
      { name: "description", content: "Questions, movie suggestions, corrections or feedback — send ReelMatch a message." },
      { property: "og:title", content: "Contact — ReelMatch" },
      { property: "og:description", content: "Questions, movie suggestions, corrections or feedback — send ReelMatch a message." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const REASONS = [
  ["general", "General question"],
  ["technical", "Technical problem"],
  ["suggestion", "Movie suggestion"],
  ["incorrect", "Incorrect movie information"],
  ["feedback", "Feedback"],
  ["business", "Partnership / business"],
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  reason: z.enum(["general", "technical", "suggestion", "incorrect", "feedback", "business"]),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});

const input = "mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [startedAt] = useState(() => Date.now());

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website") || Date.now() - startedAt < 2000) { setStatus("sent"); return; } // spam trap
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0] as string, i.message])));
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setStatus(error ? "error" : "sent");
  };

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h1 className="mt-4 font-display text-4xl">Message sent</h1>
        <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll reply to your email as soon as we can.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-primary">Send another</button>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) => errors[k] ? <p className="mt-1 text-xs text-destructive" role="alert">{errors[k]}</p> : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-display text-6xl">Get in <span className="text-primary">touch</span></h1>
      <p className="mt-2 text-muted-foreground">Questions, suggestions or a movie we got wrong — we'd love to hear it.</p>
      <form onSubmit={submit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="name" className="text-sm font-semibold">Name</label><input id="name" name="name" className={input} autoComplete="name" /><Err k="name" /></div>
        <div><label htmlFor="email" className="text-sm font-semibold">Email</label><input id="email" name="email" type="email" className={input} autoComplete="email" /><Err k="email" /></div>
        <div><label htmlFor="reason" className="text-sm font-semibold">Reason</label>
          <select id="reason" name="reason" className={input} defaultValue="general">{REASONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
        <div><label htmlFor="subject" className="text-sm font-semibold">Subject</label><input id="subject" name="subject" className={input} /><Err k="subject" /></div>
        <div className="sm:col-span-2"><label htmlFor="message" className="text-sm font-semibold">Message</label><textarea id="message" name="message" rows={6} className={input} /><Err k="message" /></div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        {status === "error" && <p className="text-sm text-destructive sm:col-span-2" role="alert">Something went wrong sending your message. Please try again.</p>}
        <button disabled={status === "sending"} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 sm:col-span-2 sm:justify-self-start">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
