#!/usr/bin/env node

const token = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.AD_ACCOUNT_ID;
const apiVersion = process.env.META_API_VERSION || 'v23.0';
const base = `https://graph.facebook.com/${apiVersion}`;

if (!token || !adAccountId) {
  console.error('Uso: META_ACCESS_TOKEN=... AD_ACCOUNT_ID=act_... node meta-account-structure.js');
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
    const account = await call(`/${act}`, {
      fields: 'id,name,account_status,currency,timezone_name,business_country_code'
    });

    const campaigns = await call(`/${act}/campaigns`, {
      fields: 'id,name,status,effective_status,objective,buying_type,created_time,start_time,stop_time,daily_budget,lifetime_budget,special_ad_categories',
      limit: 50,
    });

    const campaignIds = (campaigns.data || []).map(c => c.id).join(',');
    let adsets = { data: [] };
    if (campaignIds) {
      adsets = await call('/', {
        ids: campaignIds,
        fields: 'name,adsets.limit(50){id,name,status,effective_status,optimization_goal,billing_event,daily_budget,lifetime_budget,targeting,start_time}'
      });
    }

    const summary = {
      account,
      campaigns: campaigns.data || [],
      adsetsByCampaign: adsets,
    };

    console.log(JSON.stringify(summary, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
