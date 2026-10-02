import { getCurrentUser, signOut } from './supabase.js?v=15';

export const NAV_ITEMS = [
  { label: 'Home',        desc: 'Countdown and your trip',        href: 'index.html',     icon: '\u{1F3E0}' },
  { label: 'Estate map',  desc: 'Find your way around Emara',     href: 'map.html',       icon: '\u{1F5FA}️' },
  { label: 'Itinerary',   desc: 'Day by day',                     href: 'itinerary.html', icon: '\u{1F5D3}️' },
  { label: 'Rooms',       desc: 'Who is staying where',           href: 'rooms.html',     icon: '\u{1F6CF}️' },
  { label: 'Flights',     desc: 'Your flights and airport rides', href: 'flights.html',   icon: '✈️' },
  { label: 'Menus',       desc: 'Breakfast, lunch and dinner',    href: 'menus.html',     icon: '\u{1F37D}️' },
  { label: 'Sign-ups',    desc: 'Massage, tennis, swim, basketball', href: 'signups.html', icon: '\u{1F4DD}' },
  { label: 'Thankful',    desc: 'Your Thanksgiving message',      href: 'thankful.html',  icon: '\u{1F983}' },
  { label: 'Nannies',     desc: 'Who is with which children',     href: 'nannies.html',   icon: '\u{1F9F8}' },
  { label: 'Weather',     desc: 'Live forecast for Turtle Tail',  href: 'weather.html',   icon: '☀️' },
  { label: 'Contacts',    desc: 'Who to call',                    href: 'contacts.html',  icon: '\u{1F4DE}' },
];

export function renderNav(activePage = '') {
  const user = getCurrentUser();
  const items = NAV_ITEMS.map(item => {
    const isActive = item.href === activePage ? 'active' : '';
    return `<a href="${item.href}" class="drawer-item ${isActive}">
      <span class="drawer-item-icon">${item.icon}</span>
      <div><div class="drawer-item-label">${item.label}</div>
      <div class="drawer-item-desc">${item.desc}</div></div></a>`;
  }).join('');

  const navHTML = `
    <nav class="nav"><div class="nav-inner">
      <button class="nav-hamburger" id="hamburger" onclick="toggleDrawer()" aria-label="Menu"><span></span><span></span><span></span></button>
      <a href="index.html" class="nav-logo">THANKS &amp; CAICOS</a>
      <div class="nav-user">${user || ''}</div>
    </div></nav>
    <div class="nav-overlay" id="navOverlay" onclick="closeDrawer()"></div>
    <div class="nav-drawer" id="navDrawer">
      <div class="drawer-header">
        <div class="drawer-user-name">${user || 'Welcome'}</div>
        <div class="drawer-user-sub">Thanks &amp; Caicos</div></div>
      <nav class="drawer-nav">${items}</nav>
      <div class="drawer-footer">
        <a class="drawer-hub" href="../index.html">\u{1F9ED} &nbsp; All Aronow Tours trips</a>
        <button class="drawer-signout" onclick="handleSignOut()">\u{1F6AA} &nbsp; Sign out</button></div>
    </div>
    <div class="nav-spacer"></div>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  if ('serviceWorker' in navigator) {
    try { navigator.serviceWorker.register('service-worker.js'); } catch (e) {}
  }
}

window.toggleDrawer = function() {
  document.getElementById('navDrawer').classList.toggle('open');
  document.getElementById('navOverlay').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
};
window.closeDrawer = function() {
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
};
window.handleSignOut = async function() { await signOut(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeDrawer(); });
document.addEventListener('click', e => { if (e.target.closest('.drawer-item')) window.closeDrawer(); });
