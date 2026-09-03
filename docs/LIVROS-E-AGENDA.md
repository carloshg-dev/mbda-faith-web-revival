# Livros e agenda — entrega local

## O que foi integrado

- Menu global `Livros` aponta para `/blog#livros` e funciona no menu compacto.
- O blog preserva o estudo de Tessalonicenses e termina com o stand de leituras.
- A recomendação inicial usa a arte fornecida para Tessalonicenses. Nenhuma outra obra foi recomendada sem a lista do responsável.
- A agenda apresenta Ceia do Senhor no primeiro domingo e Culto da Família no último domingo de cada mês. Não foram presumidos horários adicionais.
- O canal compartilhado do YouTube é `https://www.youtube.com/@mbdareconciliacao`.

## Próximas inclusões

Adicionar registros em `src/data/recommendedBooks.ts`, com identificador único (`slug`), título, autoria/editora, descrição breve e imagem local otimizada. O endereço (`href`) e seu rótulo (`linkLabel`) são opcionais: quando não há link, a obra continua visível sem um botão inoperante.

Capas e artes devem ser autorizadas pelo responsável e colocadas em `public/images/site/blog/`. Preferir WebP de tamanho proporcional à exibição, com carregamento tardio. A moldura usa `object-fit: contain` para preservar integralmente capas com proporções distintas. O stand atual reaproveita o mesmo arquivo da abertura, sem serviços adicionais, banco, embeds ou geração de imagens por visita.

Não inserir instruções de cadastro no texto público. A lista de próximas recomendações será enviada pelo usuário.

## Verificação desta entrega

- 20 testes Node aprovados, incluindo dados mensais, canal oficial, link de Livros, imagens e ausência de instruções internas no stand.
- TypeScript e build aprovados; lint sem erros, com sete avisos Fast Refresh preexistentes.
- Navegação e layout conferidos em desktop e celular; sem rolagem horizontal da página. O trilho de livros mantém sua rolagem própria.
- Revisão independente Impeccable: `ship` para os dois ajustes pontuados — texto interno removido e imagens sem recorte.
- Capturas finais: `.impeccable/review/desktop.png` e `.impeccable/review/mobile.png`. Capturas anteriores da agenda e do menu: `user-1294.png` e `header-1294.png` no mesmo diretório.
- Avisos já existentes do build: integração SWC/Vite depreciada e resolução do hero estático em tempo de execução. O asset do hero é copiado para `dist` pelo pipeline existente.

Nenhum commit, push, deploy ou alteração remota no Supabase foi realizado. O resultado é local e permanece para revisão humana.
