import { Suspense, lazy, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { profile } from "../data/content";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import SectionHeader from "./SectionHeader";

const ContactScene = lazy(() => import("../three/ContactScene"));

// Formspree endpoint — submissions are delivered to taufiqnagori99@gmail.com.
const FORM_ENDPOINT = "https://formspree.io/f/xvzekbgl";
const FORM_CONFIGURED = !FORM_ENDPOINT.includes("YOUR_FORM_ID");

type Status = "idle" | "submitting" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const { lowPower } = useSettings();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const magnetic = useMagnetic<HTMLButtonElement>(10);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.message.trim() || values.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      if (!FORM_CONFIGURED) {
        // Endpoint not set up yet — deliver via the visitor's own mail client
        // so the message still reaches the inbox.
        const subject = encodeURIComponent(`Portfolio contact from ${values.name}`);
        const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email, // Formspree uses this as the reply-to address
            message: values.message,
            _subject: `Portfolio contact from ${values.name}`,
          }),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl overflow-hidden px-6 py-20">
      {!lowPower && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </div>
      )}

      <div ref={ref} className="relative z-10 grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeader index="06" eyebrow="Contact" shown={shown} title="Let's build something." />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-dim">
            Open to full stack and applied ML roles, freelance work, or just a good conversation about explainable AI.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a href={`mailto:${profile.email}`} data-cursor-hover className="flex items-center gap-3 text-sm text-text-dim transition-colors hover:text-blue">
              <FiMail /> {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} data-cursor-hover className="flex items-center gap-3 text-sm text-text-dim transition-colors hover:text-blue">
              <FiPhone /> {profile.phone}
            </a>
          </div>

          <div className="mt-8 flex gap-5 text-text-dim">
            <a href={profile.github} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="transition-colors hover:text-blue">
              <FiGithub size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="transition-colors hover:text-blue">
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          noValidate
          className="glass lg:col-span-3 flex flex-col gap-5 rounded-2xl p-8"
        >
          <div>
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-text-dim">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-border bg-white/[0.02] px-4 py-3 text-sm text-text outline-none transition-colors focus:border-blue"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-text-dim">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-border bg-white/[0.02] px-4 py-3 text-sm text-text outline-none transition-colors focus:border-blue"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-text-dim">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              className="mt-2 w-full resize-none rounded-lg border border-border bg-white/[0.02] px-4 py-3 text-sm text-text outline-none transition-colors focus:border-blue"
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
          </div>

          <motion.button
            ref={magnetic.ref}
            type="submit"
            disabled={status === "submitting"}
            data-cursor-hover
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            whileHover={{ scale: 1.02 }}
            style={magnetic.style}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f2f2f2] via-[#b0b0b0] to-[#707070] px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-[#05060a] shadow-[0_10px_32px_-12px_rgba(255, 255, 255,0.55)] transition-shadow hover:shadow-[0_14px_44px_-12px_rgba(190, 190, 190,0.65)] disabled:opacity-70"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "submitting" ? (
                <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#05060a] border-t-transparent" />
                  Sending
                </motion.span>
              ) : status === "success" ? (
                <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <FiCheck /> Message Sent
                </motion.span>
              ) : status === "error" ? (
                <motion.span key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <FiAlertCircle /> Try Again
                </motion.span>
              ) : (
                <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <FiSend /> Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          {!FORM_CONFIGURED && (
            <p className="font-mono text-[10px] text-text-faint">
              Direct delivery not configured yet — sending opens your email app instead. (Owner: set
              FORM_ENDPOINT in Contact.tsx to your Formspree endpoint.)
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
