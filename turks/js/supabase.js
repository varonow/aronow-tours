/* Thanks & Caicos — thin layer over the shared Aronow Tours auth.
   Same pattern as asia/marshall/scotland: hub-wide sign-in + trip gating. */
export * from '../../js/supabase.js';
import { requireTripAccess, myProfile, signOut as hubSignOut } from '../../js/supabase.js';

const TRIP = 'turks';

function currentNext() {
  const p = location.pathname;
  const i = p.indexOf('/turks/');
  const rest = i >= 0 ? p.slice(i + '/turks/'.length) : '';
  return 'turks/' + rest;
}

export async function requireAuth() {
  const access = await requireTripAccess(TRIP, currentNext());
  if (!access) return null;
  try {
    const prof = await myProfile();
    localStorage.setItem('turks_user', access.name || (prof && prof.name) || 'Guest');
  } catch (e) {}
  return access.user;
}

export function getCurrentUser() { try { return localStorage.getItem('turks_user'); } catch (e) { return null; } }

export async function signOut() {
  try { localStorage.removeItem('turks_user'); } catch (e) {}
  await hubSignOut();
}
