import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry";

function configured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );
}

export async function POST(request: Request) {
  if (!configured()) {
    return NextResponse.json(
      { ok: false, message: "Enquiry delivery is not configured yet. Please use LinkedIn." },
      { status: 503 },
    );
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ ok: false, message: "Request rejected." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, message: "Request rejected." }, { status: 403 });
    }
  }

  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > 20_000) {
      return NextResponse.json({ ok: false, message: "Enquiry is too long." }, { status: 413 });
    }
    payload = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json({ ok: false, message: "Enquiry could not be read." }, { status: 400 });
  }

  const body = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const result = validateEnquiry(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message, fieldErrors: result.fieldErrors },
      { status: 400 },
    );
  }

  const { name, company, email, service, details } = result.data;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Project enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "Not provided"}`,
        `Email: ${email}`,
        `Service: ${service}`,
        "",
        details,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, message: "The enquiry could not be sent. Please use LinkedIn." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
