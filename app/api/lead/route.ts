import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { renderEmailShell, detailRow, messagePanel, ctaButton, emailColors } from "@/lib/email-template";
import { createAdminClient } from "@/lib/supabase/admin";

// Unlike Resend's sandbox sender, SendGrid has no "always works" default —
// the FROM address must be a verified single sender or part of an
// authenticated domain in the SendGrid account, or every send fails with a
// 403. This fallback string only avoids a crash on missing env config; set
// LEAD_FROM_EMAIL to the client's actual verified sender.
const FROM = process.env.LEAD_FROM_EMAIL || "MediShields Website <noreply@medishields.com>";

// When LEAD_NOTIFICATION_EMAIL is set, every submission goes there
// regardless of source — useful for testing against a single inbox. Once
// unset, routing falls to resolveMailbox() below, which maps each
// source/type to one of the client's real department mailboxes.
const NOTIFICATION_OVERRIDE = process.env.LEAD_NOTIFICATION_EMAIL;

// Mirrors the client's mailbox structure: new inquiries about a specific
// service or specialty are sales-qualified and go to sales@, general
// contact / newsletter signups go to info@. No user-facing "which team"
// picker is needed — every form already tags its own `source`, and the 11
// service pages / 12 specialty pages / Near Me pages / floating widget all
// carry the info needed to route automatically.
function resolveMailbox(source: string, type: "lead" | "newsletter"): string {
  if (type === "newsletter") return "info";
  if (source === "Contact page") return "info";
  if (/ service page$/.test(source)) return "sales";
  if (/ specialty page$/.test(source)) return "sales";
  if (source === "Floating contact widget") return "sales";
  if (/^Near Me/.test(source)) return "sales";
  return "info";
}

interface LeadPayload {
  type?: "lead" | "newsletter";
  source: string;
  name?: string;
  email: string;
  phone?: string;
  practice?: string;
  address?: string;
  state?: string;
  service?: string;
  specialty?: string;
  message?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Subject headers need RFC 2047 encoding for non-ASCII characters, which
// SendGrid's API doesn't apply automatically — an em dash or curly quote
// sails through fine in the HTML body but renders as "�" in a mail
// client's subject line. Normalizing to plain ASCII punctuation here means
// any future source string can't reintroduce this regardless of what
// punctuation gets typed into it.
function asciiSafeSubject(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x00-\x7F]/g, "");
}

// Turns the existing `source`/`service` values into a natural phrase for
// the auto-reply's opening line — e.g. "our Cardiology billing services"
// for a specialty page, "medical billing services in California" for a
// Near Me state page. Returns null when there's nothing specific enough to
// name (e.g. the plain Contact page with no service selected), in which
// case the caller drops the topic clause rather than saying something
// generic and circular like "reaching out to MediShields about MediShields."
function friendlyTopic(source: string, service?: string): string | null {
  if (service) return service;

  const specialtyMatch = source.match(/^(.+) specialty page$/);
  if (specialtyMatch) return `our ${specialtyMatch[1]} billing services`;

  const serviceMatch = source.match(/^(.+) service page$/);
  if (serviceMatch) return `our ${serviceMatch[1]} services`;

  const nearMeStateMatch = source.match(/^Near Me - (.+)$/);
  if (nearMeStateMatch) return `medical billing services in ${nearMeStateMatch[1]}`;

  if (source === "Near Me page (location not listed)") return "medical billing services near you";

  return null;
}

export async function POST(req: NextRequest) {
  const supabase = createAdminClient();

  // CMS-managed key takes priority so a client pasting their own key in
  // Settings works instantly, with no redeploy — env var is just the
  // fallback for local dev before any key has been saved in the DB.
  const { data: settings } = await supabase
    .from("site_settings")
    .select("sendgrid_api_key")
    .single();
  const apiKey = settings?.sendgrid_api_key || process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.error("No SendGrid API key configured (DB or env)");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }
  sgMail.setApiKey(apiKey);

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { type = "lead", source, name, email, phone, practice, address, state, service, specialty, message } = body;

  if (!email || typeof email !== "string" || !source) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const safeName = name ? escapeHtml(name) : undefined;
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source);

  const mailbox = resolveMailbox(source, type);
  const TO = NOTIFICATION_OVERRIDE || `${mailbox}@medishields.com`;

  // Persist regardless of what happens with the email sends below, so a
  // submission still shows up in the admin Leads inbox even if SendGrid
  // has a hiccup. Best-effort — a DB error here shouldn't block the
  // business-critical notification email. Newsletter/notify-me signups
  // (Careers "Notify Me", footer newsletter) persist too — they used to be
  // skipped here, which meant they only ever fired an email and never
  // showed up in the CMS at all.
  const { error: insertError } = await supabase.from("leads").insert({
    name: name || null,
    email,
    phone: phone || null,
    message: message || null,
    source,
  });
  if (insertError) console.error("Failed to persist lead:", insertError);

  const subject = asciiSafeSubject(
    type === "newsletter"
      ? `New newsletter signup - ${source}`
      : `New lead - ${source}${name ? ` (${name})` : ""}`
  );

  // ---- Internal notification (to the business) ----
  const contactRows = [
    safeName ? detailRow("Name", safeName) : "",
    detailRow("Email", `<a href="mailto:${safeEmail}" style="color:${emailColors.teal};">${safeEmail}</a>`),
    phone ? detailRow("Phone", escapeHtml(phone)) : "",
    practice ? detailRow("Practice", escapeHtml(practice)) : "",
    address ? detailRow("Address", escapeHtml(address)) : "",
    state ? detailRow("State", escapeHtml(state)) : "",
    service ? detailRow("Interested in", escapeHtml(service)) : "",
    specialty ? detailRow("Specialty", escapeHtml(specialty)) : "",
  ].join("");

  const isCareerAlert = source === "Careers page - job openings alert";

  const notificationIntro =
    type === "newsletter"
      ? isCareerAlert
        ? `<p style="margin:0 0 20px;">Hi team, someone just signed up to be notified when a new job opening posts, from the <strong>${safeSource}</strong>.</p>`
        : `<p style="margin:0 0 20px;">Hi team, someone just subscribed to the MediShields newsletter from the <strong>${safeSource}</strong>.</p>`
      : `<p style="margin:0 0 20px;">Hi team, you've received a new inquiry from the <strong>${safeSource}</strong>. Here's what they shared:</p>`;

  const notificationHtml = renderEmailShell(
    `
      <h2 style="margin:0 0 18px;font-size:20px;color:${emailColors.ink};">
        ${type === "newsletter" ? "New newsletter signup" : "New lead submission"}
      </h2>
      ${notificationIntro}
      ${contactRows}
      ${message ? messagePanel("Their message", escapeHtml(message)) : ""}
      ${
        type !== "newsletter"
          ? ctaButton(`mailto:${safeEmail}`, `Reply to ${safeName || "this lead"}`)
          : ""
      }
    `,
    subject
  );

  try {
    await sgMail.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      html: notificationHtml,
    });
  } catch (err) {
    console.error("SendGrid send failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  // ---- Auto-reply (to the submitter) — best-effort. Failing this doesn't
  // fail the submission itself, since the notification above is the
  // business-critical email. Logged, not surfaced to the client. ----
  try {
    const greeting = safeName ? `Hi ${safeName},` : "Hi,";

    const replySubject = asciiSafeSubject(
      type === "newsletter"
        ? isCareerAlert
          ? "You're on the list - MediShields Careers"
          : "You're subscribed - MediShields Blog"
        : "We got your message - MediShields"
    );

    const replyBodyHtml =
      type === "newsletter"
        ? isCareerAlert
          ? `
            <h2 style="margin:0 0 16px;font-size:20px;color:${emailColors.ink};">You're on the list</h2>
            <p style="margin:0 0 14px;">${greeting}</p>
            <p style="margin:0 0 14px;">Thanks for your interest in joining MediShields. As soon as a new position opens up, we'll email you right away so you're first to know, no spam, unsubscribe anytime.</p>
            <p style="margin:24px 0 0;color:${emailColors.muted};">— The MediShields Team</p>
          `
          : `
            <h2 style="margin:0 0 16px;font-size:20px;color:${emailColors.ink};">You're on the list</h2>
            <p style="margin:0 0 14px;">${greeting}</p>
            <p style="margin:0 0 14px;">Thanks for subscribing to the MediShields newsletter. We'll email you as soon as we publish new medical billing and RCM insights, no spam, unsubscribe anytime.</p>
            <p style="margin:24px 0 0;color:${emailColors.muted};">— The MediShields Team</p>
          `
        : `
          <h2 style="margin:0 0 16px;font-size:20px;color:${emailColors.ink};">We got your message</h2>
          <p style="margin:0 0 14px;">${greeting}</p>
          <p style="margin:0 0 14px;">Thanks for reaching out to MediShields${
            friendlyTopic(source, service) ? ` about <strong>${escapeHtml(friendlyTopic(source, service)!)}</strong>` : ""
          }. A member of our team will review your message and get back to you within one business day.</p>
          ${message ? messagePanel("Here's what you sent us", escapeHtml(message)) : ""}
          <p style="margin:8px 0 4px;font-size:13px;color:${emailColors.muted};">We'll reach out using the contact info below:</p>
          ${detailRow("Email", safeEmail)}
          ${phone ? detailRow("Phone", escapeHtml(phone)) : ""}
          <p style="margin:22px 0 8px;">Need something sooner? Call us at <strong>(786) 767-6696</strong> or email <a href="mailto:${mailbox}@medishields.com" style="color:${emailColors.teal};">${mailbox}@medishields.com</a>.</p>
          <p style="margin:24px 0 0;color:${emailColors.muted};">— The MediShields Team</p>
        `;

    await sgMail.send({
      from: FROM,
      to: email,
      replyTo: `${mailbox}@medishields.com`,
      subject: replySubject,
      html: renderEmailShell(replyBodyHtml, replySubject),
    });
  } catch (err) {
    console.error("Auto-reply send failed:", err);
  }

  return NextResponse.json({ ok: true });
}
