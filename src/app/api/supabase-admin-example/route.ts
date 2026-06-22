import { withSupabase } from "@supabase/server";

export const GET = withSupabase({ auth: "secret" }, async (_req, ctx) => {
  const { data, error } = await ctx.supabaseAdmin.from("todos").select("*").limit(10);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data, mode: "admin" });
});
