/* Thanks & Caicos — shared page start-up: sign-in check, menu, and "who am I". */
import { db, requireAuth } from './supabase.js';
import { renderNav } from './nav.js';
export { db };

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const DAYS = [
  { iso: '2026-11-22', label: 'Sunday, Nov 22',    short: 'Sun Nov 22' },
  { iso: '2026-11-23', label: 'Monday, Nov 23',    short: 'Mon Nov 23' },
  { iso: '2026-11-24', label: 'Tuesday, Nov 24',   short: 'Tue Nov 24' },
  { iso: '2026-11-25', label: 'Wednesday, Nov 25', short: 'Wed Nov 25' },
  { iso: '2026-11-26', label: 'Thursday, Nov 26',  short: 'Thu Nov 26' },
  { iso: '2026-11-27', label: 'Friday, Nov 27',    short: 'Fri Nov 27' },
  { iso: '2026-11-28', label: 'Saturday, Nov 28',  short: 'Sat Nov 28' },
  { iso: '2026-11-29', label: 'Sunday, Nov 29',    short: 'Sun Nov 29' },
];
export const dayLabel = iso => (DAYS.find(d => d.iso === iso) || {}).label || iso;

// Today's date on the island (Turks & Caicos keeps New York time).
export function islandToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
}

export function names(list) {
  const a = list.filter(Boolean);
  if (a.length <= 1) return a.join('');
  return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
}

export async function start(page) {
  const user = await requireAuth();
  if (!user) return null;
  renderNav(page);
  const [who, ppl] = await Promise.all([
    db.rpc('turks_whoami'),
    db.from('turks_people').select('*').order('sort'),
  ]);
  const people = ppl.data || [];
  const byId = Object.fromEntries(people.map(p => [p.id, p]));
  const w = who.data || {};
  const me = byId[w.id] || null;
  const kids = me ? people.filter(p => (p.parents || []).includes(me.id)) : [];
  document.body.classList.add('ready');
  return { user, me, kids, littleKids: kids.filter(k => !k.can_login), people, byId, isAdmin: !!w.is_admin, unsealed: !!w.unsealed };
}

export const FOOTER = `<footer><div class="f-name">Thanks &amp; Caicos</div>Four Generations &middot; One Island &middot; Thanksgiving 2026</footer>`;
