/* High Point Market — shared page start-up: sign-in check and menu. */
import { db, requireAuth, getCurrentUser } from './supabase.js?v=2';
import { renderNav } from './nav.js?v=2';
export { db };

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// High Point keeps New York time.
export function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
}
export const mapUrl = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

export async function start(page) {
  const user = await requireAuth();
  if (!user) return null;
  renderNav(page);
  document.body.classList.add('ready');
  return { user, name: getCurrentUser() || 'Guest' };
}

let infoCache = null;
export async function logistics() {
  if (infoCache) return infoCache;
  const { data } = await db.from('highpoint_info').select('data').eq('key', 'logistics').maybeSingle();
  infoCache = (data && data.data) || null;
  return infoCache;
}

export const FOOTER = `<footer><div class="f-name">High Point Market</div>Fall 2026 &middot; October 18&ndash;21</footer>`;
