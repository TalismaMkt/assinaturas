#!/usr/bin/env node

const token = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.AD_ACCOUNT_ID;
const apiVersion = process.env.META_API_VERSION || 'v23.0';
const datePreset = process.env.DATE_PRESET || 'last_30d';
const base = `https://graph.facebook.com/${apiVersion}`;

if (!token || !adAccountId) {
  console.error('Uso: META_ACCESS_TOKEN=... AD_ACCOUNT_ID=act_... [DATE_PRESET=last_30d] node meta-campaign-insights.js');
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
    const act = String(adAccountId).startsWith('act_') ? String(adAccountId) : `act_${adAccountId}`;
    console.log(`Consultando campanhas de ${act} com insights (${datePreset})...\n`);

    const campaigns = await call(`/${act}/campaigns`, {
      fields: 'id,name,status,objective,effective_status',
      limit: 50,
    });

    const ids = (campaigns.data || []).map(c => c.id).join(',');
    if (!ids) {
      console.log('Nenhuma campanha encontrada.');
      process.exit(0);
    }

    const fields = [
      'name',
      'status',
      'objective',
      'effective_status',
      `insights.date_preset(${datePreset}){spend,impressions,reach,clicks,cpc,ctr,actions,cost_per_action_type}`
    ].join(',');

    const insights = await call('/', { ids, fields });
    console.log(JSON.stringify(insights, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
