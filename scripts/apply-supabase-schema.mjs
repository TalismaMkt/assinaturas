import fs from 'node:fs/promises';
import path from 'node:path';

const envPath = path.resolve('.env.local');
const sqlPath = path.resolve('supabase-signatures-schema.sql');

const envRaw = await fs.readFile(envPath, 'utf8');
for (const line of envRaw.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx);
  const value = trimmed.slice(idx + 1);
  process.env[key] = value;
}

const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

if (!url || !secret) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY');
}

const sql = await fs.readFile(sqlPath, 'utf8');
const endpoint = `${url}/rest/v1/rpc/exec_sql`;

const res = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    apikey: secret,
    Authorization: `Bearer ${secret}`,
  },
  body: JSON.stringify({ sql }),
});

const text = await res.text();
console.log('STATUS', res.status);
console.log(text);
if (!res.ok) process.exit(1);
