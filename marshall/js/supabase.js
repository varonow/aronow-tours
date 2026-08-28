/* Marshall's Way — thin compatibility layer over the shared Aronow Tours auth.
   Keeps the old page API (requireAuth / getCurrentUser / getCurrentEmoji /
   signOut / db) but backs it with hub-wide magic-link auth + trip gating. */
export * from '../../js/supabase.js';
import { requireTripAccess, myProfile, signOut as hubSignOut } from '../../js/supabase.js';

const TRIP = 'marshall';

function currentNext() {
  const p = location.pathname;
  const i = p.indexOf('/marshall/');
  const rest = i >= 0 ? p.slice(i + '/marshall/'.length) : '';
  return 'marshall/' + rest;               // return here after sign-in
}

// Old API: gate the page. Now = signed-in AND a member of this trip.
export async function requireAuth() {
  const access = await requireTripAccess(TRIP, currentNext());
  if (!access) return null;
  try {
    const prof = await myProfile();
    localStorage.setItem('mw_user',  access.name || (prof && prof.name) || 'Guest');
    localStorage.setItem('mw_emoji', (prof && prof.emoji) || '\u{1F464}');
  } catch (e) {}
  return access.user;
}

export function getCurrentUser()  { return localStorage.getItem('mw_user'); }
export function getCurrentEmoji() { return localStorage.getItem('mw_emoji') || '\u{1F464}'; }

export async function signOut() {
  localStorage.removeItem('mw_user');
  localStorage.removeItem('mw_emoji');
  await hubSignOut();
}
