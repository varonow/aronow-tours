/* High Point Market — thin layer over the shared Aronow Tours auth (same pattern as turks/asia). */
export * from '../../js/supabase.js';
import { requireTripAccess, myProfile, signOut as hubSignOut } from '../../js/supabase.js';

const TRIP = 'highpoint';

function currentNext() {
  const p = location.pathname;
  const i = p.indexOf('/highpoint/');
  const rest = i >= 0 ? p.slice(i + '/highpoint/'.length) : '';
  return 'highpoint/' + rest + location.search;
}

export async function requireAuth() {
  const access = await requireTripAccess(TRIP, currentNext());
  if (!access) return null;
  try {
    const prof = await myProfile();
    localStorage.setItem('highpoint_user', access.name || (prof && prof.name) || 'Guest');
  } catch (e) {}
  return access.user;
}

export function getCurrentUser() { try { return localStorage.getItem('highpoint_user'); } catch (e) { return null; } }

export async function signOut() {
  try { localStorage.removeItem('highpoint_user'); } catch (e) {}
  await hubSignOut();
}
