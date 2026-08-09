import { formatPrice } from "@/lib/format";

export interface OrderConfirmationEmailData {
  reference: string;
  customerName?: string | null;
  items: { name: string; quantity: number; lineTotal: number }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
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

export function orderConfirmationSubject(reference: string): string {
  return `Encomenda confirmada · #${reference}`;
}

export function renderOrderConfirmationEmail(data: OrderConfirmationEmailData): string {
  const saudacao = data.customerName ? `Olá, ${escapeHtml(data.customerName)}` : "Olá";

  const linhasItens = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e2d8;color:#1c1a17;font-size:14px;">
            ${escapeHtml(item.name)} × ${item.quantity}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e2d8;color:#1c1a17;font-size:14px;text-align:right;white-space:nowrap;">
            ${formatPrice(item.lineTotal)}
          </td>
        </tr>`
    )
    .join("");

  const linhaMorada = data.shippingAddress
    ? `
      <p style="margin:4px 0 0;color:#6b665c;font-size:13px;line-height:1.6;">
        ${escapeHtml(data.shippingAddress.line1 ?? "")}${data.shippingAddress.line2 ? `, ${escapeHtml(data.shippingAddress.line2)}` : ""}<br />
        ${escapeHtml(data.shippingAddress.postal_code ?? "")} ${escapeHtml(data.shippingAddress.city ?? "")}<br />
        ${escapeHtml(data.shippingAddress.country ?? "")}
      </p>`
    : "";

  return `
<!DOCTYPE html>
<html lang="pt-PT">
  <body style="margin:0;padding:0;background:#faf9f6;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e6e2d8;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 8px;">
                <p style="margin:0;font-size:20px;color:#1c1a17;">
                  Kul<span style="font-style:italic;color:#a9824c;">anda</span>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a9824c;">
                  Encomenda confirmada
                </p>
                <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#1c1a17;">
                  ${saudacao}, obrigado pela sua compra!
                </h1>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#6b665c;">
                  Recebemos o pagamento da sua encomenda <strong style="color:#1c1a17;">#${escapeHtml(data.reference)}</strong>.
                  Vamos processá-la e avisamo-lo assim que for enviada.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;font-family:Arial,Helvetica,sans-serif;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${linhasItens}
                  <tr>
                    <td style="padding:14px 0 2px;color:#6b665c;font-size:13px;">Subtotal</td>
                    <td style="padding:14px 0 2px;color:#6b665c;font-size:13px;text-align:right;">${formatPrice(data.subtotal)}</td>
                  </tr>
                  <tr>
                    <td style="padding:2px 0;color:#6b665c;font-size:13px;">Portes</td>
                    <td style="padding:2px 0;color:#6b665c;font-size:13px;text-align:right;">${data.shippingFee === 0 ? "Grátis" : formatPrice(data.shippingFee)}</td>
                  </tr>
                  ${
                    data.discount > 0
                      ? `<tr>
                          <td style="padding:2px 0;color:#a9824c;font-size:13px;">Desconto</td>
                          <td style="padding:2px 0;color:#a9824c;font-size:13px;text-align:right;">−${formatPrice(data.discount)}</td>
                        </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:12px 0 24px;border-top:1px solid #e6e2d8;font-weight:bold;color:#1c1a17;font-size:15px;">Total</td>
                    <td style="padding:12px 0 24px;border-top:1px solid #e6e2d8;font-weight:bold;color:#1c1a17;font-size:15px;text-align:right;">${formatPrice(data.total)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            ${
              data.shippingAddress
                ? `<tr>
                    <td style="padding:0 32px 24px;font-family:Arial,Helvetica,sans-serif;">
                      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a9824c;">Morada de entrega</p>
                      ${linhaMorada}
                    </td>
                  </tr>`
                : ""
            }
            <tr>
              <td style="padding:24px 32px 32px;background:#1c1a17;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.6);">
                  Dúvidas sobre a sua encomenda? Responda a este e-mail ou escreva para
                  <a href="mailto:geral@kulanda-store.com" style="color:#a9824c;">geral@kulanda-store.com</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
