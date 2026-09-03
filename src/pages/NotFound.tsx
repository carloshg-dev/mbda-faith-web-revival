import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
export default function NotFound() {
  return <><SiteHeader /><main id="conteudo" className="not-found content-width"><span>404</span><h1>Este caminho não foi encontrado.</h1><p>A página pode ter mudado de endereço. Volte ao início para encontrar a agenda, as notícias e os conteúdos da igreja.</p><a className="button button-blue" href="/">Voltar ao início</a></main><SiteFooter /></>;
}
