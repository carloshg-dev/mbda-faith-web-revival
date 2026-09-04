import { Radio, Youtube } from "lucide-react";
import { localVideoPath, youtubeEmbedUrl } from "../domain/media";

interface VideoConfig {
  type: "youtube" | "local" | "auto";
  src: string;
  title: string;
}

const videoConfig: VideoConfig = {
  type: "local",
  src: "/videos/devocional-evangelizar-540p.mp4",
  title: "Devocional - A Obrigatoriedade de Evangelizar - Ministério Bíblico da Reconciliação",
};

const VideoPlayer = ({ config }: { config: VideoConfig }) => {
  const { type, src, title } = config;
  const embed = youtubeEmbedUrl(src);
  const videoType = type === "auto" ? (embed ? "youtube" : "local") : type;

  if (videoType === "youtube") {
    if (!embed) return <p>Vídeo indisponível.</p>;
    return (
      <iframe
        className="h-full w-full"
        src={embed}
        title={title}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  const local = localVideoPath(src);
  if (!local) return <p>Vídeo indisponível.</p>;

  return (
    <video className="h-full w-full object-cover" controls preload="none" title={title}>
      <source src={local} />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
};

const Devocional = () => {
  return (
    <section id="devocional" className="section-padding relative overflow-hidden bg-[#0a3a7f]/95">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#0f4ea8]/25 via-transparent to-[#072a59]/60" />

      <div className="container mx-auto relative z-10">
        <div className="mb-10 md:mb-12">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/90">
            Edificação
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Devocional</h2>
          <p className="mt-2 max-w-3xl text-white/75">
            Reflexões bíblicas para fortalecer sua caminhada com Deus durante a semana.
          </p>
        </div>

        <article className="rounded-2xl border border-white/20 bg-white/10 p-4 md:p-6 backdrop-blur-md shadow-[0_14px_30px_rgba(2,22,64,0.32)]">
          <div className="aspect-video overflow-hidden rounded-xl border border-white/15 bg-[#092e63]">
            <VideoPlayer config={videoConfig} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@mbdareconciliacao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1d64d8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1958bf]"
              aria-label="Visite nosso canal no YouTube"
            >
              <Youtube className="h-4 w-4" />
              Canal no YouTube
            </a>

            <a
              href="https://www.ipb.org.br/projetos-radio-ipb.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              aria-label="Ouça hinos antigos em rádio cristã"
            >
              <Radio className="h-4 w-4" />
              Rádio - Hinos Antigos
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Devocional;
