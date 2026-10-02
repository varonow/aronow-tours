import { getCurrentUser, signOut } from './supabase.js?v=1';

export const NAV_ITEMS = [
  { label: 'Home',      desc: 'Countdown, flights, hotel, car',   href: 'index.html',     icon: '\u{1F3E0}' },
  { label: 'Schedule',  desc: 'Every showroom, day by day',       href: 'schedule.html',  icon: '\u{1F5D3}️' },
  { label: 'Buy List',  desc: 'Photos of what we are considering', href: 'buylist.html',  icon: '\u{1F4F8}' },
  { label: 'Map',       desc: 'Where each building is',           href: 'map.html',       icon: '\u{1F4CD}' },
  { label: 'Checklist', desc: 'Before we go',                     href: 'checklist.html', icon: '✅' },
  { label: 'Contacts',  desc: 'Confirmations and who to call',    href: 'contacts.html',  icon: '\u{1F4DE}' },
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
      <a href="index.html" class="nav-logo">HIGH POINT</a>
      <div class="nav-user">${user || ''}</div>
    </div></nav>
    <div class="nav-overlay" id="navOverlay" onclick="closeDrawer()"></div>
    <div class="nav-drawer" id="navDrawer">
      <div class="drawer-header">
        <div class="drawer-user-name">${user || 'Welcome'}</div>
        <div class="drawer-user-sub">High Point Market</div></div>
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
