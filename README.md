# TechFlow Dashboard

Dashboard responsivo da empresa fictícia **TechFlow** (Checkpoint 5 – FrontEnd Design).

## Integrantes
- _Samuel Eduardo Lisboa Etcheverry, RM-573715_

## Tecnologias utilizadas
- HTML5
- Tailwind CSS v4 (via plugin oficial para Vite)
- JavaScript puro (ES Modules)
- Vite (servidor de desenvolvimento e build)

## Principais recursos implementados
- Layout Mobile-First com breakpoints `sm:`, `md:`, `lg:`, `xl:` e `2xl:`
- Navbar, Sidebar (fixa no desktop, off-canvas no mobile), busca e dropdown do usuário
- 4 cards de indicadores e 6 cards de projetos em CSS Grid (`col-span-*` e `row-span-*`)
- Modal de Novo Projeto com validação visual (estados de erro e sucesso)
- Estados `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:` e `peer-checked:`
- Tema **Light | Dark | System** com variante `dark:`, preferência salva no `localStorage`
- Pesquisa que filtra os projetos em tempo real

## Como executar
```bash
npm install
npm run dev
```

## Link do GitHub
- _https://github.com/SamuelEtcheverry/CP5-TechFlow_

## Dificuldades encontradas
- _Encontramos dificuldades para ajustar a responsividade do dashboard em diferentes tamanhos de tela, organizar os cards utilizando CSS Grid e implementar as interações com JavaScript._
