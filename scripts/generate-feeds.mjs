import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeFeed, MAX_FEED_BYTES } from '../src/domain/news.ts';

const SITE = 'https://www.igrejadarecon.com.br';
const escapeXml = (value='') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
export function renderFeeds(data, now=Date.now()) {
  const feed = normalizeFeed(data, now);
  const json = {version:'https://jsonfeed.org/version/1.1',title:'Reconciliação News',home_page_url:SITE,
    feed_url:SITE+'/reconnews-feed.json',language:'pt-BR',description:'Referências de notícias cristãs, com acesso à fonte original.',
    items:feed.articles.map(item=>({id:item.url,url:item.url,title:item.title,content_text:item.summary,
      date_published:item.dateVerified?item.date:undefined,image:item.image_url,tags:[item.category],authors:[{name:item.source}]}))};
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Reconciliação News</title><link>${SITE}</link><description>Referências de notícias cristãs</description><language>pt-BR</language>`
    +(feed.updatedAt?`<lastBuildDate>${new Date(feed.updatedAt).toUTCString()}</lastBuildDate>`:'')
    +feed.articles.map(item=>`<item><title>${escapeXml(item.title)}</title><link>${escapeXml(item.url)}</link><guid isPermaLink="true">${escapeXml(item.url)}</guid>`
      +(item.dateVerified?`<pubDate>${new Date(item.date).toUTCString()}</pubDate>`:'')
      +`<category>${escapeXml(item.category)}</category><description>${escapeXml(item.summary)}</description></item>`).join('\n')+'</channel></rss>\n';
  return {json:JSON.stringify(json,null,2)+'\n',rss};
}
export async function generate(root=process.cwd()) {
  const chunks=[]; let size=0;
  for await (const chunk of createReadStream(join(root,'public/data/christian_news.json'),{highWaterMark:64*1024})) {
    size+=chunk.length;
    if(size>MAX_FEED_BYTES) throw new Error('Feed exceeds 1 MB budget');
    chunks.push(chunk);
  }
  const output=renderFeeds(JSON.parse(Buffer.concat(chunks).toString('utf8')));
  await Promise.all([writeFile(join(root,'public/reconnews-feed.json'),output.json),writeFile(join(root,'public/reconnews-rss.xml'),output.rss)]);
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) {
  generate().then(()=>console.log('RSS and JSON Feed generated from the verified static archive.')).catch(error=>{console.error(error.message);process.exitCode=1;});
}
