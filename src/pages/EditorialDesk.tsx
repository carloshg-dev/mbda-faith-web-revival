import { useMemo, useState } from "react";
import {
  BookOpen, CalendarDays, Check, CheckCircle2, Clock3, FileText, Image,
  MapPin, MessageSquareText, RotateCcw, Send, ShieldCheck, UserRound, UsersRound,
} from "lucide-react";
import type { EditorialStatus } from "../domain/editorial";
import { eventPhoto } from "../data/church";
import "../styles/editorial.css";

/*
THESIS: revisão cuidadosa em um dossiê contínuo; recusa o painel de métricas genérico.
OWN-WORLD: navy institucional, papel creme, cobalt funcional, dourado-sinal, regras finas e cantos de 4px.
STORY: a equipe escolhe uma pendência, lê contexto e histórico, confere requisitos e decide com consequência explícita.
FIRST VIEWPORT: fila compacta à esquerda, documento dominante ao centro e trilha de aprovação com decisões visíveis à direita.
FORM: dossiê de revisão, posição 4 da lista ordenada; seed ff7fb8ad.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/

type DemoKind = "Evento" | "Notícia" | "Agenda" | "Livro";
type QueueItem = {
  id: string;
  kind: DemoKind;
  title: string;
  time: string;
  revision: number;
  status: EditorialStatus;
};

const initialQueue: QueueItem[] = [
  { id: "event-family", kind: "Evento", title: "Encontro de famílias — registro fotográfico", time: "Hoje, 10:24", revision: 3, status: "in_review" },
  { id: "news-community", kind: "Notícia", title: "Comunidade reunida em domingo especial", time: "Hoje, 09:15", revision: 2, status: "in_review" },
  { id: "weekly-schedule", kind: "Agenda", title: "Agenda semanal — domingo e quarta", time: "Ontem, 16:40", revision: 1, status: "in_review" },
  { id: "school-study", kind: "Notícia", title: "Escola Bíblica — Tessalonicenses", time: "Ontem, 11:30", revision: 2, status: "changes_requested" },
  { id: "book-list", kind: "Livro", title: "Livro recomendado — cadastro inicial", time: "Ontem, 08:50", revision: 1, status: "draft" },
];

const checklistLabels = [
  "Doutrina e referências conferidas",
  "Ortografia e clareza revisadas",
  "Imagem e autorização verificadas",
  "Datas e horários confirmados",
  "Tom pastoral e editorial adequado",
] as const;

const statusLabel: Record<EditorialStatus, string> = {
  draft: "Rascunho", in_review: "Em revisão", changes_requested: "Ajustes solicitados",
  approved: "Aprovado", published: "Publicado", archived: "Arquivado",
};

function QueueIcon({ kind }: { kind: DemoKind }) {
  if (kind === "Evento") return <UsersRound aria-hidden="true" />;
  if (kind === "Agenda") return <CalendarDays aria-hidden="true" />;
  if (kind === "Livro") return <BookOpen aria-hidden="true" />;
  return <FileText aria-hidden="true" />;
}

export default function EditorialDesk() {
  const [queue, setQueue] = useState(initialQueue);
  const [selectedId, setSelectedId] = useState(initialQueue[0].id);
  const [comment, setComment] = useState("");
  const [checks, setChecks] = useState(() => checklistLabels.map(() => true));
  const [notice, setNotice] = useState("Protótipo local: nenhuma ação publica ou altera o banco de dados.");
  const [commentError, setCommentError] = useState("");
  const selected = useMemo(() => queue.find(item => item.id === selectedId) ?? queue[0], [queue, selectedId]);
  const canApprove = selected.status === "in_review" && checks.every(Boolean);

  const updateStatus = (status: EditorialStatus) => {
    setQueue(items => items.map(item => item.id === selected.id ? { ...item, status } : item));
  };

  const requestChanges = () => {
    if (comment.trim().length < 3) {
      setCommentError("Explique o ajuste necessário antes de devolver à equipe.");
      document.getElementById("editorial-comment")?.focus();
      return;
    }
    setCommentError("");
    updateStatus("changes_requested");
    setNotice("Ajustes registrados somente nesta demonstração. Nenhuma publicação foi alterada.");
  };

  const approve = () => {
    if (!canApprove) return;
    updateStatus("approved");
    setNotice("Revisão aprovada somente neste protótipo. A publicação real continua desativada.");
  };

  return <div className="editorial-desk" data-direction-seed="ff7fb8ad">
    <a className="editorial-skip" href="#editorial-document">Ir para o dossiê</a>
    <header className="editorial-masthead">
      <a className="editorial-brand" href="/" aria-label="Reconciliação — voltar ao site">
        <img src="/images/site/logo-evergreen.webp" width="58" height="58" alt="" />
        <span><strong>MBdaR</strong><small>Painel editorial</small></span>
      </a>
      <div className="editorial-state">
        <span className="editorial-state-dot" aria-hidden="true" />
        <span>
          <strong>{statusLabel[selected.status]}</strong>
          <button className="editorial-mobile-profile-inline" type="button" onClick={() => setNotice("Perfil demonstrativo da Equipe MBdaR. A autenticação real ainda está desativada.")}>Equipe MBdaR · Revisor</button>
          <small>Todo conteúdo exige aprovação antes de publicar.</small>
        </span>
      </div>
      <div className="editorial-user" aria-label="Usuário demonstrativo">
        <span className="editorial-avatar"><UserRound aria-hidden="true" /></span>
        <span className="editorial-user-copy"><strong>Equipe MBdaR</strong><small>Revisor · demonstração</small></span>
        <b className="editorial-user-short">Revisor</b>
      </div>
    </header>

    <div className="editorial-demo-notice" role="status" aria-live="polite">
      <ShieldCheck aria-hidden="true" /> <span>{notice}</span>
    </div>

    <main className="editorial-layout">
      <aside className="editorial-queue" aria-label="Fila de revisão">
        <div className="editorial-queue-heading"><span>Fila de revisão</span><strong aria-label={`${queue.length} itens na fila`}>{queue.length}</strong></div>
        <div className="editorial-queue-list">
          {queue.map((item, index) => <button
            type="button"
            className="editorial-queue-item"
            data-selected={item.id === selected.id}
            key={item.id}
            onClick={() => { setSelectedId(item.id); setComment(""); setCommentError(""); setNotice("Item aberto para leitura. Nenhuma ação foi enviada."); }}
            aria-pressed={item.id === selected.id}
          >
            <span className="editorial-queue-marker" aria-hidden="true" />
            {index === 0 ? <img src={eventPhoto("042", 480)} alt="Registro de um evento da Reconciliação" /> : <span className="editorial-queue-icon"><QueueIcon kind={item.kind} /></span>}
            <span className="editorial-queue-copy">
              <small>{item.kind}</small><strong>{item.title}</strong>
              <span>{statusLabel[item.status]} · Rev. {item.revision}</span><time>{item.time}</time>
            </span>
          </button>)}
        </div>
        <button className="editorial-history-button" type="button" onClick={() => setNotice("Histórico geral estará disponível após a integração segura com o Supabase.")}>
          <RotateCcw aria-hidden="true" /> Histórico de publicações
        </button>
      </aside>

      <article className="editorial-document" id="editorial-document" aria-labelledby="editorial-document-title">
        <div className="editorial-document-topline">
          <span>Dossiê de revisão · {selected.kind}</span><span>ID: EVT-DEMO-001</span>
        </div>
        <h1 id="editorial-document-title">{selected.title}</h1>
        <dl className="editorial-metadata">
          <div><CalendarDays aria-hidden="true" /><dt>Data</dt><dd>Próximo encontro</dd></div>
          <div><Clock3 aria-hidden="true" /><dt>Horário</dt><dd>Conforme agenda oficial</dd></div>
          <div><MapPin aria-hidden="true" /><dt>Local</dt><dd>Templo da Reconciliação</dd></div>
        </dl>
        <figure className="editorial-cover">
          <img src={eventPhoto("042", 720)} alt="Participantes em um evento da Reconciliação" width="720" height="1560" />
          <figcaption>Imagem real do acervo · enquadramento demonstrativo</figcaption>
        </figure>
        <section className="editorial-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Resumo para revisão</h2>
          <p>Um registro da vida em comunidade para apresentar os encontros da igreja com cuidado, contexto e informação clara. Antes da publicação, a equipe confirma imagem, data, linguagem e alinhamento pastoral.</p>
        </section>
        <section className="editorial-preview" aria-labelledby="preview-title">
          <div><h2 id="preview-title">Prévia de publicação</h2><span>Site público</span></div>
          <div className="editorial-preview-body">
            <img src={eventPhoto("042", 480)} alt="" width="480" height="1040" />
            <div><small>{selected.kind}</small><h3>{selected.title}</h3><p>Comunhão, ensino da Palavra e momentos que fazem parte da história da Reconciliação.</p><span className="editorial-preview-link">Saiba mais <Send aria-hidden="true" /></span></div>
          </div>
        </section>
        <footer className="editorial-document-footer">Conteúdo demonstrativo · última revisão local por Equipe MBdaR</footer>
      </article>

      <aside className="editorial-approval" aria-label="Trilha de aprovação">
        <section className="editorial-author" aria-labelledby="author-title">
          <h2 id="author-title">Autoria</h2>
          <div><span className="editorial-avatar"><UserRound aria-hidden="true" /></span><span><strong>Equipe de Comunicação</strong><small>Conteúdo demonstrativo</small></span></div>
        </section>
        <section className="editorial-revision" aria-labelledby="revision-title">
          <h2 id="revision-title">Revisão atual</h2>
          <strong>Revisão {selected.revision} de {selected.revision}</strong>
          <button type="button" onClick={() => setNotice(`Histórico da revisão ${selected.revision} aberto apenas na demonstração.`)}>Ver todas as revisões</button>
        </section>
        <section className="editorial-timeline" aria-labelledby="timeline-title">
          <h2 id="timeline-title">Linha do tempo</h2>
          <ol>
            <li><CheckCircle2 aria-hidden="true" /><span><time>Hoje, 08:40</time><strong>Conteúdo criado</strong><small>Equipe de Comunicação</small></span></li>
            <li><MessageSquareText aria-hidden="true" /><span><time>Hoje, 09:15</time><strong>Revisão solicitada</strong><small>Editor responsável</small></span></li>
            <li><Send aria-hidden="true" /><span><time>Hoje, 10:24</time><strong>Revisão enviada</strong><small>Pronta para sua decisão</small></span></li>
          </ol>
        </section>
        <fieldset className="editorial-checklist">
          <legend>Checklist obrigatório</legend>
          {checklistLabels.map((label, index) => <label key={label}>
            <input type="checkbox" checked={checks[index]} onChange={() => setChecks(values => values.map((value, itemIndex) => itemIndex === index ? !value : value))} />
            <span aria-hidden="true"><Check /></span>{label}
          </label>)}
        </fieldset>
        <div className="editorial-comment-field">
          <label htmlFor="editorial-comment">Comentário para a equipe</label>
          <textarea id="editorial-comment" value={comment} maxLength={500} onChange={event => { setComment(event.target.value); if (event.target.value.trim().length >= 3) setCommentError(""); }} placeholder="Explique o motivo dos ajustes…" aria-describedby={commentError ? "editorial-comment-error" : "editorial-comment-count"} aria-invalid={!!commentError} />
          {commentError ? <p id="editorial-comment-error" role="alert">{commentError}</p> : <small id="editorial-comment-count">{comment.length}/500 caracteres</small>}
        </div>
        <div className="editorial-actions">
          <button type="button" className="editorial-adjust" onClick={requestChanges} disabled={selected.status !== "in_review"}>Solicitar ajustes</button>
          <button type="button" className="editorial-approve" onClick={approve} disabled={!canApprove}>Aprovar revisão</button>
        </div>
      </aside>
    </main>
  </div>;
}
