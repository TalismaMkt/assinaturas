# Supabase server setup

Installed package:
- `@supabase/server`

Expected environment variables:
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_JWKS_URL`

Added persistence for signatures:
- SQL schema: `supabase-signatures-schema.sql`
- Templates API: `src/app/api/signature-templates/route.ts`
- Profiles API: `src/app/api/signature-profiles/route.ts`

Notes:
- Apply `supabase-signatures-schema.sql` in the Supabase SQL editor first.
- `GET` routes use `auth: "user"` and are RLS-scoped.
- `POST` routes use `auth: "secret"` and use `ctx.supabaseAdmin` for upserts.
- Never commit real secrets.
