import { formatPrice } from "@/lib/format";

export interface AdminNotificationEmailData {
  reference: string;
  email: string;
  customerName?: string | null;
  phone?: string | null;
  items: { name: string; quantity: number; lineTotal: number }[];
  total: number;
  shippingAddress?: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function adminNotificationSubject(reference: string): string {
  return `Nova encomenda · #${reference}`;
}

export function renderAdminNotificationEmail(data: AdminNotificationEmailData): string {
  const linhasItens = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e6e2d8;color:#1c1a17;font-size:14px;">
            ${escapeHtml(item.name)} × ${item.quantity}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #e6e2d8;color:#1c1a17;font-size:14px;text-align:right;white-space:nowrap;">
            ${formatPrice(item.lineTotal)}
          </td>
        </tr>`
    )
    .join("");

  const morada = data.shippingAddress
    ? `${escapeHtml(data.shippingAddress.line1 ?? "")}${data.shippingAddress.line2 ? `, ${escapeHtml(data.shippingAddress.line2)}` : ""}, ${escapeHtml(data.shippingAddress.postal_code ?? "")} ${escapeHtml(data.shippingAddress.city ?? "")}, ${escapeHtml(data.shippingAddress.country ?? "")}`
    : "Sem morada associada";

  return `
<!DOCTYPE html>
<html lang="pt-PT">
  <body style="margin:0;padding:0;background:#faf9f6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e6e2d8;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:24px 32px 4px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a9824c;">
                  Nova venda na Kulanda
                </p>
                <h1 style="margin:8px 0 4px;font-size:20px;color:#1c1a17;">
                  Encomenda #${escapeHtml(data.reference)}
                </h1>
                <p style="margin:0 0 16px;font-size:13px;color:#6b665c;">
                  Cliente: ${escapeHtml(data.customerName ?? "—")} (${escapeHtml(data.email)})${data.phone ? ` · ${escapeHtml(data.phone)}` : ""}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${linhasItens}
                  <tr>
                    <td style="padding:12px 0;font-weight:bold;color:#1c1a17;font-size:15px;">Total</td>
                    <td style="padding:12px 0;font-weight:bold;color:#1c1a17;font-size:15px;text-align:right;">${formatPrice(data.total)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a9824c;">Morada de entrega</p>
                <p style="margin:0;color:#6b665c;font-size:13px;line-height:1.6;">${morada}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
