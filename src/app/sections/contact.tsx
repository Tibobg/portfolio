"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import GlassBlock from "@/components/GlassBlock";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("Contact");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [hp, setHp] = React.useState(""); // honey pot
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");
  const [emailError, setEmailError] = React.useState("");
  const [isMedium, setIsMedium] = React.useState(false);

  React.useEffect(() => {
    const checkWidth = () => {
      const w = window.innerWidth;
      setIsMedium(w >= 768 && w <= 1135);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  function validateEmail(value: string) {
    if (!value) return t("errors.emailRequired");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? "" : t("errors.emailInvalid");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setLoading(true);
    setEmailError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("ok");
        setMessage("");
        // Si tu veux aussi reset:
        // setName(""); setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className={`relative overflow-hidden ${isMedium ? "py-60" : "py-30"}`}>
      <div className="mx-auto max-w-5xl px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t("title")}</h2>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t("headline.line1")}<br className="hidden sm:block" />{t("headline.line2")}
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </div>

        <GlassBlock variant="base" className="mt-10 p-6 md:p-8">
          <form onSubmit={onSubmit} className="grid gap-4 md:gap-5">
            {/* Honey pot */}
            <input
              type="text"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <label className="grid gap-1">
                <span className="text-xs text-white/70">{t("labels.name")}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("placeholders.name")}
                  className="rounded-xl bg-white/5 text-white placeholder-white/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30"
                />
              </label>

              {/* Email */}
              <label className="grid gap-1">
                <div className="flex items-center justify-between h-5">
                  <span className="text-xs text-white/70">{t("labels.email")}</span>
                  <span
                    className={`text-[11px] ${emailError ? "text-red-400" : "invisible"}`}
                    aria-live="polite"
                    id="email-help"
                  >
                    {emailError || "placeholder"}
                  </span>
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\s+/g, "");
                    setEmail(v);
                    if (emailError) setEmailError("");
                  }}
                  onBlur={() => setEmailError(validateEmail(email.trim()))}
                  placeholder={t("placeholders.email")}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!emailError}
                  aria-describedby="email-help"
                  className={`h-11.5 rounded-xl bg-white/5 text-white placeholder-white/40 border px-3 py-2 outline-none ring-1 ring-inset
                    ${
                      emailError
                        ? "border-white/0 ring-red-400/60 focus:ring-red-400"
                        : "border-white/10 ring-white/0 focus:ring-white/30"
                    }`}
                  required
                />
              </label>
            </div>

            {/* Message */}
            <label className="grid gap-1">
              <span className="text-xs text-white/70">{t("labels.message")}</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("placeholders.message")}
                rows={6}
                className="rounded-2xl bg-white/5 text-white placeholder-white/40 border border-white/10 px-3 py-3 outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <div className="text-right text-xs text-white/50">
                {message.length} {t("charCount")}
              </div>
            </label>

            {/* Actions */}
            <div className="mt-2 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Socials */}
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href="https://www.linkedin.com/in/thibault-cauche-aa2983180/"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-white/80 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4" /> Thibault Cauche
                </Link>
                <Link
                  href="https://discord.com/users/thibault9090"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-white/80 hover:text-white"
                  aria-label="Discord"
                >
                  <span className="sr-only">Discord</span>
                  <MessageCircle className="h-4 w-4" /> Discord
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !message.trim() || !!emailError || !email}
                className="btn-cv btn-cv--sweep inline-flex items-center gap-2 disabled:opacity-60"
              >
                <span>{loading ? t("sending") : t("submit")}</span>
              </button>
            </div>

            {/* Notifications */}
            <AnimatePresence>
              {status === "ok" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-2 text-sm"
                  role="status"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {t("success")}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-red-500/10 text-red-300 border border-red-500/20 px-3 py-2 text-sm"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4" />
                  {t("error")}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </GlassBlock>
      </div>
    </section>
  );
}
