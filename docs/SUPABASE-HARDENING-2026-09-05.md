# Supabase: endurecimento aplicado e recuperação verificada

Aplicado em **05/09/2026 02:52 UTC (04/09, 23:52 em Brasília)**, com autorização do titular.
Projeto: `atvchidakkzgtlszwmvn` / `mbdareconciliacao noticias`.

## Resultado

| Controle | Antes | Depois, medido em produção |
| --- | --- | --- |
| Cadastro de usuários | Público | `disable_signup=true`; confirmação de e-mail preservada |
| `news_articles` | INSERT para PUBLIC com `WITH CHECK true` | Somente SELECT para `anon` e `authenticated` |
| `articles` | INSERT para qualquer usuário autenticado | Somente SELECT para `anon` e `authenticated` |
| `cleanup_runs` | Grants amplos; RLS sem políticas | Sem grants para visitantes/usuários comuns |
| Sequência `news_articles_id_seq` | SELECT, USAGE e UPDATE públicos | Privilégios de servidor preservados; acessos públicos revogados |
| `cleanup_old_articles()` | SECURITY DEFINER sem search_path fixado | `search_path=''`; EXECUTE limitado ao proprietário e service_role |
| RLS | Ativo nas três tabelas | Preservado |

As permissões removidas incluem INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES,
TRIGGER e MAINTAIN. Privilégios de coluna também foram verificados. Nenhuma linha
de aplicação foi inserida, alterada ou excluída nesta intervenção.

## Provas e limite das conclusões

- `articles`: 0 registros; `cleanup_runs`: 22; `news_articles`: 10.861.
- Contagens **e SHA-256 do conteúdo completo**, lido por cursor em lotes, coincidem
  antes/depois. A validação não depende apenas de contagens.
- Restauração do backup em PostgreSQL 17.11 local: dados, políticas, funções e
  grants conferidos. A ordem dos itens das ACLs é normalizada na comparação.
- Migração aplicada duas vezes no ambiente isolado: resultado idempotente.
- Rollback isolado: estado anterior restaurado, incluindo MAINTAIN do PostgreSQL 17.
- Produção: asserções de catálogo passaram antes do COMMIT e numa nova conexão
  somente leitura depois do COMMIT. Nenhum teste tentou INSERT/UPDATE/DELETE/TRUNCATE
  nem executou a função de limpeza em produção.
- Leitura REST pública de uma notícia: HTTP 206, `Content-Range: 0-0/10861`.
- Página inicial e arquivo público de notícias: HTTP 200 após a mudança.
- A API de configurações do Auth confirmou o bloqueio de cadastro.

Isso comprova o fechamento das permissões analisadas. O painel `/gestao` ainda é
um protótipo local; Auth, MFA, papéis editoriais e aprovação no backend seguem
pendentes. Os privilégios padrão para **novos objetos** ainda precisam ser tratados
nas futuras migrações: estas devem declarar explicitamente RLS e grants mínimos.

## Arquivos reproduzíveis

- `supabase/migrations/20260905030000_harden_public_access.sql`
- `supabase/tests/20260905_public_access.sql` (asserções somente de catálogo)
- `supabase/rollback/20260905030000_harden_public_access.sql`
- `scripts/supabase_admin.py` (backup, ensaio local, aplicação e verificação)
- `scripts/requirements-admin.txt` (dependências administrativas com versões fixas)

O script valida o projeto da URL e da conexão PostgreSQL, exige TLS e limita
tempo de conexão, consulta e espera de locks. Segredos vão para o ambiente dos
utilitários, sem aparecer na linha de comando. O pg_dump usa o mesmo snapshot
exportado da transação de leitura que gera as contagens e hashes.

A aplicação exige confirmação explícita do projeto, backup íntegro e um ensaio
bem-sucedido do SQL exato. Mudanças de dados/permissões desde o backup abortam a
aplicação. O COMMIT só acontece depois das asserções e da comparação dos dados.
O arquivo SQL está preparado para versionamento; a aplicação direta ficou
registrada nos recibos locais, sem fabricar histórico na tabela interna do CLI.

## Backup e recuperação

Backup local: `_local_backups/supabase-20260905-hardening/public-before.dump`.
Formato custom do `pg_dump`, tamanho **2.591.446 bytes**.

SHA-256 do arquivo:
`fe92860d73825188dc36a1923aae57d961313c370b657b60bbbb91d768fd7852`.

Escopo: todo o schema **public**, incluindo dados, estrutura, índices, sequências,
políticas, grants e função de aplicação. **Não é um backup integral da plataforma
Supabase**: não inclui senhas/roles do cluster, configurações Auth, schemas internos
geridos pelo provedor ou objetos de Storage. Nesta auditoria havia zero usuários
Auth e zero buckets. O bloqueio do cadastro é uma configuração externa ao SQL.

A pasta está fora da publicação, ignorada pelo Git e com ACL do Windows limitada
ao usuário local e SYSTEM. Isso é controle de acesso local, não criptografia nem
cópia externa. `before.json`, `rehearsal.json` e `applied.json` registram hashes,
evidências e horários. As cópias temporárias de restauração podem ser descartadas
depois de parar o PostgreSQL local; o dump e os recibos devem ser preservados.

O workflow `Automated Backup` continua sendo backup do **repositório**. Não foi
criada agenda de backup do banco nem uma cópia externa nesta etapa.

### Operação manual

Os utilitários oficiais foram obtidos do [distribuidor Windows indicado pelo PostgreSQL](https://www.enterprisedb.com/download-postgresql-binaries).
O diretório local é `_local_backups/postgres-tools/pgsql/bin`. Em um ambiente Python
3.11+ isolado, instale as dependências com
`python -m pip install -r scripts/requirements-admin.txt`. Elas não entram no build
do site. Use uma nova pasta de backup privada para cada execução:

```powershell
python scripts/supabase_admin.py backup --bin <diretorio-pg> --folder <pasta-privada-em-_local_backups>
python scripts/supabase_admin.py rehearse --bin <diretorio-pg> --folder <mesma-pasta>
python scripts/supabase_admin.py verify --folder <mesma-pasta>
```

O ensaio sobe um cluster novo apenas em `127.0.0.1`, com memória limitada, e o
encerra ao terminar. Os utilitários usam captura em arquivo temporário para evitar
espera indefinida por pipes herdados do `pg_ctl` no Windows.

O rollback SQL reabre as permissões antigas e **não deve ser executado como rotina**.
Prefira uma correção pontual. Restaurar um dump sobre produção exige planejamento
específico para não sobrescrever dados novos. O ensaio de recuperação utiliza um
cluster descartável e uma função `auth.uid()` local de apoio; ele não representa
um teste completo do serviço Supabase Auth.

## Fundamentação

- [Supabase: grants, RLS e funções](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [PostgreSQL 17: pg_dump e snapshots](https://www.postgresql.org/docs/17/app-pgdump.html)
- [PostgreSQL 17: pg_restore](https://www.postgresql.org/docs/17/app-pgrestore.html)
