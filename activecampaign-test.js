#!/usr/bin/env node

const baseUrl = process.env.ACTIVECAMPAIGN_API_URL;
const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;

if (!baseUrl || !apiKey) {
  console.error('Uso: ACTIVECAMPAIGN_API_URL=... ACTIVECAMPAIGN_API_KEY=... node activecampaign-test.js');
  process.exit(1);
}

const base = baseUrl.replace(/\/$/, '');

async function call(path, params = {}) {
  const url = new URL(`${base}/api/3/${path.replace(/^\//, '')}`);
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, {
    headers: {
      'Api-Token': apiKey,
      'Accept': 'application/json'
    }
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) {
    throw new Error(`${path} -> HTTP ${res.status} ${res.statusText} :: ${text.slice(0, 400)}`);
  }
  return json;
}

(async () => {
  try {
    console.log('1) Validando acesso por /users ...');
    const users = await call('/users', { limit: 5 });
    console.log(JSON.stringify(users, null, 2));

    console.log('\n2) Listando listas...');
    const lists = await call('/lists', { limit: 10 });
    console.log(JSON.stringify(lists, null, 2));

    console.log('\n3) Listando campanhas...');
    const campaigns = await call('/campaigns', { limit: 10 });
    console.log(JSON.stringify(campaigns, null, 2));

    console.log('\n4) Listando automações...');
    const automations = await call('/automations', { limit: 10 });
    console.log(JSON.stringify(automations, null, 2));
  } catch (err) {
    console.error('\nErro no teste do ActiveCampaign:');
    console.error(err.message);
    process.exit(1);
  }
})();
