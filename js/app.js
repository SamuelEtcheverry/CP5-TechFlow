
   const $ = (sel, root = document) => root.querySelector(sel); const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

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
   mq.addEventListener('change', () => { if (getThemePref() === 'system') applyTheme('system'); });
   
   const sidebar = $('#sidebar');
   const overlay = $('#overlay');
   function toggleSidebar(open) {
     sidebar.classList.toggle('-translate-x-full', !open);
     overlay.classList.toggle('hidden', !open);
   }
   $('#openSidebar').addEventListener('click', () => toggleSidebar(true));
   $('#closeSidebar').addEventListener('click', () => toggleSidebar(false));
   overlay.addEventListener('click', () => toggleSidebar(false));
   
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
   
   $('#search').addEventListener('input', (e) => { const q = e.target.value.trim().toLowerCase(); let visible = 0; $$('[data-card]').forEach((card) => { const match = card.textContent.toLowerCase().includes(q); card.classList.toggle('hidden', !match); if (match) visible++; });$('#noResults').classList.toggle('hidden', visible > 0);
   });
   
   const modal = $('#modal');
   const form = $('#projectForm');
   function openModal() {
     modal.classList.remove('hidden');
     modal.classList.add('flex');
     $('#nome').focus();
   }
   function closeModal() {
     modal.classList.add('hidden');
     modal.classList.remove('flex');
     resetForm();
   }
   $('#openModal').addEventListener('click', openModal);
   $('#closeModal').addEventListener('click', closeModal);
   $('#cancelModal').addEventListener('click', closeModal);
   modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
   document.addEventListener('keydown', (e) => {
     if (e.key !== 'Escape') return;
     toggleUserMenu(false);
     toggleSidebar(false);
     if (!modal.classList.contains('hidden')) closeModal();
   });
   
   const rules = {
     nome: (v) => v.trim().length >= 3 || 'Informe ao menos 3 caracteres.',
     responsavel: (v) => v.trim().length >= 3 || 'Informe o nome do responsável.',
     categoria: (v) => v !== '' || 'Selecione uma categoria.',
     prioridade: (v) => v !== '' || 'Selecione a prioridade.',
     prazo: (v) => {
       if (!v) return 'Informe o prazo.';
       const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
       return new Date(v + 'T00:00') >= hoje || 'O prazo não pode estar no passado.';
     },
     descricao: (v) => v.trim().length >= 10 || 'Descreva com ao menos 10 caracteres.',
   };
   
   function validateField(el) {
     const msg = $('[data-msg]', el.parentElement); const result = rules[el.name](el.value); const ok = result === true;    el.classList.toggle('field-error', !ok); el.classList.toggle('field-ok', ok); el.setAttribute('aria-invalid', String(!ok));    msg.textContent = ok ? '✓ Tudo certo' : result; msg.classList.remove('hidden'); msg.classList.toggle('text-emerald-600', ok); msg.classList.toggle('dark:text-emerald-400', ok); msg.classList.toggle('text-red-600', !ok); msg.classList.toggle('dark:text-red-400', !ok); return ok; }  function resetForm() { form.reset(); $$('.field', form).forEach((el) => { el.classList.remove('field-error', 'field-ok'); el.removeAttribute('aria-invalid'); });$$('[data-msg]', form).forEach((m) => m.classList.add('hidden'));$('#formSuccess').classList.add('hidden');
     $('#submitBtn').disabled = false; }  const fields = $$('.field', form);
   fields.forEach((el) => {
     el.addEventListener('blur', () => validateField(el));
     el.addEventListener('input', () => { if (el.classList.contains('field-error')) validateField(el); });
   });
   
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     const results = fields.map(validateField);
     if (results.includes(false)) {
       fields[results.indexOf(false)].focus();
       return;
     }
   
     const data = Object.fromEntries(new FormData(form));
     const card = $('#cardTemplate').content.cloneNode(true);
     $('[data-title]', card).textContent = data.nome;
     $('[data-desc]', card).textContent = data.descricao;
     $('#projectGrid').prepend(card);
   
     const kpi = $('#kpi-ativos');
     kpi.textContent = String(Number(kpi.textContent) + 1);
   
     $('#formSuccess').classList.remove('hidden');
     $('#submitBtn').disabled = true;
     setTimeout(closeModal, 1200);
   });