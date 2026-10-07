/* =========================
   TechFlow Dashboard — JS puro
   ========================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

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
