# Luz que Reconcilia — validação local

Data: 03/09/2026. Implementação para revisão humana, sem deploy, commit/push,
DDL, envio de mensagens ou alteração remota no Supabase.

## Escopo e impacto

O projeto existente é Vite/React, não Next.js. A arquitetura foi mantida.
A página e o blog usam os mesmos componentes de navegação, conteúdo doutrinário
preservado e dados institucionais centralizados. A rota antiga `/blog/index.html`
é compatível com a nova rota `/blog` no desenvolvimento, preview e configuração Vercel.

Os componentes antigos permanecem no repositório, mas não compõem a página ativa.
Foram retirados do caminho de execução o splash obrigatório, rastreamento,
notícias sintéticas e consultas ao Supabase por visitante. Os identificadores
públicos existentes do EmailJS foram preservados; nenhuma credencial privada foi
inserida no cliente. O workflow mantém sua cadência existente de duas execuções
diárias; mudanças no arquivo só valerão depois de revisão e publicação pelo responsável.

## Mídia e custo

- “Eventos da Reconciliação” reúne treze fotos reais: dez casais, dois registros comunitários e o Pr. Luiz Carlos Aparício sozinho na tribuna, em versões WebP responsivas; uma foto por vez.
- Avanço a cada sete segundos, pausa manual e com foco/hover, página oculta,
  seção fora da tela ou preferência por movimento reduzido.
- Fotos de galeria carregadas ao chegar à seção; artes de arquivo só montadas ao expandir.
- Vídeo original ~80 MiB preservado; derivado540p:12.388.197 bytes, somente após clique.
- Hero cênico10.640 bytes e logo23anos52.284 bytes; a agenda agora é HTML acessível e não publica a arte rasterizada antiga.
- Oito artes adicionais484.690 bytes, redução79,2% em relação às fontes.
- Publicação por allowlist em `scripts/public-assets.mjs`: sem ZIP, logos fonte,
  vídeos originais ou sidecars JSON. As fontes continuam intactas no computador.
- Build medido: aproximadamente15,1 MB no disco, dos quais12,4 MB correspondem
  ao vídeo opcional. Isso não é a transferência inicial de cada visita.
- CSS32,06 KB (~7,63 KB gzip), aplicação59,71 KB (~21,33 KB gzip), React/router178,41 KB
  (~59 KB gzip). EmailJS é um chunk carregado sob demanda.

Nenhum limite gratuito é garantido: consumo depende de visitantes, reprodução
do vídeo, cache efetivo e configurações das contas. Não foram consultadas cotas
privadas de Vercel, GitHub ou Supabase.

## Notícias

`src/domain/news.ts` valida formato, datas, links HTTPS, publishers, duplicação e
até60 artigos. O cliente usa arquivo estático da mesma origem, cache15 minutos,
cooldown60 segundos, timeout8 segundos e leitura por stream limitada a1 MB.
Falhas preservam a última edição conhecida, com aviso honesto; sem notícias inventadas.
Datas antigas do arquivo legado não são apresentadas como publicação verificada.

O coletor mantém seus adaptadores e filtros editoriais, mas compartilha transporte
limitado:2 MB por resposta descomprimida,120 requisições, três redirecionamentos e
orçamento de360 segundos, mais timeout total de10 minutos no workflow.
DNS público é verificado em cada destino; isso reduz SSRF, mas não equivale a
isolamento de rede nem prova proteção contra DNS rebinding. O coletor deve continuar
usando apenas as fontes editoriais confiáveis e o runner isolado.

Sem data original, a matéria é rejeitada. Edição vazia não substitui a anterior;
edição idêntica preserva timestamp, evitando commits/deploys sem mudança editorial.
Persistência JSON é atômica por arquivo. RSS escapa XML e não inventa pubDate.
Escrita Supabase exige opt-in `NEWS_WRITE_SUPABASE=true` e service-role não exposta;
o workflow não fornece essas credenciais. Limpeza destrutiva automática foi desativada.

Teste real isolado, com dependências em `.venv`: Gospel Prime, Guiame e Folha Gospel,
6 matérias aprovadas com data,26 requisições, gravação em pasta temporária, sem banco.
Guiame retornou HTTP500 em um RSS; as outras fontes mantiveram a edição útil.
O acervo de demonstração permanece de18/06/2026 e a UI sinaliza essa defasagem.

## Segurança e verificações

- TypeScript estrito; testes Node de domínio/cache/limites/contato/publicação e
  seis testes Python offline de transporte, preservação e bloqueio de exclusão.
- `npm audit`: zero vulnerabilidades reportadas na execução local.
- Lint: zero erros; sete avisos Fast Refresh em componentes UI legados.
- Build aprovado; aviso de depreciação da integração SWC/Vite não impede a geração.
- CSP de produção remove eval/scripts inline e limita conexão ao site e EmailJS;
  iframe somente YouTube sem cookies. Headers carregados também no preview local.
- Navegador: menu móvel, navegação de fotos, filtro sem resultados, retorno ao acervo,
  troca de reflexão e formulário vazio bloqueado; desktop1536, celular390 e tela1280
  sem overflow horizontal nas verificações feitas.
- Vídeo não montado antes de clicar; depois do clique utiliza o derivado540p.

Limitações: não foi enviado e-mail real; configurar/verificar allowlist de domínios,
CAPTCHA/antispam e limites no EmailJS antes da publicação. Honeypot e cooldown no
cliente não substituem proteção do provedor. RLS, políticas de storage, permissões
e cotas remotas do Supabase não foram auditadas. Não houve validação de deploy real
nem execução remota do workflow. Cabeçalhos/rewrites precisam do teste de preview
da Vercel antes de promover para produção. Players externos dependem dos provedores.

## Referências técnicas consultadas

- [Requests: streaming e fechamento de resposta](https://requests.readthedocs.io/en/stable/user/advanced/)
- [Vercel: configuração de headers e rewrites](https://vercel.com/docs/project-configuration/vercel-json)

## Revisão de design

Impeccable4.1.1; comp original aprovado, seed0f7712b0. Contrato incluído no HTML
de produção. Evidências locais em `.impeccable/review/`. Parecer independente
final: `ship`; os dois ajustes solicitados (estado ativo do blog e transição da
galeria) foram classificados como resolvidos. `DESIGN.md` e
`.impeccable/design.json` registram o sistema construído.
