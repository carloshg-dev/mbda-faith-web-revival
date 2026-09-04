import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, RefreshCw, Search } from "lucide-react";
import { loadNewsFeed } from "../api/newsApi";
import type { NewsFeed, NewsItem } from "../domain/news";
import { selectNews } from "../domain/newsQuery";

const dateLabel = (value: string) => new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",year:"numeric",timeZone:"America/Sao_Paulo"}).format(new Date(value));
function NewsStory({item}:{item:NewsItem}) {
  const [failed, setFailed] = useState(false);
  return <article className="news-story">
    {item.image_url && !failed ? <img src={item.image_url} alt="" loading="lazy" decoding="async" width="640" height="360" referrerPolicy="no-referrer" onError={()=>setFailed(true)} /> : <div className="news-source-art" aria-hidden="true">{item.source}</div>}
    <div className="news-story-body"><p className="news-meta">{item.source} <span>· {item.category}</span></p><h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h3><p className="news-summary">{item.summary}</p><div className="news-story-footer"><time dateTime={item.date}>{item.dateVerified ? "Publicado em " : "Data no acervo: "}{dateLabel(item.date)}</time><a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={"Ler na fonte: "+item.title}>Ler na fonte <ArrowUpRight aria-hidden="true" /></a></div></div>
  </article>;
}
export default function ReconNewsFeed() {
  const section = useRef<HTMLElement>(null);
  const [ready,setReady] = useState(false);
  const [feed,setFeed] = useState<NewsFeed|null>(null);
  const [loading,setLoading] = useState(false);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("");
  const [source,setSource] = useState("");
  const [page,setPage] = useState(0);
  const [refreshAllowed,setRefreshAllowed] = useState(true);
  const cooldown = useRef<ReturnType<typeof setTimeout>>();
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    const observer = new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);observer.disconnect();}}, {rootMargin:"300px"});
    if(section.current) observer.observe(section.current);
    return ()=>{mounted.current=false;observer.disconnect();clearTimeout(cooldown.current);};
  },[]);
  const load = useCallback(async (force=false) => {
    setLoading(true);
    try { const result=await loadNewsFeed(force); if(mounted.current) setFeed(result); }
    finally { if(mounted.current) setLoading(false); }
  },[]);
  useEffect(()=>{if(ready) void load();},[ready,load]);
  const items=useMemo(()=>feed?.articles??[],[feed]);
  const categories=useMemo(()=>[...new Set(items.map(item=>item.category))].sort(),[items]);
  const sources=useMemo(()=>[...new Set(items.map(item=>item.source))].sort(),[items]);
  const result=selectNews(items,search,category,source,page);
  const refresh=()=>{setRefreshAllowed(false);void load(true);cooldown.current=setTimeout(()=>setRefreshAllowed(true),60_000);};
  const clear=()=>{setSearch("");setCategory("");setSource("");setPage(0);};
  return <section id="reconnews" ref={section} className="section-space news-section" aria-labelledby="news-title">
    <div className="content-width">
      <div className="section-heading news-heading"><div><h2 id="news-title">Recon<span>News</span></h2><p>Fé, igreja e história. Informação com fonte.</p></div><button className="button button-outline" type="button" onClick={refresh} disabled={loading||!refreshAllowed}><RefreshCw className={loading?"is-spinning":""} aria-hidden="true" />{loading?"Consultando…":!refreshAllowed?"Aguarde para atualizar":"Verificar atualização"}</button></div>
      <div className="feed-status" role="status">{!feed ? "Consultando o acervo de notícias…" : feed.unavailable ? "Não foi possível consultar a atualização. "+(items.length?"Você está vendo o último acervo carregado.":"Tente novamente em instantes.") : feed.stale ? "Acervo disponível · a coleta está desatualizada. Nenhuma matéria é apresentada como notícia de hoje." : "Acervo atualizado pelo coletor."}{feed?.updatedAt && <span>Última coleta: {dateLabel(feed.updatedAt)}.</span>}</div>
      <div className="news-filters">
        <div className="search-field"><label htmlFor="news-search">Buscar no acervo</label><div><Search aria-hidden="true" /><input id="news-search" type="search" value={search} maxLength={120} placeholder="Tema, palavra ou fonte" onChange={e=>{setSearch(e.target.value);setPage(0);}} /></div></div>
        <div><label htmlFor="news-category">Categoria</label><select id="news-category" value={category} onChange={e=>{setCategory(e.target.value);setPage(0);}}><option value="">Todas as categorias</option>{categories.map(value=><option key={value}>{value}</option>)}</select></div>
        <div><label htmlFor="news-source">Fonte</label><select id="news-source" value={source} onChange={e=>{setSource(e.target.value);setPage(0);}}><option value="">Todas as fontes</option>{sources.map(value=><option key={value}>{value}</option>)}</select></div>
      </div>
      {feed && <p className="news-results" aria-live="polite">{result.total} {result.total===1?"matéria encontrada":"matérias encontradas"}{(search||category||source)&&<button type="button" onClick={clear}>Limpar filtros</button>}</p>}
      <div aria-busy={loading} className="news-grid">{result.items.map(item=><NewsStory key={item.url} item={item} />)}</div>
      {feed && !result.total && <div className="empty-state"><h3>{items.length?"Nenhuma matéria com esses filtros.":"Nenhuma matéria disponível no momento."}</h3><p>{items.length?"Experimente outra palavra ou limpe os filtros para ver o acervo.":"Consulte novamente mais tarde. Não usamos notícias inventadas para preencher o espaço."}</p>{items.length>0&&<button className="button button-blue" onClick={clear}>Ver todo o acervo</button>}</div>}
      {result.pageCount>1&&<nav className="news-pagination" aria-label="Páginas de notícias"><button className="icon-button" aria-label="Página anterior de notícias" disabled={result.page===0} onClick={()=>setPage(result.page-1)}><ChevronLeft /></button><span>Página {result.page+1} de {result.pageCount}</span><button className="icon-button" aria-label="Próxima página de notícias" disabled={result.page+1===result.pageCount} onClick={()=>setPage(result.page+1)}><ChevronRight /></button></nav>}
      <details className="editorial-note"><summary>Como funciona o ReconNews?</summary><p>Reunimos referências de fontes cristãs, teológicas e históricas. Os links abrem a publicação original. A data de coleta não é a data de publicação: registros antigos sem comprovação da data original são identificados como “Data no acervo”. A seleção automática não representa endosso a todas as opiniões das fontes.</p><p>“Verificar atualização” consulta o arquivo já publicado; não dispara coleta nem grava dados no banco.</p></details>
    </div>
  </section>;
}
