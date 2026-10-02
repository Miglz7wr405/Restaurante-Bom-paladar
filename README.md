# Bom Paladar — Restaurante & Bar

Site do Bom Paladar (Rua Robert Mugabe, Quelimane). React 18 + Vite + TypeScript (strict) + Tailwind CSS + Framer Motion + GSAP ScrollTrigger.

## Começar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build em http://localhost:4173
```

O build gera também `sitemap.xml`, `robots.txt`, meta tags/Open Graph e o JSON-LD `Restaurant` (morada, horário, menu) a partir de `src/content` (ver `seo.plugin.ts`).

## Editar conteúdo

Todo o conteúdo editável está em `src/content/` (tipado em `types.ts`):

| Ficheiro | O quê |
| --- | --- |
| `restaurant.ts` | Nome, morada, telefone/WhatsApp, horário, redes sociais, domínio do site |
| `menu.ts` | Pizzas, massas & lasanhas, cocktails (nome, descrição, preço em MT) |
| `home.ts` | Slides do hero, categorias, prato do mês, destaques, promoções, take-away, equipa, novidades |

### Fotografias

As fotos dos pratos estão em `public/images/dishes/` (fotos de estúdio geradas com IA no Lovable, 1024 px, fundo preto) e são ligadas aos pratos em `src/content/photos.ts`. Cada foto é servida em 512 e 1024 px, em WebP com fallback JPG.

Há 16 fotos: 6 pizzas, 4 massas, 2 lasanhas, mariscada, carne grelhada, mojito e piña colada. Os cocktails sem foto própria (Blue Lagoon, Tequila Sunrise, Intense, Sangria, etc.) mostram a ilustração SVG da marca. Para adicionar ou trocar uma foto:

1. Coloque `<nome>-512.webp`, `<nome>-512.jpg`, `<nome>-1024.webp` e `<nome>-1024.jpg` em `public/images/dishes/`.
2. Adicione `<chave>: dish('<nome>')` em `src/content/photos.ts`.
3. No prato (`menu.ts` / `home.ts`), use `photo: photos.<chave>` dentro de `visual`.

As imagens são servidas como WebP com fallback JPG, `loading="lazy"`, `decoding="async"` e dimensões explícitas (sem CLS).

## Por confirmar com o restaurante

- **Fotos**: as fotos atuais foram geradas com IA a partir do menu; idealmente substituir por fotos reais dos pratos.
- **Preços e nomes**: transcritos de fotos do menu em baixa resolução. Confirmar com o menu físico.
- **Hora de abertura e dias**: só a hora de fecho (00:00) está confirmada. Preencher `opens` em `restaurant.ts`; até lá o site mostra "Aberto até às 00:00" e o JSON-LD omite o horário.
- **Entradas, carnes, mariscos, sobremesas, bebidas**: os itens destas páginas do menu não eram legíveis; as categorias aparecem como "Também no menu completo".
- **WhatsApp**: reservas e newsletter abrem uma mensagem para `+258 87 185 4417`. Confirmar que o número tem WhatsApp.
- **Facebook / Instagram**: adicionar os links em `socials` (vazios não aparecem).
- **Equipa e novidades**: textos provisórios; substituir por nomes/fotos e notícias reais.
- **Domínio**: `siteUrl` em `restaurant.ts` (usado no canonical, OG e sitemap).

## Estrutura

```
src/
  components/
    layout/    Navbar, Footer
    sections/  Hero, Categories, DishOfMonth, Featured, PopularMenu, Promos,
               Takeaway, Team, Reservation, News, Newsletter
    ui/        Button, Tabs, Reveal, SectionHeading, Visual, DishArt, Decoration, Icon, Logo
  hooks/       useScrolled
  lib/         motion (variantes), validation, menuTabs
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
