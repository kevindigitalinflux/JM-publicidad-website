import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { sendEmail, buildClientNotification, buildAutoReply } from '../_shared/brevo.ts';

const CLIENT_EMAIL = 'jmpublicidad@outlook.es';

serve(async (req) => {
  // Verify the Supabase webhook secret
  const secret = Deno.env.get('WEBHOOK_SECRET');
  if (secret && req.headers.get('x-webhook-secret') !== secret) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const payload = await req.json();
    const r = payload.record as Record<string, string | null>;

    if (!r?.email || !r?.name || !r?.message) {
      return new Response('Missing required fields', { status: 400 });
    }

    const isSpanish = r.locale === 'es';

    // Send client notification + customer auto-reply in parallel
    await Promise.all([
      sendEmail({
        to: [{ email: CLIENT_EMAIL, name: 'JM Publicidad' }],
        subject: `Nueva consulta: ${r.service ?? 'Consulta General'} — ${r.name}`,
        html: buildClientNotification({
          name:         r.name,
          email:        r.email,
          company:      r.company ?? null,
          service:      r.service ?? null,
          message:      r.message,
          budget_range: r.budget_range ?? null,
          locale:       r.locale ?? null,
        }),
      }),
      sendEmail({
        to: [{ email: r.email, name: r.name }],
        subject: isSpanish
          ? 'Hemos recibido tu consulta — JM Publicidad'
          : 'We received your enquiry — JM Publicidad',
        html: buildAutoReply(r.name, isSpanish),
      }),
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-enquiry-emails:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
