export const supabaseEnv = {
  url: process.env.SUPABASE_URL || "",
  publishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || "",
  secretKey: process.env.SUPABASE_SECRET_KEY || "",
  jwksUrl: process.env.SUPABASE_JWKS_URL || "",
};

export function validateSupabaseEnv() {
  const missing = Object.entries({
    SUPABASE_URL: supabaseEnv.url,
    SUPABASE_PUBLISHABLE_KEY: supabaseEnv.publishableKey,
    SUPABASE_SECRET_KEY: supabaseEnv.secretKey,
    SUPABASE_JWKS_URL: supabaseEnv.jwksUrl,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return {
    ok: missing.length === 0,
    missing,
  };
}
