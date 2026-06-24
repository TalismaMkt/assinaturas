#!/usr/bin/env node

const baseUrl = process.env.ACTIVECAMPAIGN_API_URL;
const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;
const listName = process.env.LIST_NAME;

if (!baseUrl || !apiKey || !listName) {
  console.error('Uso: ACTIVECAMPAIGN_API_URL=... ACTIVECAMPAIGN_API_KEY=... LIST_NAME=... node activecampaign-list-check.js');
  process.exit(1);
}

const base = baseUrl.replace(/\/$/, '');

async function call(path, params = {}) {
  const url = new URL(`${base}/api/3/${path.replace(/^\//, '')}`);
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, { headers: { 'Api-Token': apiKey, 'Accept': 'application/json' } });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status} ${res.statusText} :: ${text.slice(0, 400)}`);
  return json;
}

(async () => {
  try {
    const lists = await call('/lists', { limit: 100 });
    const list = (lists.lists || []).find(l => (l.name || '').toLowerCase() === listName.toLowerCase());
    if (!list) {
      console.error('Lista não encontrada.');
      process.exit(1);
    }

    const contacts = await call('/contacts', { limit: 10, listid: list.id, 'orders[cdate]': 'DESC' });
    const automations = await call('/automations', { limit: 100 });

    const result = {
      list: {
        id: list.id,
        name: list.name,
        stringid: list.stringid,
        active: list.active,
        subscriber_count: list.subscriber_count,
        cdate: list.cdate,
      },
      recentContacts: contacts.contacts || [],
      automations: (automations.automations || []).map(a => ({
        id: a.id,
        name: a.name,
        status: a.status,
      })),
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
