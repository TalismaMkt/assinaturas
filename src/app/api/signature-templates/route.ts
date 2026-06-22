import { withSupabase } from "@supabase/server";

export const dynamic = "force-dynamic";

export const GET = withSupabase({ auth: "none" }, async (_req, ctx) => {
  const { data, error } = await (ctx.supabaseAdmin as any)
    .from("signature_templates")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data });
});

export const POST = withSupabase({ auth: "none" }, async (req, ctx) => {
  const body = await req.json();
  const { data, error } = await (ctx.supabaseAdmin as any)
    .from("signature_templates")
    .upsert(body as any, { onConflict: "name" })
    .select()
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data });
});
