#!/usr/bin/env node

const token = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.AD_ACCOUNT_ID;
const apiVersion = process.env.META_API_VERSION || 'v23.0';
const base = `https://graph.facebook.com/${apiVersion}`;

if (!token) {
  console.error('Falta META_ACCESS_TOKEN no ambiente.');
  console.error('Uso: META_ACCESS_TOKEN=... node meta-api-test.js');
  console.error('Opcional: AD_ACCOUNT_ID=act_... META_API_VERSION=v23.0');
  process.exit(1);
}

async function call(path, params = {}) {
  const url = new URL(`${base}${path}`);
  url.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok || json.error) {
    const msg = json?.error?.message || res.statusText;
    throw new Error(`${path} -> ${msg}`);
  }
  return json;
}

(async () => {
  try {
    console.log('1) Validando token em /me ...');
    const me = await call('/me', { fields: 'id,name' });
    console.log(JSON.stringify(me, null, 2));

    console.log('\n2) Listando ad accounts em /me/adaccounts ...');
    const accounts = await call('/me/adaccounts', {
      fields: 'id,account_id,name,account_status,currency,timezone_name',
      limit: 25,
    });
    console.log(JSON.stringify(accounts, null, 2));

    const chosen = adAccountId || accounts?.data?.[0]?.id || accounts?.data?.[0]?.account_id;
    if (!chosen) {
      console.log('\nNenhuma ad account encontrada para listar campanhas.');
      process.exit(0);
    }

    const normalized = String(chosen).startsWith('act_') ? String(chosen) : `act_${chosen}`;
    console.log(`\n3) Listando campanhas em /${normalized}/campaigns ...`);
    const campaigns = await call(`/${normalized}/campaigns`, {
      fields: 'id,name,status,objective,effective_status',
      limit: 25,
    });
    console.log(JSON.stringify(campaigns, null, 2));
  } catch (err) {
    console.error('\nErro no teste da Meta API:');
    console.error(err.message);
    process.exit(1);
  }
})();
