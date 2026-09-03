---
name: "Ministério Bíblico da Reconciliação"
description: "Luz, acolhimento pastoral e informação verificável em uma experiência azul e dourada."
colors:
  midnight-ink: "#020817"
  sanctuary-navy: "#06132c"
  scenic-cobalt: "#075be8"
  action-blue: "#0744b9"
  reconciliation-gold: "#f3b51b"
  gold-hover: "#ffd259"
  cream-paper: "#f5f1e8"
  reading-white: "#fffefa"
  pure-white: "#ffffff"
  slate-copy: "#536078"
  quiet-line: "#d9d8d0"
  quiet-surface: "#e9e7df"
  navy-copy: "#c7d1e5"
typography:
  display:
    fontFamily: '"Anton", sans-serif'
    fontSize: "clamp(80px, 8vw, 123px)"
    fontWeight: 400
    lineHeight: 1.075
    letterSpacing: "-0.018em"
  headline:
    fontFamily: '"Anton", sans-serif'
    fontSize: "46px"
    fontWeight: 400
    lineHeight: 1.13
  title:
    fontFamily: '"Barlow Condensed", sans-serif'
    fontSize: "27px"
    fontWeight: 600
    lineHeight: 1.18
  action:
    fontFamily: '"Barlow Condensed", sans-serif'
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  compact: "4px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  section: "100px"
components:
  button-gold:
    backgroundColor: "{colors.reconciliation-gold}"
    textColor: "{colors.midnight-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.compact}"
    padding: "11px 28px"
    height: "54px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hover}"
    textColor: "{colors.midnight-ink}"
  button-blue:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.pure-white}"
    typography: "{typography.action}"
    rounded: "{rounded.compact}"
    padding: "11px 28px"
    height: "54px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.action-blue}"
    typography: "{typography.action}"
    rounded: "{rounded.compact}"
    padding: "11px 28px"
    height: "54px"
  field:
    backgroundColor: "{colors.reading-white}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.compact}"
    padding: "11px 13px"
    height: "47px"
  icon-control:
    backgroundColor: "transparent"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
---

# Design System: Ministério Bíblico da Reconciliação

## Overview

**Creative North Star: "Luz que Reconcilia"**

O sistema traduz acolhimento pastoral como uma cena de luz: campos midnight e navy dão profundidade institucional, planos cobalt conduzem o olhar e o dourado marca os momentos de encontro e ação. Em contraste, superfícies off-white desaceleram a experiência para agenda, doutrina, notícias e leitura longa. O resultado é solene sem ser distante, contemporâneo sem perder o caráter comunitário.

A marca oficial e os registros reais da igreja são a autoridade visual. A expressão é editorial e condensada nas chamadas, mas recorre a uma sans de sistema no conteúdo extenso para sustentar legibilidade. O ritmo alterna entradas monumentais com blocos calmos e informativos; não é uma sequência indiscriminada de cartões.

**Key Characteristics:**

- Azul profundo e cobalt como ambiente; dourado como luz e ação.
- Tipografia condensada para voz e hierarquia; sans de sistema para leitura longa.
- Superfícies amplas, cantos compactos e divisores finos.
- Fotografia comunitária real, exibida com enquadramento respeitoso e carregamento seletivo.
- Estados de foco explícitos e movimento reduzido respeitado em toda a experiência.

## Colors

A paleta alterna profundidade azul-noturna e superfícies de leitura quentes, com o dourado reservado para orientação, foco e chamadas de alta prioridade.

### Primary

- **Midnight Ink:** fundo estrutural do cabeçalho, hero, rodapé e players; também é a cor principal do texto sobre fundos claros.
- **Action Blue:** links funcionais, ícones, estados ativos, botões secundários e informação que precisa parecer navegável.
- **Scenic Cobalt:** luz ambiental do hero e contorno de foco sobre superfícies claras.

### Secondary

- **Reconciliation Gold:** ação primária, foco sobre áreas escuras, regras curtas e acentos institucionais.
- **Gold Hover:** resposta luminosa exclusiva do botão dourado.

### Neutral

- **Cream Paper:** superfície principal quente, usada como base acolhedora da página.
- **Reading White:** superfície de maior nitidez para notícias, formulários e leitura editorial.
- **Quiet Surface:** faixa tonal para agenda, estados selecionados e variações de fundo sem sombra.
- **Slate Copy:** texto secundário, metadados e explicações.
- **Quiet Line:** divisores de um pixel em listas, filtros e cartões editoriais.
- **Navy Copy:** texto secundário legível em blocos navy.
- **Pure White:** contraste pontual em ações azuis.

### Named Rules

**The Gold Is a Signal Rule.** Dourado indica ação principal, foco em fundo escuro ou um pequeno marco de hierarquia; ele não cobre grandes superfícies de leitura.

**The Alternating Sanctuary Rule.** Áreas navy criam presença e pausa; paper, white e quiet-surface retomam leitura e serviço. A alternância substitui grades intermináveis de cartões.

## Typography

**Display Font:** Anton (com fallback sans-serif)

**Body Font:** sans de sistema (-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)

**Label/Condensed Font:** Barlow Condensed (com fallback sans-serif)

**Character:** Anton entrega títulos verticais, diretos e monumentais; Barlow Condensed organiza navegação, ações e títulos editoriais com alta densidade; a sans de sistema preserva conforto no conteúdo doutrinário, formulários e artigos.

### Hierarchy

- **Display** (400, escala fluida de 80px a 123px, 1.075): reservado ao enunciado principal da home; usa caixa alta e compressão horizontal controlada.
- **Headline** (400, base de 46px, 1.13): títulos de seção e aberturas editoriais; variações responsivas observadas reduzem a escala sem trocar de família.
- **Title** (600, base de 27px, 1.18): títulos de notícia, estudo, agrupamento e conteúdo intermediário.
- **Action** (600, base de 24px, 1.2): botões, navegação principal e links de alta visibilidade.
- **Body** (400, 16px, 1.65): leitura corrente; blocos longos ficam tipicamente entre 65ch e 75ch.
- **Label** (600, 13px, 1.5): campos, estados, metadados e texto operacional curto.

### Named Rules

**The Condensed Voice, Open Reading Rule.** Anton e Barlow Condensed constroem a voz pública; a sans de sistema assume parágrafos longos, controles densos e informação verificável.

**The Monument Is Route-Specific Rule.** O display acima de 6rem e a linha institucional em caixa alta pertencem ao hero aprovado da home, não são um padrão automático para novas páginas.

## Layout

O contêiner principal chega a 1392px e usa margens laterais de 72px em desktop, 40px abaixo de 1190px e 20px abaixo de 640px. O cabeçalho mede 96px no desktop e 78px quando a navegação vira menu. Seções amplas usam 100px de respiro vertical, reduzidos para 76px e 58px nos mesmos estágios responsivos.

As composições usam grids assimétricos de duas colunas para equilibrar mensagem e evidência visual; áreas editoriais usam três colunas, caem para duas em 900px e uma em 640px. Gaps amplos de 64px a 100px separam regiões maiores; ritmos internos recorrentes ficam entre 16px e 32px. Colunas de leitura evitam atravessar toda a largura disponível.

**Home.** A primeira vista mantém a navegação de 96px, hero de 588px em proporção 54/46 e o começo da agenda semanal no fold. Em 640px o hero vira uma coluna com altura mínima de 760px, preservando mensagem antes do emblema. A imagem oficial do aniversário e a cena cobalt pertencem a essa superfície.

**Blog.** A abertura navy combina introdução editorial, dados da Escola Bíblica e a arte vertical completa em uma grade de conteúdo mais 340px. Abaixo, um índice de estudo de 270px acompanha o artigo de até 760px, separados por 85px. O índice é sticky no desktop e vira trilho horizontal em 900px; a abertura passa a uma coluna em 640px. O artigo usa 18px/1.85 no desktop e 16px no compacto.

**Stand de livros.** O final do blog retorna ao navy e organiza recomendações em um trilho horizontal sobre uma prateleira de linha dourada. Cada obra combina capa ou arte de divulgação integral, título, autoria, síntese e saída opcional. As imagens usam `object-fit: contain`, alinhadas ao topo em uma moldura vertical de proporção 480/854, sem cortar o conteúdo. Em telas compactas, capa e texto permanecem lado a lado: a coluna da imagem passa de 210px para 118px em 640px, preservando a leitura de catálogo sem transformar a seção numa pilha de cartões.

**ReconNews.** O feed vive sobre reading-white. Filtros começam em uma grade 1.5/1/1, passam a duas colunas em 900px e uma em 640px. As matérias seguem três, duas e uma coluna nos mesmos estágios editoriais, mantendo metadados e ações junto à fonte.

## Elevation & Depth

O sistema é tonal por padrão: mudanças entre midnight, navy, paper, white e quiet-surface criam a maior parte da profundidade. Uma sombra ambiente curta e suave eleva o teaser de evento; no stand, a capa recebe uma sombra própria e a linha dourada reforça a prateleira. Notícias, formulários e listas dependem de cor, borda e recorte, não de pilhas de sombras.

### Shadow Vocabulary

- **Ambient Lift** (`0 3px 8px rgb(2 8 23 / 10%)`): eleva discretamente o teaser fotográfico sobre paper.
- **Book Cover** (`0 20px 42px rgb(0 0 0 / 34%)`): destaca a capa integral sobre o stand navy.

### Named Rules

**The Tonal-First Rule.** Crie profundidade primeiro com contraste de superfície, divisores e enquadramento; reserve a sombra ambiente para uma peça visual que realmente precise se destacar.

## Shapes

O idioma formal é contido: 4px em botões, campos, mídia, mensagens de estado e superfícies enquadradas. Controles puramente icônicos e símbolos de reprodução usam círculos completos de pelo menos 44px. Divisores de 1px estruturam listas e artigos sem transformar cada conteúdo em caixa.

Imagens comunitárias respeitam sua proporção: o carrossel usa `object-fit: contain` sobre navy para não cortar pessoas; teasers e cartões editoriais podem usar `cover` quando o enquadramento foi explicitamente definido. A cena do hero é fundo ambiental, nunca uma fotografia documental do edifício.

## Components

### Buttons

- **Shape:** retângulos compactos de 4px, altura mínima de 54px no desktop e tipografia Barlow Condensed semibold.
- **Primary:** dourado sobre midnight, com padding de 11px × 28px; o CTA principal da home estabelece largura mínima de 260px.
- **Secondary:** azul com texto branco para ações de serviço em superfícies claras.
- **Outline:** fundo transparente, borda cinza-azulada e texto azul; o hover recebe superfície azul muito clara.
- **Hover / Focus:** transições de cor em 160ms ease-out; foco visível de 3px cobalt com offset de 5px, trocado por dourado dentro de áreas escuras.

### Cards / Containers

- **Event teaser:** imagem em cover, legenda condensada, canto de 4px e Ambient Lift.
- **Agenda poster:** painel HTML midnight, marca perene, horários em cobalt/dourado e divisores finos; nunca depende de uma imagem para comunicar a programação.
- **News story:** estrutura editorial plana, imagem ou bloco de fonte, corpo sem caixa e divisor inferior de 1px.
- **Contact form:** reading-white sobre quiet-surface, padding de 36px que reduz responsivamente e cantos de 4px.

### Inputs / Fields

- **Style:** fundo reading-white, borda cinza-azulada de 1px, cantos de 4px, altura mínima de 47px e padding de 11px × 13px.
- **Focus:** usa o contorno global cobalt de 3px com offset de 5px; o caret também é azul.
- **Error / Success:** mensagens ocupam blocos tonais claros, com texto escuro de contraste e cantos de 4px.

### Navigation

O cabeçalho midnight combina marca oficial e wordmark condensado à esquerda com cinco caminhos e uma ação de visita dourada à direita. A entrada global “Livros” leva a `/blog#livros`, inclusive pelo menu compacto. Links mudam para dourado no hover. Em 900px, um botão de pelo menos 44px abre a lista vertical sob o cabeçalho; Escape fecha o menu e devolve foco ao acionador.

### Gallery

O carrossel “Eventos da Reconciliação” recebe registros de diferentes encontros e exibe uma fotografia por vez, contida em fundo navy, com legenda discreta e posição tabular. A troca usa uma revelação autoral de 480ms com easing `cubic-bezier(.16, 1, .3, 1)`, combinando opacidade, recorte lateral e saturação. A apresentação pausa com preferência de movimento reduzido, interação, foco, aba oculta ou erro; a regra global reduz animações e transições a 0.01ms quando `prefers-reduced-motion: reduce` está ativo.

### Blog Study Index

O índice usa botões planos alinhados à esquerda, identificando a faixa de lições antes do tema. Hover recebe quiet-surface. O item atual combina preenchimento quiet-surface, texto azul, peso 600 e uma borda inferior azul de 1px; a marcação visual acompanha `aria-current`. No artigo, palavras-chave usam tags contidas, enquanto contexto, ideias centrais, aplicação e perguntas preservam uma hierarquia editorial contínua. As fontes aparecem em um bloco simples, sem competir com a leitura.

### Agenda mensal

Encontros mensais são apresentados depois dos horários semanais, com separação dourada e texto semântico. No cartaz navy, as duas recorrências recebem linhas compactas próprias; elas não são tratadas como novos horários semanais.

### Book Stand

Cada obra mantém capa integral à esquerda e texto à direita, com título Barlow Condensed, autoria dourada e descrição legível em navy. O trilho permite rolagem horizontal quando o acervo excede a largura disponível. Capas carregam sob demanda; o link externo aparece apenas quando a obra possui destino, com rótulo próprio ou “Conhecer o livro”. O foco dourado da seção escura permanece visível no link.

### ReconNews Feed

Filtros têm rótulos explícitos e campos compactos; estado de coleta ocupa uma faixa entre divisores. Cartões mostram fonte, categoria, resumo limitado a três linhas, data qualificada e link externo visível. Estados vazio, desatualizado e indisponível preservam a mesma hierarquia editorial e nunca simulam conteúdo.

## Do's and Don'ts

### Do:

- **Do** preserve a alternância entre planos navy e superfícies quentes de leitura.
- **Do** use dourado para ação principal, foco em fundo escuro e acentos pequenos de hierarquia.
- **Do** use Anton e Barlow Condensed para voz pública, mantendo a sans de sistema em textos longos e controles densos.
- **Do** preserve a marca oficial, imagens documentais reais e enquadramento `contain` quando um corte poderia remover pessoas.
- **Do** keep controles interativos com alvo mínimo de 44px, foco visível e estados compreensíveis sem depender só de movimento.
- **Do** keep notícias como conteúdo editorial plano, com fonte, data e saída para a publicação original.

### Don't:

- **Don't** transformar cada seção em uma grade de cartões elevados; use ritmo, tom e divisores como estrutura principal.
- **Don't** espalhar dourado por grandes superfícies ou tratá-lo como decoração sem função.
- **Don't** aplicar o hero monumental, a linha institucional em caixa alta ou a cena de broadcast a rotas que não sejam a home sem uma nova decisão de superfície.
- **Don't** cortar rostos e corpos em registros comunitários, pré-carregar o álbum inteiro ou iniciar mídia automaticamente.
- **Don't** inventar edifícios, notícias, fontes, datas, doutrina ou identidade visual para preencher lacunas.
- **Don't** depender de animação para comunicar estado; a experiência completa deve permanecer legível com movimento reduzido.
