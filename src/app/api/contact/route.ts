// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
// ⚠️ pour tester sans config de domaine, utilise cette adresse fournie par Resend :
const FROM = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? "thibault.cauche@gmail.com";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/contact", expects: "POST" });
}

export async function POST(req: Request) {
  try {
    const { name, email, message, hp } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 400 });
    }
    if (hp) return NextResponse.json({ ok: true });

    const subject = `Contact portfolio – ${name?.trim() || "Anonyme"}`;
    const text = `${message}\n\n—\nDe : ${name || "Anonyme"}\nEmail : ${email || "(non fourni)"}`;

    const result = await resend.emails.send({
      from: FROM,          // 👈 en dev, "onboarding@resend.dev" évite les 422 de domaine
      to: TO,
      subject,
      text,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true, id: (result as { id?: string }).id });
  } catch (e: unknown) {
    const msg = e && typeof e === "object" && "message" in e ? String((e as { message: unknown }).message) : "send_failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
