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
  - **Cartões**: grelha de cartões, com foto quando existe. O Buffet mostra primeiro uma galeria com os pratos servidos e depois as 3 opções (1.500, 2.000 e 2.800 MT por pessoa) com tudo o que inclui, prato a prato.
  - **Cardápio**: lista clássica preto e dourado, como o menu impresso.
- Barra de categorias fixa (marca a secção atual), pesquisa sem acentos ("camarao" encontra "Camarão") e botão **Imprimir / PDF** (imprime o Cardápio em A4, fundo branco).
- Links diretos para secções: `/menu/#buffet`, `/menu/#massas`, `/menu/#lasanhas`, `/menu/#cocktails`, `/menu/#vinhos-tintos`, `/menu/#vinhos-brancos`. A pesquisa também procura dentro do conteúdo dos buffets ("feijoada" encontra os 3 buffets).

## Editar conteúdo

Todo o conteúdo editável está em `src/content/` (tipado em `types.ts`):

| Ficheiro | O quê |
| --- | --- |
| `restaurant.ts` | Nome, morada, telefone/WhatsApp, horário, redes sociais, domínio do site |
| `menu.ts` | Menu de outubro de 2026: Buffet (3 opções, com os pratos de cada uma em `groups`), Menu Pasta, Lasanhas, Extras, Sobremesas, Cocktails, Vinhos Tintos, Brancos/Verdes/Rosé, Espumantes, Cerveja à Pressão, Cervejas, Sidras, Espirituosas & Shots, Whisky, Aguardentes/Digestivos/Cognac, Refrigerantes & Sumos e Águas & Cafetaria. 17 secções, 126 itens (nome, descrição, preço em MT; `price` vazio = "Consultar") |
| `photos.ts` | Catálogo de fotos dos pratos |
| `home.ts` | Slides do hero, categorias, prato do mês, destaques, separadores "Os mais pedidos", promoções, take-away, equipa, novidades |

### Fotografias

As fotos dos pratos estão em `public/images/dishes/` e são ligadas aos pratos em `src/content/photos.ts`:

- **Fotos escolhidas pelo cliente na internet** (28): buffet, salgados, bife na panela, galinha à Zambeziana, peixe grelhado, camarão tigre, lulas, lagosta, cabrito, espetada, mucuane, arroz de legumes, sopa de abóbora, mousse, as 3 massas (carbonara, fettuccine, bolonhesa), as 3 lasanhas e 8 cocktails (Margarita, Intense Girl, Caipirinha, Caipirosca, Mojito, Tequila Sunrise, Gin Tónico, Piña Colada). Recortadas em quadrado e servidas em 512 e 1024 px (as de Mucuane, Bolonhesa e Cabrito vieram pequenas, por isso são ampliadas). **Atenção aos direitos de autor**: são fotos de terceiros; o ideal é substituí-las por fotos tiradas no restaurante.
- **Geradas com IA em estilo de foto real** (Lovable, mesa de madeira e restaurante desfocado ao fundo): Feijoada, Putanesca de marisco, Shots, Vinhos, Sexy on the Beach, Blue Lagoon, Blue Hawaii, Caipirinha de Cerveja e Sangria.
- **Timbre**: todas as fotos têm o logótipo "Bom Paladar · Restaurante & Bar" no canto superior direito, um pouco para dentro para não ser cortado nos cartões nem nas molduras redondas.

Os vinhos aparecem como cartão de texto na vista Cartões. Para adicionar ou trocar uma foto:

1. Coloque `<nome>-512.webp`, `<nome>-512.jpg`, `<nome>-1024.webp` e `<nome>-1024.jpg` em `public/images/dishes/`.
2. Adicione `<chave>: dish('<nome>')` em `src/content/photos.ts`.
3. No prato (`menu.ts` / `home.ts`), use `photo: photos.<chave>` dentro de `visual`.

As imagens são servidas como WebP com fallback JPG, `loading="lazy"`, `decoding="async"` e dimensões explícitas (sem CLS).

## Por confirmar com o restaurante

- **Fotos**: as fotos de estúdio foram geradas com IA; idealmente substituir por fotos reais dos pratos.
- **Menu antigo**: substituído pelo menu de outubro de 2026 (buffets, pasta, cocktails e vinhos). Pizzas, à la carte de mariscos, carnes, petiscos, etc. saíram do site.
- **Carta de vinhos, nomes por confirmar**: o cartão impresso tem gralhas e foi interpretado assim: "Mucho Más", "Reguengos", "Segredos de S. Miguel", "Duas Quintas", "Pé Tinto", "Portada", "Quinta da Bolota". Ficaram como se leem, a confirmar: **Cadão** (Novo e Reserva), **Spylano** e **Petusco Verde**. O cartão tem um segundo **Mucho Más a 2.330 MT** (destacado a azul) que não foi incluído; confirmar se é outro vinho.
- **Grafias**: "galinha cafrial" ficou "galinha cafreal" e "Massa Putanesca" ficou como no menu. Os Shots não têm preço no menu ("Consultar").
- **Carta de bebidas e extras**: transcrita da folha "Extras / Sobremesas / Águas / … / Aguardentes". Corrigido: cerveja à pressão em **cl** (a folha diz 20/35/50 ml), "Martin" → Martini, "Castle Double Malte" → Double Malt. As secções de Espirituosas, Whisky e Aguardentes estão marcadas como **Dose** (preço por copo): confirmar.
- **Hora de abertura e dias**: só a hora de fecho (00:00) está confirmada. Preencher `opens` em `restaurant.ts`; até lá o site mostra "Aberto até às 00:00" e o JSON-LD omite o horário.
- **WhatsApp**: reservas e newsletter abrem uma mensagem para `+258 87 062 4564` (o número dos menus novos). Confirmar que o número tem WhatsApp.
- **Facebook / Instagram**: adicionar os links em `socials` (vazios não aparecem).
- **Equipa e novidades**: textos provisórios; substituir por nomes/fotos e notícias reais.
- **Domínio**: `siteUrl` em `restaurant.ts` (usado no canonical, OG e sitemap).

## Vídeo publicitário (`video/`)

Anúncio de ~68 s em dois formatos, feito para o menu de outubro de 2026: **16:9** (1920×1080, YouTube/Facebook) e **9:16** (1080×1920, Reels/TikTok/Status). É motion design em HTML/CSS/GSAP, renderizado frame a frame (30 fps) com o Chromium do Playwright. Locução energética contínua (voz "Dinis", sotaque de Portugal, ElevenLabs `eleven_v3`), música afro-house e efeitos sonoros.

Ordem do vídeo, conduzida pela voz:
1. Logótipo e "O sabor que Quelimane adora!", com uma montagem das fotos do restaurante.
2. Morada, horário e ★ 4,3 no Google.
3. **Pratos com nome e preço lidos pela voz e mostrados no ecrã quando são ditos:**
   - Buffet à vontade a partir de 1.500 MT, Buffet 2.000 e Buffet 2.800
   - O que há no buffet: chamuças, bife na panela, galinha à zambeziana, peixe grelhado e mousse de malambe
   - Tagliatelle Carbonara (950 MT) e Lasanha de carne moída (700 MT)
   - Mojito (300 MT) e Piña Colada (450 MT)
   - Bom Paladar Intense Girl (400 MT) e Tequila Sunrise (500 MT)
4. Os cardápios novos e os 126 pratos e bebidas do menu do site (17 secções).
5. O website, com a reserva preenchida.
6. Final com o WhatsApp 87 062 45 64 (um grupo por batida, no ecrã) e **RESERVE JÁ**.

O Buffet 1.500, o Menu Pasta e os cocktails entram "do cardápio para a mesa": aparece o cardápio impresso real, as linhas do prato ficam destacadas e a câmara faz zoom até à foto. Todas as fotos são do restaurante.

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

Os ficheiros de áudio, as gravações do site e os renders não estão no Git (`video/assets/`, `video/out/`). Para voltar a renderizar, coloque o áudio em `video/assets/audio/` (`vo4/b01..b10.mp3`, `music/music.mp3`, `sfx/*.mp3`), as fotos em `video/assets/photos/` e os cardápios em `video/assets/menu/` (`buffet-1500`, `pasta`, `cocktails`, `vinhos` e `bebidas`, em `.jpg`), e depois:

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
