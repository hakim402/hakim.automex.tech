import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./_components/ContactForm";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — open to collaborations, research discussions, and opportunities.",
};

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 reveal">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-12 reveal">
        <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
          Connect
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Open to collaborations, research discussions, and opportunities in
          software engineering, AI integration, and distributed systems.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Contact info sidebar */}
        <aside className="space-y-6 lg:col-span-2">
          {/* Email */}
          <div className="rounded-xl border border-border bg-background-elevated p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Mail className="h-4.5 w-4.5 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Email</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 block text-sm text-accent transition-colors hover:text-accent-secondary"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-2 text-xs text-muted">
              I typically respond within 24-48 hours.
            </p>
          </div>

          {/* Location */}
          <div className="rounded-xl border border-border bg-background-elevated p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-secondary/10">
              <MapPin className="h-4.5 w-4.5 text-accent-secondary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Location</h3>
            <p className="mt-1 text-sm text-muted">
              Kabul, Afghanistan
            </p>
            <p className="mt-2 text-xs text-muted">
              Open to remote opportunities worldwide.
            </p>
          </div>

          {/* Office hours */}
          <div className="rounded-xl border border-border bg-background-elevated p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-secondary/10">
              <Clock className="h-4.5 w-4.5 text-accent-secondary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Office Hours</h3>
            <p className="mt-1 text-sm text-muted">
              Monday &ndash; Friday
            </p>
            <p className="text-xs text-muted">
              9:00 AM &ndash; 6:00 PM GMT+4:30
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background-elevated px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent-secondary/30 hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background-elevated px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent-secondary/30 hover:text-foreground"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </aside>

        {/* Form */}
        <section className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-background-elevated p-6 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
