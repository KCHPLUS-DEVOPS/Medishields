import { SITE_URL } from "@/lib/seo";

const COLORS = {
  teal: "#0e7c7b",
  tealDark: "#134e4a",
  amber: "#f2994a",
  offwhite: "#f7fafa",
  ink: "#0e1414",
  muted: "#5b6a6a",
};

// Email clients (Outlook especially) don't support external stylesheets or
// most modern CSS, so this is deliberately table-based with fully inline
// styles rather than the Tailwind/flex patterns used elsewhere in the app.
export function renderEmailShell(bodyHtml: string, preheader?: string) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MediShields</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.offwhite};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.offwhite};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 45px -20px rgba(14,20,20,0.18);">
            <tr>
              <td style="background-color:${COLORS.tealDark};background-image:linear-gradient(135deg,${COLORS.tealDark},${COLORS.teal});padding:40px 32px 34px;text-align:center;">
                <img src="${SITE_URL}/logo.png" width="72" height="72" alt="MediShields" style="display:block;margin:0 auto 14px;border-radius:16px;" />
                <div style="color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.01em;">MediShields</div>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background-color:${COLORS.amber};font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:36px 32px;color:${COLORS.ink};font-size:15px;line-height:1.65;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;background-color:${COLORS.offwhite};border-top:1px solid #eef1f1;text-align:center;">
                <p style="margin:0;color:#8a9797;font-size:12px;">MediShields &middot; Revenue cycle management, engineered for certainty.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function detailRow(label: string, value: string) {
  return `
    <div style="margin-bottom:14px;padding-left:14px;border-left:3px solid ${COLORS.teal};">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:${COLORS.teal};font-weight:700;margin-bottom:3px;">${label}</div>
      <div style="font-size:15px;color:${COLORS.ink};">${value}</div>
    </div>
  `;
}

export function messagePanel(label: string, message: string) {
  return `
    <div style="margin:22px 0;padding:18px 20px;background-color:${COLORS.offwhite};border-radius:12px;border-left:3px solid ${COLORS.amber};">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:${COLORS.muted};font-weight:700;margin-bottom:8px;">${label}</div>
      <div style="font-size:15px;color:${COLORS.ink};line-height:1.6;white-space:pre-line;">${message}</div>
    </div>
  `;
}

export function ctaButton(href: string, label: string) {
  return `
    <a href="${href}" style="display:inline-block;background-color:${COLORS.amber};color:${COLORS.ink};text-decoration:none;font-weight:600;font-size:14px;padding:13px 30px;border-radius:999px;margin-top:6px;">${label}</a>
  `;
}

export { COLORS as emailColors };
