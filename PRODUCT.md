# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O site atende de forma equilibrada dois públicos: pessoas conhecendo a igreja e membros atuais. A página inicial deve orientar visitas e oferecer acesso claro à agenda, notícias, estudos, mídia e contato, sem privilegiar um público em detrimento do outro.

## Product Purpose

Apresentar o Ministério Bíblico da Reconciliação, comunicar sua fé e sua vida comunitária, orientar visitas, divulgar a programação oficial e oferecer conteúdo cristão e notícias selecionadas com clareza e credibilidade.

## Positioning

O produto reúne, em uma única experiência oficial, identidade institucional, declaração de fé, programação, registros reais da comunidade, estudos, mídia e o ReconNews. A proposta é combinar acolhimento pastoral com informação verificável, sem transformar o site em uma peça comercial.

## Operating Context

A experiência principal é pública e responsiva, acessada por celular e desktop. O site é publicado com Vercel e GitHub e pode consumir dados do Supabase, preservando os limites gratuitos desses serviços. Novidades institucionais, agenda e notícias precisam continuar úteis mesmo quando uma integração externa estiver indisponível.

## Capabilities and Constraints

- Preservar o conteúdo doutrinário existente e as informações oficiais de contato.
- A igreja tem mais de 23 anos e atende mais de 500 famílias.
- A programação oficial deve exibir apenas os horários confirmados: domingos às 08h, 09h e 11h, e quartas-feiras às 20h.
- O ReconNews deve exibir somente matérias reais, identificáveis e provenientes de fontes permitidas; conteúdo sintético não pode ser apresentado como notícia atual.
- Fotografias de eventos devem ser usadas de forma seletiva, responsiva e otimizada, evitando tráfego e armazenamento desnecessários.
- O blog acompanha o material usado pelo pastor em Escola Bíblica, seminários ou eventos. O conteúdo publicado deve ser autoral, indicar as fontes consultadas e respeitar o acesso legítimo à obra original.
- O blog mantém um stand de livros recomendados, alimentado gradualmente com título, autor, thumbnail e link externo opcional.
- Além da programação semanal, a agenda comunica dois encontros mensais: Ceia do Senhor no primeiro domingo e Culto da Família no último domingo de cada mês.
- Não executar deploy, mutações de produção ou alterações externas no GitHub, Vercel ou Supabase sem validação humana.

## Brand Commitments

Preservar o nome Ministério Bíblico da Reconciliação e a sigla MBdaR. A identidade oficial utiliza azul e dourado. Os ativos confirmados incluem `logo-23anos.png` para o ciclo atual, `logo-sem-faicha.png` para aplicações perenes e versões já preparadas para os próximos anos.

## Evidence on Hand

- Logos oficiais em `public/images/logo-23anos.png`, `public/images/logo-sem-faicha.png` e versões anuais futuras.
- Arte `public/images/agenda-semanal-novo.jpg` como referência visual; as linhas antigas de sexta e sábado não fazem parte da programação atual.
- Fotografias reais de eventos, inicialmente provenientes do arquivo ZIP em `public/images/reunião-de-casais/`.
- Conteúdo institucional, declaração de fé, estudos, mídia e contatos já presentes no código.
- Dados e automação existentes do ReconNews, que precisam ser saneados antes de serem tratados como fonte confiável.
- Arte da Escola Bíblica sobre 1 e 2 Tessalonicenses fornecida pelo usuário, com aula inaugural em 13 de setembro de 2026, às 9h e 11h, ministrada pelo Pr. Luiz Carlos Aparício.
- Página oficial e amostra oficial da revista `Tessalonicenses — visão de uma igreja local`, da Editora Cristã Evangélica.
- Canal oficial de vídeos: `https://www.youtube.com/@mbdareconciliacao`.

## Product Principles

1. Receber primeiro, orientar sempre.
2. Publicar fatos e fontes reais; nunca preencher lacunas com notícias inventadas.
3. Deixar a vida comunitária aparecer por meio de registros autênticos, sem excesso visual.
4. Manter desempenho e custo operacional proporcionais aos limites gratuitos da infraestrutura.
5. Preservar conteúdo institucional e doutrinário enquanto a experiência evolui.

## Accessibility & Inclusion

A interface deve funcionar com teclado, tecnologias assistivas, redução de movimento e diferentes tamanhos de tela, com contraste e legibilidade adequados para um público de idades variadas.
