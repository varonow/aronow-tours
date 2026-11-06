/* ============================================
   RACHCATION ARCHIVE — auth over the shared Aronow Tours hub
   Classic (non-module) script. Keeps the original page API
   (supabaseClient, requireAuth, getGuest, signOut) but signs in
   through the hub and reads the read-only rach_* tables.
   ============================================ */
const AT_SCRIPT = document.currentScript;
const ROOT = new URL('../../', AT_SCRIPT.src).href;   // .../rachcation/js/supabase.js -> site root

const SUPABASE_URL = 'https://wqwdigwfowywsyjswjds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ghdMhXPgLJTVjKl0AcvnlQ_jXK_uUXQ';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const TRIP = 'rachcation';
const PHOTO_BUCKET = 'rachcation-photos';

function nextPath() {
  const p = location.pathname, i = p.indexOf('/rachcation/');
  return 'rachcation/' + (i >= 0 ? p.slice(i + '/rachcation/'.length) : '');
}

let _member = null;

// Signed in AND on the Rachcation list, or bounce to the hub.
async function requireAuth() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = ROOT + 'login.html?next=' + encodeURIComponent(nextPath());
    return null;
  }
  const { data: mem } = await supabaseClient.from('trip_members')
    .select('name, is_admin').eq('trip_slug', TRIP).maybeSingle();
  if (!mem) { window.location.href = ROOT + 'index.html?denied=' + TRIP; return null; }
  _member = mem;
  return session;
}

// The archive shows the whole trip to everyone: every event, the hotel,
// both days of outfits. So the "guest" is the viewer with every box ticked.
async function getGuest() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session || !_member) return null;
  return {
    id: null,
    name: _member.name || 'there',
    email: (session.user.email || '').toLowerCase(),
    is_admin: false,
    attending_brunch: true, attending_hunt: true, attending_dinner: true,
    attending_improv: true, attending_dance: true, attending_lunch: true,
    hotel_stay: true
  };
}

// Short-lived links to the private photo bucket.
async function signedUrls(paths, seconds) {
  const out = {};
  for (let i = 0; i < paths.length; i += 200) {
    const chunk = paths.slice(i, i + 200);
    const { data } = await supabaseClient.storage.from(PHOTO_BUCKET)
      .createSignedUrls(chunk, seconds || 21600);
    (data || []).forEach(d => { if (d.signedUrl) out[d.path] = d.signedUrl; });
  }
  return out;
}

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = ROOT + 'login.html';
}
