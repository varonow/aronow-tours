/* ============================================================
   Aronow Tours — shared Supabase client + auth helpers
   Works at the site root (aronow.tours/) OR a subpath
   (varonow.github.io/aronow-tours/) via import.meta.url.
   ============================================================ */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

export const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// Absolute URL of the site root, computed from this module's own URL.
// js/supabase.js -> parent dir is the site root.
export const ROOT = new URL('../', import.meta.url).href;

export function rootUrl(path) {
  return ROOT + String(path || '').replace(/^\//, '');
}

export async function currentUser() {
  const { data: { user } } = await db.auth.getUser();
  return user || null;
}

// Send a passwordless magic link. `next` is a root-relative path
// (e.g. "scotland/" or "" for the hub) to land on after sign-in.
export async function sendMagicLink(email, next) {
  const redirect = rootUrl('login.html') + '?next=' + encodeURIComponent(next || '');
  const { error } = await db.auth.signInWithOtp({
    email: String(email).trim(),
    options: { emailRedirectTo: redirect, shouldCreateUser: true }
  });
  if (error) throw error;
}

export async function signOut() {
  await db.auth.signOut();
  window.location.href = rootUrl('login.html');
}

// All trips the signed-in user belongs to (RLS returns only their own rows).
export async function myTrips() {
  const { data: mems } = await db
    .from('trip_members')
    .select('trip_slug, name, is_admin, is_guest');
  if (!mems || !mems.length) return [];
  const slugs = mems.map(m => m.trip_slug);
  const { data: trips } = await db
    .from('trips')
    .select('*')
    .in('slug', slugs)
    .eq('is_active', true)
    .order('sort_order');
  const bySlug = {};
  mems.forEach(m => { bySlug[m.trip_slug] = m; });
  return (trips || []).map(t => Object.assign({}, t, { membership: bySlug[t.slug] }));
}

// Require a signed-in user. If absent, bounce to login with a next path.
export async function requireAuth(next) {
  const user = await currentUser();
  if (!user) {
    window.location.href = rootUrl('login.html') + '?next=' + encodeURIComponent(next || '');
    return null;
  }
  db.from('profiles').update({ last_seen: new Date().toISOString() }).eq('id', user.id).then(function(){});
  return user;
}

// Require sign-in AND membership in tripSlug. Returns { user, name, is_admin, is_guest }.
export async function requireTripAccess(tripSlug, nextPath) {
  const user = await requireAuth(nextPath);
  if (!user) return null;
  const { data } = await db
    .from('trip_members')
    .select('trip_slug, name, is_admin, is_guest')
    .eq('trip_slug', tripSlug)
    .maybeSingle();
  if (!data) {
    window.location.href = rootUrl('index.html') + '?denied=' + encodeURIComponent(tripSlug);
    return null;
  }
  return Object.assign({ user: user }, data);
}

// Current user's global profile (name, emoji).
export async function myProfile() {
  const user = await currentUser();
  if (!user) return null;
  const { data } = await db.from('profiles').select('name, emoji').eq('id', user.id).maybeSingle();
  return data || { name: 'Guest', emoji: '\u{1F464}' };
}
