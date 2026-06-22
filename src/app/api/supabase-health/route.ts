import { withSupabase } from "@supabase/server";
import { validateSupabaseEnv } from "@/lib/supabase-env";

export const GET = withSupabase({ auth: "user" }, async (_req, ctx) => {
  const env = validateSupabaseEnv();

  if (!env.ok) {
    return Response.json(
      {
        ok: false,
        missing: env.missing,
      },
      { status: 500 }
    );
  }

  return Response.json({
    ok: true,
    message: "Supabase server SDK configured.",
    clients: {
      supabase: Boolean(ctx.supabase),
      supabaseAdmin: Boolean(ctx.supabaseAdmin),
    },
  });
});
