/* ============================================
   SCOTLAND — auth over the shared Aronow Tours hub
   Classic (non-module) script. Backs the original
   page API with hub-wide magic-link auth + trip gate.
   ============================================ */
const AT_SCRIPT = document.currentScript;
const ROOT = new URL('../../', AT_SCRIPT.src).href;   // .../scotland/js/supabase.js -> site root

const SUPABASE_URL = 'https://wqwdigwfowywsyjswjds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ghdMhXPgLJTVjKl0AcvnlQ_jXK_uUXQ';
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const TRIP = 'scotland';
const GUEST_EMAIL = 'varonow@yahoo.com';

function nextPath() {
  const p = location.pathname, i = p.indexOf('/scotland/');
  return 'scotland/' + (i >= 0 ? p.slice(i + '/scotland/'.length) : '');
}
function LOGIN_URL() { return ROOT + 'login.html?next=' + encodeURIComponent(nextPath()); }

/* ---------- SHARED NAVIGATION (unchanged) ---------- */
const NAV_ITEMS = [
  { href: 'index.html',           emoji: '🏰', label: 'Home' },
  { href: 'airport-swap.html',    emoji: '👕', label: 'Airport Swap' },
  { href: 'index.html#flights',   emoji: '✈️', label: 'Flights' },
  { href: 'index.html#hotels',    emoji: '🏨', label: 'Hotels' },
  { href: 'index.html#itinerary', emoji: '📅', label: 'Itinerary' },
  { href: 'guide.html',           emoji: '📍', label: 'Local Guide' },
  { href: 'tips.html',            emoji: '💡', label: 'Travel Tips' },
  { href: 'group.html',           emoji: '👭', label: 'The Girls' },
  { href: 'rooms.html',           emoji: '🛏️', label: 'Room Draw' },
  { href: 'messages.html',        emoji: '💬', label: 'Birthday Messages' },
  { href: 'journal.html',         emoji: '📖', label: 'Journal' },
  { href: 'photos.html',          emoji: '📸', label: 'Photos' },
  { href: 'hunt.html',            emoji: '🔍', label: 'Scavenger Hunt' },
  { href: 'weather.html',         emoji: '🌦️', label: 'Weather' },
  { href: 'packing.html',         emoji: '🧳', label: 'Packing List' }
];

function injectNav() {
  if (document.getElementById('shared-nav')) return;
  const linksHTML = NAV_ITEMS.map(item =>
    `<a href="${item.href}" onclick="setTimeout(closeMenu,50)">${item.emoji} ${item.label}</a>`).join('');
  const navHTML = `
    <div id="shared-nav">
      <div class="nav-bar">
        <button class="hamburger" id="hamburger" onclick="toggleMenu()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-dropdown" id="navDropdown"><div class="nav-dropdown-inner">${linksHTML}</div></div>
      <div class="nav-overlay" id="navOverlay" onclick="closeMenu()"></div>
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);
}
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navDropdown').classList.toggle('open');
  document.getElementById('navOverlay').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navDropdown').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
}

/* ---------- AUTH ---------- */
async function requireAuth() {
  const { data: { user } } = await db.auth.getUser();
  if (!user) { window.location.href = LOGIN_URL(); return null; }
  const { data: mem } = await db.from('trip_members')
    .select('name, is_admin, is_guest').eq('trip_slug', TRIP).maybeSingle();
  if (!mem) { window.location.href = ROOT + 'index.html?denied=scotland'; return null; }
  injectNav(); injectSignOutButton();
  return user;
}

function injectSignOutButton() {
  if (document.getElementById('floating-signout')) return;
  const btn = document.createElement('button');
  btn.id = 'floating-signout'; btn.textContent = 'Sign Out';
  btn.onclick = signOut; document.body.appendChild(btn);
}

async function redirectIfLoggedIn() {
  const { data: { session } } = await db.auth.getSession();
  if (session) window.location.href = ROOT + 'index.html';
}

async function getCurrentUser() {
  const { data: { session } } = await db.auth.getSession();
  return session ? session.user : null;
}

async function getUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await db.from('trip_members')
    .select('name, is_admin, is_guest').eq('trip_slug', TRIP).maybeSingle();
  if (!data) return null;
  return { name: data.name, email: user.email, is_admin: data.is_admin, is_guest: data.is_guest };
}

async function isAdmin() {
  const p = await getUserProfile();
  return p ? !!p.is_admin : false;
}

async function isGuest() {
  const user = await getCurrentUser();
  if (!user) return false;
  if (user.email && user.email.toLowerCase() === GUEST_EMAIL.toLowerCase()) return true;
  const p = await getUserProfile();
  return p ? !!p.is_guest : false;
}

async function signOut() {
  await db.auth.signOut();
  window.location.href = ROOT + 'login.html';
}

/* ---------- SERVICE WORKER (trip-scoped) ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}
