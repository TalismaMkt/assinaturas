import { withSupabase } from "@supabase/server";

type SignatureProfileRow = {
  id?: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
  email: string;
  template_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const dynamic = "force-dynamic";

export const GET = withSupabase({ auth: "none" }, async (_req, ctx) => {
  const admin = ctx.supabaseAdmin;
  const { data, error } = await admin
    .from("signature_profiles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data });
});

export const POST = withSupabase({ auth: "none" }, async (req, ctx) => {
  const body = (await req.json()) as SignatureProfileRow | SignatureProfileRow[];
  const rows = Array.isArray(body) ? body : [body];
  const admin = ctx.supabaseAdmin;

  const { data, error } = await admin
    .from("signature_profiles")
    .upsert(rows as never[], { onConflict: "email" })
    .select();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data });
});
