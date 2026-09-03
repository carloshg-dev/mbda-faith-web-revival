export default function HomeHero() {
  return <section className="home-hero" aria-labelledby="welcome-title">
    <div className="hero-scene" aria-hidden="true" />
    <div className="hero-inner">
      <div className="hero-copy">
        <p className="church-name">Ministério Bíblico da Reconciliação</p>
        <h1 id="welcome-title">Uma fé que<br />nos reúne.</h1>
        <p className="hero-description">Ensino da Palavra, comunhão e cuidado<br className="desktop-break" /> com famílias. Há mais de 23 anos, em Guarujá.</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#quem-somos">Conheça nossa igreja</a>
          <a className="text-link" href="#agenda">Veja a agenda</a>
        </div>
      </div>
      <div className="anniversary-frame"><img className="anniversary-mark" src="/images/site/logo-23anos.webp" alt="Reconciliação — 23 anos" width="720" height="720" /></div>
    </div>
  </section>;
}
