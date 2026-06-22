export type SignatureTemplateRow = {
  id: string;
  name: string;
  company_name: string | null;
  site: string | null;
  site_label: string | null;
  address: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  whatsapp: string | null;
  youtube: string | null;
  tiktok: string | null;
  logo_url: string | null;
  certificate_url: string | null;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type SignatureProfileRow = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
  email: string;
  template_id: string | null;
  created_at: string;
  updated_at: string;
};
