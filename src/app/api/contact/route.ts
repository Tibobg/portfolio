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

    console.log("Resend OK:", result);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Resend ERROR:", e);
    // Optionnel: renvoyer l’erreur pour debug rapide (à retirer en prod)
    return NextResponse.json({ ok: false, error: e?.message ?? "send_failed" }, { status: 500 });
  }
}
