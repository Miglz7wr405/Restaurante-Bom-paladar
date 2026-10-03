# Bom Paladar — Restaurante & Bar

Site do Bom Paladar (Rua Robert Mugabe, Quelimane). React 18 + Vite + TypeScript (strict) + Tailwind CSS + Framer Motion + GSAP ScrollTrigger.

## Começar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build em http://localhost:4173
```

O site tem duas páginas (Vite multi-page): a página inicial (`index.html`) e o menu completo em `/menu/` (`menu/index.html`). O build gera também `sitemap.xml`, `robots.txt`, meta tags/Open Graph por página e o JSON-LD `Restaurant` (morada, horário, menu completo) a partir de `src/content` (ver `seo.plugin.ts`).

## Página do menu (`/menu/`)

- Duas formas de ver, com o botão **Cartões | Cardápio** (a escolha fica no URL: `/menu/?vista=cardapio`):
  - **Cartões**: grelha de cartões, com foto quando existe.
  - **Cardápio**: lista clássica preto e dourado, como o menu impresso.
- Barra de categorias fixa (marca a secção atual), pesquisa sem acentos ("camarao" encontra "Camarão") e botão **Imprimir / PDF** (imprime o Cardápio em A4, fundo branco).
- Links diretos para secções: `/menu/#pizzas`, `/menu/#mariscos`, etc.

## Editar conteúdo

Todo o conteúdo editável está em `src/content/` (tipado em `types.ts`):

| Ficheiro | O quê |
| --- | --- |
| `restaurant.ts` | Nome, morada, telefone/WhatsApp, horário, redes sociais, domínio do site |
| `menu.ts` | Menu completo: 16 secções, 135 itens (nome, descrição, preço em MT; `price` vazio = "Consultar") |
| `photos.ts` | Catálogo de fotos dos pratos |
| `home.ts` | Slides do hero, categorias, prato do mês, destaques, separadores "Os mais pedidos", promoções, take-away, equipa, novidades |

### Fotografias

As fotos dos pratos estão em `public/images/dishes/` e são ligadas aos pratos em `src/content/photos.ts`:

- **16 fotos de estúdio geradas com IA** (Lovable, 1024 px, fundo preto): 6 pizzas, 4 massas, 2 lasanhas, mariscada, carne grelhada, mojito e piña colada. Servidas em 512 e 1024 px.
- **3 fotos reais** recortadas de fotos publicadas no Google Maps pelo cliente Arsénio Iade: asinhas crocantes, pão de alho recheado e ½ frango grelhado. Aparecem com o crédito "Foto: Arsénio Iade (Google Maps)". **Recomenda-se pedir-lhe autorização** ou substituí-las por fotos do restaurante.

Os pratos sem foto aparecem como cartão de texto (vista Cartões); os cocktails sem foto mostram a ilustração SVG da marca. Para adicionar ou trocar uma foto:

1. Coloque `<nome>-512.webp`, `<nome>-512.jpg`, `<nome>-1024.webp` e `<nome>-1024.jpg` em `public/images/dishes/`.
2. Adicione `<chave>: dish('<nome>')` em `src/content/photos.ts`.
3. No prato (`menu.ts` / `home.ts`), use `photo: photos.<chave>` dentro de `visual`.

As imagens são servidas como WebP com fallback JPG, `loading="lazy"`, `decoding="async"` e dimensões explícitas (sem CLS).

## Por confirmar com o restaurante

- **Fotos**: as fotos de estúdio foram geradas com IA; idealmente substituir por fotos reais dos pratos. Pedir autorização ao autor das 3 fotos do Google Maps.
- **Nomes corrigidos** (as imagens do menu recebidas foram ampliadas com IA, que alterou algumas palavras): Dorrada → Dobrada, Girouipa → Garoupa, Atum brasrado → Atum braseado, Pato malal → Arroz de Pato, Macapaza → Matapa, Mousse de Marambé → Mousse de Malambe, Camarão alinho → Camarão ao alho, Bacalhau à "Zonas de Sé" → à Zé do Pipo, Galinha "caprão/caprina" → Galinha cafreal, "mabo de vaca" (tábuas) → lombo de vaca, Something "Meating" → Meeting (como no menu novo); as duas linhas "Galinha … à pastora" foram juntadas numa só.
- **Nomes que ficaram como estavam, por confirmar**: Congue, Xima Caracata, Xatiné c/ Maço (aparece em Guarnições a 150 MT e em Aves a 1.500 MT), Peixe Peru, Camarão Tô, Frango à Mamãe. Também se retiraram textos ilegíveis entre parênteses (petiscos "Carne de vaca" e "Galinha caipira", "Bife à Milanesa").
- **Preços**: Massas & Lasanhas vêm da imagem antiga em baixa resolução (não vieram no envio novo). Os Shots não têm preço no menu ("Consultar").
- **Cocktails**: confirmados com a imagem nítida do menu de cocktails (preços e ingredientes).
- **Restante carta de bebidas** (águas, refrigerantes, sumos, cafetaria, cervejas, vinhos, espumantes, whisky, aguardentes, licores): as páginas recebidas eram ilegíveis; o site mostra só uma nota. Enviar fotos nítidas para as acrescentar.
- **Hora de abertura e dias**: só a hora de fecho (00:00) está confirmada. Preencher `opens` em `restaurant.ts`; até lá o site mostra "Aberto até às 00:00" e o JSON-LD omite o horário.
- **WhatsApp**: reservas e newsletter abrem uma mensagem para `+258 87 185 4417`. Confirmar que o número tem WhatsApp.
- **Facebook / Instagram**: adicionar os links em `socials` (vazios não aparecem).
- **Equipa e novidades**: textos provisórios; substituir por nomes/fotos e notícias reais.
- **Domínio**: `siteUrl` em `restaurant.ts` (usado no canonical, OG e sitemap).

## Vídeo publicitário (`video/`)

Anúncio de ~68 s em dois formatos: **9:16** (1080×1920, Reels/TikTok/Status) e **16:9** (1920×1080, YouTube/Facebook). É motion design em HTML/CSS/GSAP, renderizado frame a frame (30 fps) com o Chromium do Playwright. Locução energética contínua (voz "Nassif", ElevenLabs `eleven_v3`), música afro-house e efeitos sonoros.

Ordem do vídeo, conduzida pela voz:
1. Logótipo e "O sabor que Quelimane adora!".
2. Morada, horário e ★ 4,3 no Google.
3. **Pratos com nome e preço lidos pela voz e mostrados no ecrã quando são ditos:**
   - Pizza Double Stack e Pizza Seafood
   - Tagliatelle Carbonara e Lasanha
   - Aparelhada de mariscos
   - Bife grelhado e ½ galinha cafreal
   - Petiscos
   - Mojito e Piña Colada
4. 135 pratos e bebidas no menu do site.
5. O website, com a reserva preenchida.
6. Final com WhatsApp (número lido pela voz) e **RESERVE JÁ**.

Vários pratos entram "do cardápio para a mesa": aparece o cardápio impresso real, a linha do prato fica destacada e a câmara faz zoom até ao prato.

O guião, os tempos de cada prato e de cada preço estão em `video/scripts/build-timeline.cjs` (`BLOCKS`).

| Ficheiro | O quê |
| --- | --- |
| `video/timeline.json` | Fonte única: cenas alinhadas à batida, tempo de cada fala e de cada efeito (gerado) |
| `video/comp/` | A composição (`index.html?format=9x16` ou `16x9`), com `comp.seek(t)` determinístico |
| `video/scripts/beats.py` | Deteta o BPM e a grelha de batidas da música |
| `video/scripts/build-timeline.cjs` | Guião e marcas de tempo; gera o `timeline.json` (blocos de voz seguidos, cenas, preços) e estende a música |
| `video/scripts/capture-site.cjs` | Grava o site frame a frame com relógio falso (desktop 1440×900 e mobile 390×844) |
| `video/scripts/render.cjs` | Renderiza os frames da composição (vários workers) |
| `video/scripts/mix.cjs` | Mistura voz + música (com ducking) + efeitos, normaliza a −14 LUFS / −1 dBTP |
| `video/scripts/encode.sh` | Junta frames e áudio num MP4 H.264/AAC (máximo, HD < 30 MB e leve) e tira a capa |

Os ficheiros de áudio, as gravações do site e os renders não estão no Git (`video/assets/`, `video/out/`). Para voltar a renderizar, coloque o áudio em `video/assets/audio/` (`vo2/b01..b10.mp3`, `music/music.mp3`, `sfx/*.mp3`), as fotos em `video/assets/photos/` e os cardápios em `video/assets/menu/board1..4.jpg`, e depois:

```bash
npm run build && npx vite preview &           # site em http://localhost:4173
cd video && npm install
export NODE_PATH=$(npm root -g)               # Playwright instalado globalmente
node scripts/capture-site.cjs                 # gravações do site
node scripts/build-timeline.cjs
node scripts/render.cjs --format 9x16 --workers 4
node scripts/render.cjs --format 16x9 --workers 4
node scripts/mix.cjs
bash scripts/encode.sh 9x16 && bash scripts/encode.sh 16x9
```

**Licença do áudio:** a voz, a música e os efeitos foram gerados numa conta ElevenLabs. Para uso comercial (anúncios pagos), a conta tem de estar num plano pago no momento da geração. Se o áudio foi gerado no plano gratuito, gere-o de novo depois do upgrade e volte a correr `build-timeline`, `render`, `mix` e `encode`.

## Estrutura

```
src/
  components/
    layout/    AppShell, Navbar, Footer
    sections/  Hero, Categories, DishOfMonth, Featured, PopularMenu, Promos,
               Takeaway, Team, Reservation, News, Newsletter
    menu/      MenuHero, MenuToolbar, MenuCardsView, MenuListView
    ui/        Button, Tabs, Reveal, SectionHeading, Visual, DishArt, DishThumb, Decoration, Icon, Logo
  pages/       MenuPage (entrada: menu-main.tsx)
  hooks/       useScrolled
  lib/         motion (variantes), validation, menuSearch
  styles/      index.css
  content/     dados tipados
```

## Animações e acessibilidade

- Entradas `fade + translateY(24px)` com stagger de 80 ms, uma só vez por secção (Framer Motion).
- Hero: carrossel com `AnimatePresence` (700 ms), autoplay de 5 s, pausa no hover/foco e botão de pausa; parallax de 3 camadas com GSAP ScrollTrigger (carregado de forma lazy, fora do bundle inicial).
- Cards com `scale(1.03)` + sombra em 200 ms `ease-out`; botões com fundo a deslizar.
- `prefers-reduced-motion`: sem autoplay, sem parallax, animações CSS desligadas, transforms do Framer desativados.
- HTML semântico, skip link, `aria-label` nas navs, tabs com setas do teclado, foco visível, erros de formulário associados aos campos.

Tokens da marca (cores, fontes, espaçamentos, sombras) em `tailwind.config.ts`.
