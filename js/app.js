/* =========================
   TechFlow Dashboard — JS puro
   ========================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- 1. TEMA (Light | Dark | System) ---------- */
const THEME_KEY = 'techflow-theme';
const mq = matchMedia('(prefers-color-scheme: dark)');

function getThemePref() {
  try { return localStorage.getItem(THEME_KEY) || 'system'; } catch { return 'system'; }
}
function applyTheme(pref) {
  const dark = pref === 'dark' || (pref === 'system' && mq.matches);
  document.documentElement.classList.toggle('dark', dark);
}
function setTheme(pref) {
  try { localStorage.setItem(THEME_KEY, pref); } catch {}
  applyTheme(pref);
}

const savedTheme = getThemePref();
$(`input[name="theme"][value="${savedTheme}"]`).checked = true;
applyTheme(savedTheme);
$$('input[name="theme"]').forEach((r) => r.addEventListener('change', () => setTheme(r.value)));
// No modo System, acompanha mudanças do sistema em tempo real
mq.addEventListener('change', () => { if (getThemePref() === 'system') applyTheme('system'); });

/* ---------- 2. SIDEBAR MOBILE ---------- */
const sidebar = $('#sidebar');
const overlay = $('#overlay');
function toggleSidebar(open) {
  sidebar.classList.toggle('-translate-x-full', !open);
  overlay.classList.toggle('hidden', !open);
}
$('#openSidebar').addEventListener('click', () => toggleSidebar(true));
$('#closeSidebar').addEventListener('click', () => toggleSidebar(false));
overlay.addEventListener('click', () => toggleSidebar(false));

/* ---------- 3. DROPDOWN DO USUÁRIO ---------- */
const userBtn = $('#userBtn');
const userMenu = $('#userMenu');
function toggleUserMenu(open) {
  userMenu.classList.toggle('hidden', !open);
  userBtn.setAttribute('aria-expanded', String(open));
}
userBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleUserMenu(userMenu.classList.contains('hidden'));
});
document.addEventListener('click', (e) => { if (!userMenu.contains(e.target)) toggleUserMenu(false); });
