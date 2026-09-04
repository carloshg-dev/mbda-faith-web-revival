# Fundação de segurança e gestão editorial

Estado: implementação local para revisão. Nenhuma migração de banco, configuração de produção ou publicação faz parte desta etapa.

## Impacto no sistema atual

- O site público continua lendo `public/data/christian_news.json`; visitantes não consultam o Supabase.
- O coletor continua limitado a 60 itens, 1 MB e às fontes permitidas. Escrita no Supabase e notificações permanecem desativadas.
- A normalização de texto das notícias passou a usar parser com entrada e saída limitadas. O parser é carregado sob demanda, apenas quando a seção solicita o feed.
- Formulários continuam usando EmailJS. Os campos agora são escapados no ponto de saída; nenhum e-mail real foi enviado nos testes.
- Componentes legados foram endurecidos porque permanecem no repositório, embora não componham a página inicial atual.
- A fundação editorial é domínio TypeScript puro. Ela ainda não concede autenticação, autorização no servidor ou persistência.

## Fluxo editorial aprovado

| Papel | Criar/editar | Enviar para revisão | Solicitar correções/aprovar | Publicar/arquivar |
| --- | --- | --- | --- | --- |
| Colaborador | Próprio conteúdo | Sim | Não | Não |
| Editor | Todo conteúdo | Sim | Não | Não |
| Revisor | Não | Não | Sim | Não |
| Administrador | Todo conteúdo | Sim | Sim, se não enviou a revisão | Sim |

Todo conteúdo percorre `rascunho → em revisão → aprovado → publicado`. Correções retornam o item à equipe. Qualquer edição cria nova revisão, invalida a aprovação anterior e preserva a revisão que já está no ar até uma nova publicação.

## Controles implementados localmente

- Transições editoriais tipadas, auditáveis e cobertas por testes.
- Separação entre quem envia e quem aprova a mesma revisão.
- Publicação e arquivamento exclusivos do papel administrador.
- URLs externas restritas a HTTPS, sem credenciais, portas incomuns ou hosts imprecisos.
- URLs de YouTube verificadas por host e transformadas para `youtube-nocookie.com`.
- E-mails e parâmetros do template protegidos contra marcação e quebra de cabeçalhos.
- XML do coletor processado com `defusedxml`, rejeitando DTD e entidades.
- GitHub Actions com testes, TypeScript, lint, build, auditoria npm, testes Python, auditoria Python e CodeQL para JavaScript e Python.

## Supabase: limite desta etapa

O projeto confirmado anteriormente foi apenas validado quanto à identidade e leitura pública existente. Isso não comprova RLS, papéis, políticas de escrita, recuperação ou backup.

A URL PostgreSQL é segredo de servidor. Localmente, quando uma ferramenta de administração realmente precisar dela, a sintaxe é `DATABASE_URL="postgresql://..."` no `.env.local`. Ela nunca deve receber prefixo `VITE_`, ser enviada ao Git ou ser colocada no código do navegador. O site atual não consome essa variável.

Antes de ativar o painel, ainda será necessária revisão humana de um pacote isolado contendo:

1. tabelas de perfis, papéis, conteúdo, revisões e eventos de auditoria;
2. RLS com negação por padrão e políticas testadas por papel;
3. função de publicação transacional que exija aprovação da revisão atual;
4. estratégia de exportação/recuperação compatível com o plano gratuito;
5. configuração das chaves apenas no ambiente servidor da Vercel.

## Evidência e pendências

- Os testes locais demonstram as regras do domínio, mas não demonstram segurança de produção do Supabase.
- O build local valida empacotamento; não equivale a deploy.
- A auditoria npm está limpa no ambiente atual.
- A auditoria Python baseada em resolução de requisitos não concluiu no Windows; o job permanece limitado a dez minutos no CI e deve ser observado antes da publicação.
- Alertas CodeQL só podem ser considerados corrigidos depois de um novo resultado no GitHub, não apenas pelo patch local.
- O painel visual ainda depende da escolha da organização da interface; nenhuma autenticação simulada será exposta em produção.
