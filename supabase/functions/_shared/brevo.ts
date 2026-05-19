const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER = { name: 'JM Publicidad', email: 'jmpublicidad@outlook.es' };

function esc(s: string | null | undefined): string {
  if (!s) return '—';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendEmail(opts: {
  to: { email: string; name: string }[];
  subject: string;
  html: string;
}): Promise<void> {
  const key = Deno.env.get('BREVO_API_KEY');
  if (!key) throw new Error('BREVO_API_KEY not configured');

  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': key,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: SENDER,
      to: opts.to,
      subject: opts.subject,
      htmlContent: opts.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo ${res.status}: ${body}`);
  }
}

// ─── Shared HTML wrapper ────────────────────────────────────────────────────

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f6f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ef;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr>
          <td style="background:#536049;padding:28px 36px;border-radius:10px 10px 0 0;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.4px;">JM Publicidad</p>
            <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.65);letter-spacing:2.5px;text-transform:uppercase;">Agencia de Publicidad</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 36px 32px;border-radius:0 0 10px 10px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9a9790;">jmpublicidad@outlook.es &nbsp;·&nbsp; JM Publicidad</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── Client notification ────────────────────────────────────────────────────

interface EnquiryRecord {
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  budget_range: string | null;
  locale: string | null;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 14px;background:#f6f3ef;font-size:11px;font-weight:600;color:#536049;letter-spacing:1.2px;text-transform:uppercase;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:10px 14px;font-size:14px;color:#1b1c1a;vertical-align:top;word-break:break-word;">${value}</td>
  </tr>`;
}

export function buildClientNotification(r: EnquiryRecord): string {
  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1b1c1a;letter-spacing:-0.4px;">
      Nueva consulta recibida
    </h1>
    <p style="margin:0 0 28px;font-size:15px;color:#6b6f64;line-height:1.6;">
      Alguien ha completado el formulario en tu sitio web.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #e4e2df;border-radius:8px;overflow:hidden;border-collapse:collapse;margin-bottom:24px;">
      <tbody>
        ${detailRow('Nombre',      esc(r.name))}
        ${detailRow('Email',       `<a href="mailto:${esc(r.email)}" style="color:#536049;text-decoration:none;">${esc(r.email)}</a>`)}
        ${detailRow('Empresa',     esc(r.company))}
        ${detailRow('Servicio',    esc(r.service))}
        ${detailRow('Presupuesto', esc(r.budget_range))}
      </tbody>
    </table>

    <div style="background:#f6f3ef;border-left:3px solid #536049;padding:14px 18px;border-radius:0 6px 6px 0;margin-bottom:28px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1.2px;text-transform:uppercase;">Mensaje</p>
      <p style="margin:0;font-size:14px;color:#1b1c1a;line-height:1.75;">${esc(r.message).replace(/\n/g, '<br>')}</p>
    </div>

    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:6px;background:#536049;">
          <a href="mailto:${esc(r.email)}?subject=Re%3A%20Tu%20consulta%20%E2%80%94%20JM%20Publicidad"
             style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
            Responder a ${esc(r.name)} &rarr;
          </a>
        </td>
      </tr>
    </table>`;

  return wrap(body);
}

// ─── Customer auto-reply ────────────────────────────────────────────────────

export function buildAutoReply(name: string, isSpanish: boolean): string {
  const body = isSpanish ? `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1b1c1a;letter-spacing:-0.4px;">
      Hola ${esc(name)},
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:#454840;line-height:1.75;">
      Hemos recibido tu consulta y nos pondremos en contacto contigo dentro de las próximas
      <strong style="color:#536049;">24 horas</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#454840;line-height:1.75;">
      En JM Publicidad trabajamos con cada cliente de forma personalizada para encontrar la solución
      que mejor se adapte a tus necesidades. Pronto hablaremos contigo.
    </p>
    <div style="background:#f6f3ef;border-radius:8px;padding:18px 22px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1.2px;text-transform:uppercase;">Contacto directo</p>
      <p style="margin:0;font-size:14px;color:#1b1c1a;">
        <a href="mailto:jmpublicidad@outlook.es" style="color:#536049;text-decoration:none;">jmpublicidad@outlook.es</a>
      </p>
    </div>
    <p style="margin:0;font-size:15px;color:#454840;line-height:1.75;">
      Gracias por confiar en nosotros,<br>
      <strong style="color:#1b1c1a;">El equipo de JM Publicidad</strong>
    </p>` : `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1b1c1a;letter-spacing:-0.4px;">
      Hi ${esc(name)},
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:#454840;line-height:1.75;">
      We have received your enquiry and will be in touch within the next
      <strong style="color:#536049;">24 hours</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#454840;line-height:1.75;">
      At JM Publicidad we work with every client personally to find the solution that best fits
      your needs. We'll speak soon.
    </p>
    <div style="background:#f6f3ef;border-radius:8px;padding:18px 22px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1.2px;text-transform:uppercase;">Direct contact</p>
      <p style="margin:0;font-size:14px;color:#1b1c1a;">
        <a href="mailto:jmpublicidad@outlook.es" style="color:#536049;text-decoration:none;">jmpublicidad@outlook.es</a>
      </p>
    </div>
    <p style="margin:0;font-size:15px;color:#454840;line-height:1.75;">
      Thank you for reaching out,<br>
      <strong style="color:#1b1c1a;">The JM Publicidad team</strong>
    </p>`;

  return wrap(body);
}

// ─── Weekly digest ──────────────────────────────────────────────────────────

interface DigestEnquiry {
  name: string;
  email: string;
  service: string | null;
  budget_range: string | null;
  created_at: string;
}

export function buildWeeklyDigest(enquiries: DigestEnquiry[]): string {
  const count = enquiries.length;

  // Group by service
  const byService: Record<string, number> = {};
  for (const e of enquiries) {
    const key = e.service ?? 'Sin especificar';
    byService[key] = (byService[key] ?? 0) + 1;
  }

  const serviceRows = Object.entries(byService)
    .sort(([, a], [, b]) => b - a)
    .map(([svc, n]) => `
      <tr>
        <td style="padding:9px 14px;font-size:14px;color:#454840;border-bottom:1px solid #f0edea;">${esc(svc)}</td>
        <td style="padding:9px 14px;font-size:14px;font-weight:700;color:#536049;text-align:right;border-bottom:1px solid #f0edea;">${n}</td>
      </tr>`)
    .join('');

  const enquiryRows = enquiries.map(e => {
    const d = new Date(e.created_at);
    const date = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    return `
      <tr>
        <td style="padding:9px 14px;font-size:13px;color:#6b6f64;border-bottom:1px solid #f0edea;white-space:nowrap;">${date}</td>
        <td style="padding:9px 14px;font-size:13px;color:#1b1c1a;border-bottom:1px solid #f0edea;">${esc(e.name)}</td>
        <td style="padding:9px 14px;font-size:13px;color:#454840;border-bottom:1px solid #f0edea;">${esc(e.service)}</td>
        <td style="padding:9px 14px;font-size:13px;border-bottom:1px solid #f0edea;">
          <a href="mailto:${esc(e.email)}" style="color:#536049;text-decoration:none;">${esc(e.email)}</a>
        </td>
      </tr>`;
  }).join('');

  const weekEnd   = new Date();
  const weekStart = new Date();
  weekStart.setDate(weekEnd.getDate() - 7);
  const period = `${weekStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} — ${weekEnd.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;

  const body = `
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#1b1c1a;letter-spacing:-0.4px;">Resumen semanal</h1>
    <p style="margin:0 0 28px;font-size:14px;color:#9a9790;">${period}</p>

    <!-- Stat pill -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:#536049;border-radius:10px;padding:20px 36px;text-align:center;">
          <p style="margin:0;font-size:40px;font-weight:700;color:#ffffff;line-height:1;">${count}</p>
          <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;">
            Consulta${count !== 1 ? 's' : ''}
          </p>
        </td>
      </tr>
    </table>

    ${count === 0 ? `
    <p style="margin:0;font-size:15px;color:#9a9790;text-align:center;padding:20px 0;">
      Sin consultas esta semana.
    </p>` : `
    <!-- By service -->
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1.5px;text-transform:uppercase;">Por servicio</p>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #e4e2df;border-radius:8px;overflow:hidden;border-collapse:collapse;margin-bottom:28px;">
      <tbody>${serviceRows}</tbody>
    </table>

    <!-- All enquiries -->
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1.5px;text-transform:uppercase;">Detalle</p>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #e4e2df;border-radius:8px;overflow:hidden;border-collapse:collapse;">
      <thead>
        <tr style="background:#f6f3ef;">
          <th style="padding:9px 14px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1px;text-transform:uppercase;text-align:left;">Fecha</th>
          <th style="padding:9px 14px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1px;text-transform:uppercase;text-align:left;">Nombre</th>
          <th style="padding:9px 14px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1px;text-transform:uppercase;text-align:left;">Servicio</th>
          <th style="padding:9px 14px;font-size:11px;font-weight:600;color:#536049;letter-spacing:1px;text-transform:uppercase;text-align:left;">Email</th>
        </tr>
      </thead>
      <tbody>${enquiryRows}</tbody>
    </table>`}`;

  return wrap(body);
}
