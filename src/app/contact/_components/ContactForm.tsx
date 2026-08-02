"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:3500/api/contact";

type Status = "idle" | "loading" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [messageLength, setMessageLength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send. Try again.");
    }
  }

  function handleReset() {
    setStatus("idle");
    setMessageLength(0);
    setErrorMessage("");
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Message Sent!
        </h3>
        <p className="mt-2 text-sm text-muted">
          Thank you for reaching out. I&apos;ll get back to you within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-secondary"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-danger/30 bg-danger/5 p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-danger" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Failed to Send
        </h3>
        <p className="mt-2 text-sm text-muted">
          {errorMessage || "Something went wrong. Please try again."}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-secondary"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={status === "loading"}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={status === "loading"}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="you@example.com"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 flex items-center justify-between text-sm font-medium text-foreground"
        >
          <span>Message</span>
          {messageLength > 0 && (
            <span className="text-xs font-normal text-muted">
              {messageLength} / 1000
            </span>
          )}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={1000}
          disabled={status === "loading"}
          onChange={(e) => setMessageLength(e.target.value.length)}
          className="w-full resize-y rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Your message..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

