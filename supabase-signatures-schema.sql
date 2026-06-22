create extension if not exists pgcrypto;

create table if not exists public.signature_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'default',
  company_name text,
  site text,
  site_label text,
  address text,
  linkedin text,
  facebook text,
  instagram text,
  whatsapp text,
  youtube text,
  tiktok text,
  logo_url text,
  certificate_url text,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists signature_templates_name_idx
  on public.signature_templates (name);

create table if not exists public.signature_profiles (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  role text not null,
  phone text not null,
  email text not null unique,
  template_id uuid references public.signature_templates(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists signature_profiles_template_id_idx
  on public.signature_profiles (template_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

DROP TRIGGER IF EXISTS set_signature_templates_updated_at ON public.signature_templates;
create trigger set_signature_templates_updated_at
before update on public.signature_templates
for each row execute function public.set_updated_at();

DROP TRIGGER IF EXISTS set_signature_profiles_updated_at ON public.signature_profiles;
create trigger set_signature_profiles_updated_at
before update on public.signature_profiles
for each row execute function public.set_updated_at();

alter table public.signature_templates enable row level security;
alter table public.signature_profiles enable row level security;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'signature_templates' AND policyname = 'Allow authenticated read templates'
  ) THEN
    create policy "Allow authenticated read templates"
      on public.signature_templates
      for select
      to authenticated
      using (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'signature_profiles' AND policyname = 'Allow authenticated read profiles'
  ) THEN
    create policy "Allow authenticated read profiles"
      on public.signature_profiles
      for select
      to authenticated
      using (true);
  END IF;
END $$;
