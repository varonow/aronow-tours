/* Asia Adventure — thin compatibility layer over the shared Aronow Tours auth.
   Same pattern as marshall/scotland: hub-wide magic-link auth + trip gating. */
export * from '../../js/supabase.js';
import { requireTripAccess, myProfile, signOut as hubSignOut } from '../../js/supabase.js';

const TRIP = 'asia';

function currentNext() {
  const p = location.pathname;
  const i = p.indexOf('/asia/');
  const rest = i >= 0 ? p.slice(i + '/asia/'.length) : '';
  return 'asia/' + rest;
}

export async function requireAuth() {
  const access = await requireTripAccess(TRIP, currentNext());
  if (!access) return null;
  try {
    const prof = await myProfile();
    localStorage.setItem('asia_user', access.name || (prof && prof.name) || 'Guest');
  } catch (e) {}
  return access.user;
}

export function getCurrentUser() { return localStorage.getItem('asia_user'); }

export async function signOut() {
  localStorage.removeItem('asia_user');
  await hubSignOut();
}
