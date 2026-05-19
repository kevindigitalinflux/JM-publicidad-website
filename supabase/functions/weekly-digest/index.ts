import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendEmail, buildWeeklyDigest } from '../_shared/brevo.ts';

const CLIENT_EMAIL = 'jmpublicidad@outlook.es';

serve(async (req) => {
  // Bearer token auth — set CRON_SECRET in Edge Function secrets
  const cronSecret = Deno.env.get('CRON_SECRET');
  if (cronSecret) {
    const auth = req.headers.get('Authorization') ?? '';
    if (auth !== `Bearer ${cronSecret}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('enquiries')
    .select('name, email, service, budget_range, created_at')
    .gte('created_at', weekAgo.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('weekly-digest query:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const enquiries = data ?? [];

  await sendEmail({
    to: [{ email: CLIENT_EMAIL, name: 'JM Publicidad' }],
    subject: enquiries.length === 0
      ? 'Resumen semanal — Sin consultas esta semana'
      : `Resumen semanal — ${enquiries.length} consulta${enquiries.length !== 1 ? 's' : ''} esta semana`,
    html: buildWeeklyDigest(enquiries),
  });

  return new Response(JSON.stringify({ ok: true, count: enquiries.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
