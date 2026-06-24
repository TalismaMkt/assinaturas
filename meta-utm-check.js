#!/usr/bin/env node

const token = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.AD_ACCOUNT_ID;
const apiVersion = process.env.META_API_VERSION || 'v23.0';
const base = `https://graph.facebook.com/${apiVersion}`;

if (!token || !adAccountId) {
  console.error('Uso: META_ACCESS_TOKEN=... AD_ACCOUNT_ID=act_... node meta-utm-check.js');
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
    const campaigns = await call(`/${act}/campaigns`, {
      fields: 'id,name,status,effective_status',
      limit: 20,
    });

    const activeCampaigns = (campaigns.data || []).filter(c => c.effective_status === 'ACTIVE');
    const ids = activeCampaigns.map(c => c.id).join(',');
    if (!ids) {
      console.log(JSON.stringify({ activeCampaigns: [] }, null, 2));
      return;
    }

    const details = await call('/', {
      ids,
      fields: 'name,adsets.limit(50){id,name,effective_status,destination_type,promoted_object,attribution_spec},ads.limit(50){id,name,effective_status,adset{id,name},creative{id,url_tags,object_story_spec,asset_feed_spec,object_url,link_url}}'
    });

    console.log(JSON.stringify(details, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
