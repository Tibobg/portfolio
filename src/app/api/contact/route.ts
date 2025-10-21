import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";          // reste côté Node
export const dynamic = "force-dynamic";   // Next ne tente pas d’optimiser/évaluer statiquement

type ContactPayload = { name?: string; email: string; message: string; hp?: string | null };

function isPayload(x: unknown): x is ContactPayload {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return typeof o.email === "string" && typeof o.message === "string";
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const FROM = process.env.RESEND_FROM ?? "Portfolio <contact@thibaultcauche.com>";
  const TO = process.env.CONTACT_TO ?? "thibault.cauche@gmail.com";

  if (!apiKey) {
    console.error("RESEND_API_KEY manquante");
    return NextResponse.json({ ok: false, error: "Server misconfigured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const body: unknown = await req.json();
  if (!isPayload(body)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const { name, email, message, hp } = body;
  if (hp) return NextResponse.json({ ok: true }); // honeypot

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Contact portfolio – ${name?.trim() || "Anonyme"}`,
    text: `${message}\n\n—\nDe: ${name || "Anonyme"}\nEmail: ${email}`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
