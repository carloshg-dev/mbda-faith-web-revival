import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { toDisplayText } from '../src/domain/text.ts';
import { escapeTemplateText, validContactEmail } from '../src/domain/contact.ts';
import { youtubeEmbedUrl, localVideoPath } from '../src/domain/media.ts';
import { sanitizeInput } from '../src/utils/emailValidator.ts';

test('display extraction uses one decoding pass and never promises trusted HTML', () => {
  assert.equal(toDisplayText('<b>Fé</b> &amp; esperança'), 'Fé & esperança');
  assert.equal(toDisplayText('&amp;quot;'), '&quot;');
  assert.equal(toDisplayText('&lt;img src=x onerror=alert(1)&gt;'), '<img src=x onerror=alert(1)>');
  assert.equal(escapeTemplateText(toDisplayText('&lt;img src=x&gt;')), '&lt;img src=x&gt;');
  assert.equal(toDisplayText('Antes<script>alert(1)</script><style>body{}</style><p>Depois</p>'), 'Antes Depois');
  assert.equal(toDisplayText('Fé <a title="a > b">e esperança</a>'), 'Fé e esperança');
  assert.ok(!toDisplayText('<template><b>Oculto</b></template>Visível').includes('Oculto'));
  assert.equal(toDisplayText('x'.repeat(100_000), 240).length, 240);
  assert.equal(toDisplayText(null), '');
  assert.equal(toDisplayText('x', Infinity), '');
});

test('contact rejects markup/header injection while preserving legitimate addresses', () => {
  for (const email of ['nome+ebd@gmail.com', "o'brien@example.com", 'pessoa@sub.example.com']) assert.ok(validContactEmail(email), email);
  for (const email of ['<img/src=x>@example.com', '"x"@example.com', 'a@b.com\r\nBcc:x@y.com', '.x@example.com', 'a..b@example.com', 'a@-example.com', 'a@x', 'a'.repeat(65)+'@example.com']) assert.equal(validContactEmail(email), false, email);
  const payload = '<scr<script>ipt>alert(1)</scr</script>ipt>';
  assert.equal(sanitizeInput(payload), payload, 'normalization must not pretend to sanitize HTML');
  assert.ok(!escapeTemplateText(sanitizeInput(payload)).includes('<'));
});

test('video destinations validate exact hosts, IDs and local paths', () => {
  const expected = 'https://www.youtube-nocookie.com/embed/u2R0dCZTFfM?rel=0';
  for (const url of ['https://youtu.be/u2R0dCZTFfM', 'https://www.youtube.com/watch?v=u2R0dCZTFfM', 'https://www.youtube-nocookie.com/embed/u2R0dCZTFfM']) assert.equal(youtubeEmbedUrl(url), expected);
  for (const url of ['https://youtube.com.attacker.org/watch?v=u2R0dCZTFfM', 'https://evil.test/youtube.com/u2R0dCZTFfM', 'https://user@youtube.com/watch?v=u2R0dCZTFfM', 'javascript:alert(1)', 'https://youtube.com:8080/watch?v=u2R0dCZTFfM', 'https://youtu.be/bad', 'https://youtube.com/watch?v=u2R0dCZTFfM\n']) assert.equal(youtubeEmbedUrl(url), null, url);
  assert.equal(localVideoPath('/videos/devocional-evangelizar-540p.mp4'), '/videos/devocional-evangelizar-540p.mp4');
  for (const path of ['//evil.test/a.mp4', '/videos/../a.mp4', '/videos/a.mp4?x', 'https://evil.test/a.mp4']) assert.equal(localVideoPath(path), null);
});

test('security workflow gates regressions and both dependency ecosystems without masking failures', async () => {
  const workflow = await readFile(new URL('../.github/workflows/security.yml', import.meta.url), 'utf8');
  assert.ok(!workflow.includes('continue-on-error: true'));
  for (const command of ['npm test', 'npm run typecheck', 'npm run lint', 'npm run build', 'npm audit --audit-level=moderate', 'python -m pip_audit', 'languages: javascript,python']) assert.ok(workflow.includes(command), command);
  const collector = await readFile(new URL('../.github/workflows/news-scraper.yml', import.meta.url), 'utf8');
  assert.ok(collector.includes('npm ci --ignore-scripts'));
  assert.ok(collector.includes("NEWS_WRITE_SUPABASE: 'false'"));
});
