import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [["/#quem-somos", "A igreja"], ["/#agenda", "Agenda"], ["/#comunidade", "Comunidade"], ["/blog#livros", "Livros"], ["/#reconnews", "ReconNews"]] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="site-header">
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <div className="site-nav">
      <a href="/" className="brand" aria-label="Reconciliação — início">
        <img src="/images/site/logo-evergreen.webp" alt="" width="64" height="64" />
        <span>Reconciliação</span>
      </a>
      <button ref={trigger} type="button" className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav id="main-navigation" aria-label="Navegação principal" className={open ? "main-navigation is-open" : "main-navigation"}>
        {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="visit-link" href="/#contato" onClick={() => setOpen(false)}>Planeje sua visita</a>
      </nav>
    </div>
  </header>;
}
