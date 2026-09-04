import test from 'node:test';
import assert from 'node:assert/strict';
import {
  approveEditorial, createEditorialDraft, publishEditorial, requestEditorialChanges,
  reviseEditorial, submitEditorial,
} from '../src/domain/editorial.ts';

const contributor = { id: 'user-ana', role: 'contributor' };
const editor = { id: 'user-editor', role: 'editor' };
const reviewer = { id: 'user-reviewer', role: 'reviewer' };
const admin = { id: 'user-admin', role: 'admin' };
const clock = '2026-09-03T10:00:00Z';

test('every new item follows submit, independent approval and admin publication', () => {
  const created = createEditorialDraft({ id: 'news-001', kind: 'news', title: 'Notícia da comunidade' }, contributor, clock);
  assert.equal(created.record.status, 'draft');
  const submitted = submitEditorial(created.record, contributor, clock);
  assert.equal(submitted.record.status, 'in_review');
  assert.throws(() => approveEditorial(submitted.record, contributor, clock), /Somente revisores/);
  const approved = approveEditorial(submitted.record, reviewer, clock);
  assert.equal(approved.record.approvedRevision, 1);
  assert.throws(() => publishEditorial(approved.record, editor, clock), /administradores/);
  const published = publishEditorial(approved.record, admin, clock);
  assert.equal(published.record.liveRevision, 1);
});

test('editing never overwrites the live revision and invalidates approval', () => {
  let record = createEditorialDraft({ id: 'event-001', kind: 'event', title: 'Evento da Reconciliação' }, editor, clock).record;
  record = submitEditorial(record, editor, clock).record;
  record = approveEditorial(record, reviewer, clock).record;
  record = publishEditorial(record, admin, clock).record;
  record = reviseEditorial(record, editor, 'Evento da Reconciliação atualizado', clock).record;
  assert.equal(record.status, 'draft');
  assert.equal(record.revision, 2);
  assert.equal(record.liveRevision, 1);
  assert.equal(record.approvedRevision, null);
  assert.throws(() => publishEditorial(record, admin, clock), /aprovada/);
});

test('contributors only edit their own content and submitters cannot self-approve', () => {
  const draft = createEditorialDraft({ id: 'book-001', kind: 'book', title: 'Livro recomendado' }, contributor, clock).record;
  assert.throws(() => reviseEditorial(draft, { id: 'user-other', role: 'contributor' }, 'Outro título', clock), /Sem permissão/);
  const edited = reviseEditorial(draft, editor, 'Livro recomendado pela equipe', clock).record;
  const submitted = submitEditorial(edited, editor, clock).record;
  assert.throws(() => approveEditorial(submitted, { id: editor.id, role: 'admin' }, clock), /própria alteração/);
});

test('reviewers can require a documented correction before approval', () => {
  let record = createEditorialDraft({ id: 'schedule-001', kind: 'schedule', title: 'Agenda semanal' }, contributor, clock).record;
  record = submitEditorial(record, contributor, clock).record;
  const correction = requestEditorialChanges(record, reviewer, 'Confirmar o horário de quarta-feira.', clock);
  assert.equal(correction.record.status, 'changes_requested');
  assert.equal(correction.event.note, 'Confirmar o horário de quarta-feira.');
  assert.throws(() => requestEditorialChanges(record, reviewer, '', clock), /Explique/);
});
