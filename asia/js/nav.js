import { getCurrentUser, signOut } from './supabase.js';

export const NAV_ITEMS = [
  { label: 'Home', desc: 'Countdown & overview', href: 'index.html', icon: '\u{1F3E0}' },
  { label: 'Flights', desc: 'All four flights', href: 'index.html#flights', icon: '\u2708\uFE0F' },
  { label: 'Itinerary', desc: 'Day by day, all three cities', href: 'itinerary.html', icon: '\u{1F5D3}\uFE0F' },
  { label: 'Hotels', desc: 'Where we stay each night', href: 'hotels.html', icon: '\u{1F3E8}' },
  { label: 'What to Wear', desc: 'Cold Seoul to tropical Phuket', href: 'wear.html', icon: '\u{1F9E5}' },
  { label: 'Things to Know', desc: 'Money \u00b7 manners \u00b7 jet lag', href: 'know.html', icon: '\u{1F4A1}' },
  { label: 'Weather', desc: 'Live forecast, all three stops', href: 'weather.html', icon: '\u{1F324}\uFE0F' },
  { label: 'Maps', desc: 'The journey \u00b7 city by city', href: 'maps.html', icon: '\u{1F5FA}\uFE0F' },
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
      <a href="index.html" class="nav-logo"><img src="images/logo.png" alt="Asia Adventure"><span class="nav-logo-text">Asia <b>Adventure</b></span></a>
      <div class="nav-user"><span>${user || 'Guest'}</span></div>
    </div></nav>
    <div class="nav-overlay" id="navOverlay" onclick="closeDrawer()"></div>
    <div class="nav-drawer" id="navDrawer">
      <div class="drawer-header"><div>
        <div class="drawer-user-name">${user || 'Guest'}</div>
        <div class="drawer-user-sub">Asia Adventure</div></div></div>
      <nav class="drawer-nav">${items}</nav>
      <div class="drawer-footer"><button class="drawer-signout" onclick="handleSignOut()">\u{1F6AA} \u00a0 Sign Out</button></div>
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
