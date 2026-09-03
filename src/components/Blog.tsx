import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mic2,
} from "lucide-react";
import {
  THESSALONIANS_EVENT,
  THESSALONIANS_SOURCES,
  thessaloniansStudy,
} from "../data/tessalonians";
import { recommendedBooks } from "../data/recommendedBooks";
import { useSEO } from "../hooks/useSEO";
import SiteFooter from "./site/SiteFooter";
import SiteHeader from "./site/SiteHeader";

const BLOG_SEO = {
  title: "Tessalonicenses · Escola Bíblica da Reconciliação",
  description:
    "Guia de estudo autoral sobre 1 e 2 Tessalonicenses: contexto, palavras-chave, ideias centrais e aplicações para a igreja local.",
  keywords:
    "Tessalonicenses, escola bíblica, EBD, estudo bíblico, volta de Cristo, igreja local, Ministério Bíblico da Reconciliação",
  ogTitle: "Tessalonicenses · Visão de uma igreja local",
  ogDescription:
    "Acompanhe a nova série da Escola Bíblica com um guia de leitura sobre fé, santidade, comunhão e a volta de Cristo.",
};

export default function Blog() {
  useSEO(BLOG_SEO);

  const [selected, setSelected] = useState(0);
  const section = thessaloniansStudy[selected];
  const article = useRef<HTMLElement>(null);
  const previous = useRef(selected);

  useEffect(() => {
    if (previous.current !== selected) {
      article.current?.scrollIntoView({ block: "start" });
      article.current?.focus({ preventScroll: true });
    }
    previous.current = selected;
  }, [selected]);

  useEffect(() => {
    if (window.location.hash !== "#livros") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("livros")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const chooseSection = (index: number) => {
    if (index >= 0 && index < thessaloniansStudy.length) setSelected(index);
  };

  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="blog-page">
        <header className="blog-intro dark-section">
          <div className="content-width blog-hero-grid">
            <div className="blog-hero-copy">
              <a className="inline-link" href="/">
                Voltar à igreja
              </a>
              <h1>Tessalonicenses</h1>
              <p className="blog-subtitle">Visão de uma igreja local</p>
              <p className="blog-introduction">
                Uma jornada pelas duas cartas de Paulo para descobrir como fé,
                amor e esperança formam uma igreja firme — enquanto ela vive o
                presente à luz da volta de Cristo.
              </p>

              <ul className="study-event-details" aria-label="Informações da Escola Bíblica">
                <li>
                  <CalendarDays aria-hidden="true" />
                  <span>
                    <small>Aula inaugural</small>
                    <strong>{THESSALONIANS_EVENT.date}</strong>
                  </span>
                </li>
                <li>
                  <Clock3 aria-hidden="true" />
                  <span>
                    <small>Domingo</small>
                    <strong>{THESSALONIANS_EVENT.time}</strong>
                  </span>
                </li>
                <li>
                  <Mic2 aria-hidden="true" />
                  <span>
                    <small>Ministração</small>
                    <strong>{THESSALONIANS_EVENT.teacher}</strong>
                  </span>
                </li>
              </ul>
            </div>

            <figure className="blog-event-art">
              <img
                src="/images/site/blog/tessalonicenses-evento-480.webp"
                srcSet="/images/site/blog/tessalonicenses-evento-480.webp 480w, /images/site/blog/tessalonicenses-evento-900.webp 900w"
                sizes="(max-width: 640px) calc(100vw - 40px), 340px"
                width="900"
                height="1600"
                alt="Arte da Escola Bíblica sobre a primeira e a segunda cartas de Paulo aos Tessalonicenses"
                decoding="async"
              />
              <figcaption>Escola Bíblica · Ministério Bíblico da Reconciliação</figcaption>
            </figure>
          </div>
        </header>

        <div className="content-width blog-layout section-space">
          <aside className="study-sidebar">
            <nav className="reflection-index" aria-label="Roteiro do estudo">
              <h2>Roteiro de estudo</h2>
              {thessaloniansStudy.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-current={index === selected ? "step" : undefined}
                  onClick={() => chooseSection(index)}
                >
                  <span>{item.lessonRange}</span>
                  {item.navLabel}
                </button>
              ))}
            </nav>

            <section className="study-sources" aria-labelledby="study-sources-title">
              <h2 id="study-sources-title">Para continuar</h2>
              <p>
                Esta síntese autoral foi construída a partir do sumário e da
                amostra oficial. Ela acompanha a leitura, mas não substitui a revista.
              </p>
              <a href={THESSALONIANS_SOURCES.publisher} target="_blank" rel="noopener noreferrer">
                Revista na editora oficial <ExternalLink aria-hidden="true" />
              </a>
              <a href={THESSALONIANS_SOURCES.sample} target="_blank" rel="noopener noreferrer">
                Ler a amostra oficial <ExternalLink aria-hidden="true" />
              </a>
              <a href={THESSALONIANS_SOURCES.perlego} target="_blank" rel="noopener noreferrer">
                Consultar no Perlego <ExternalLink aria-hidden="true" />
              </a>
            </section>
          </aside>

          <article ref={article} tabIndex={-1} className="reflection-article">
            <p className="sr-only" aria-live="polite">
              Agora lendo {section.title}
            </p>
            <h2>{section.title}</h2>
            <p className="reflection-verse">
              <span>{section.lessonRange}</span>
              {section.reading}
            </p>
            <p className="reflection-lead">{section.summary}</p>

            <div className="study-keywords" aria-label="Palavras-chave">
              {section.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>

            <h3>Contexto</h3>
            <p>{section.context}</p>

            <h3>Ideias-chave</h3>
            <ul className="study-key-points">
              {section.keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <section className="study-application" aria-labelledby="study-application-title">
              <h3 id="study-application-title">Para viver a Palavra</h3>
              <p>{section.application}</p>
            </section>

            <h3>Para conversar em classe</h3>
            <ol className="study-questions">
              {section.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>

            <nav className="reflection-navigation" aria-label="Continuar o estudo">
              <button
                className="button button-outline"
                type="button"
                disabled={selected === 0}
                onClick={() => chooseSection(selected - 1)}
              >
                <ChevronLeft aria-hidden="true" />
                Anterior
              </button>
              <span>
                {selected + 1} de {thessaloniansStudy.length}
              </span>
              <button
                className="button button-outline"
                type="button"
                disabled={selected === thessaloniansStudy.length - 1}
                onClick={() => chooseSection(selected + 1)}
              >
                Próximo
                <ChevronRight aria-hidden="true" />
              </button>
            </nav>
          </article>
        </div>

        <section id="livros" className="book-stand dark-section" aria-labelledby="book-stand-title">
          <div className="content-width">
            <div className="book-stand-heading">
              <h2 id="book-stand-title">Livros para ir mais fundo.</h2>
              <p>
                Leituras recomendadas para acompanhar estudos, seminários e a
                caminhada da igreja. Novos títulos serão adicionados ao acervo
                conforme forem indicados.
              </p>
            </div>

            <div className="book-shelf">
              {recommendedBooks.map((book) => (
                <article className="recommended-book" key={book.slug}>
                  <div className="recommended-book-cover">
                    <img
                      src={book.image}
                      srcSet={book.imageSrcSet}
                      sizes="(max-width: 640px) 180px, 210px"
                      width="480"
                      height="854"
                      loading="lazy"
                      decoding="async"
                      alt={`Capa ou arte de divulgação de ${book.title}`}
                    />
                  </div>
                  <div className="recommended-book-copy">
                    <h3>{book.title}</h3>
                    <p className="recommended-book-author">{book.author}</p>
                    <p>{book.description}</p>
                    {book.href && (
                      <a href={book.href} target="_blank" rel="noopener noreferrer" className="inline-link">
                        {book.linkLabel ?? "Conhecer o livro"}
                        <ExternalLink aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
