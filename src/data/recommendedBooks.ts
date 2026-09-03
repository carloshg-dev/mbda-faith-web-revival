export interface RecommendedBook {
  slug: string;
  title: string;
  author: string;
  description: string;
  image: string;
  imageSrcSet?: string;
  href?: string;
  linkLabel?: string;
}

export const recommendedBooks: RecommendedBook[] = [
  {
    slug: "tessalonicenses-visao-de-uma-igreja-local",
    title: "Tessalonicenses — visão de uma igreja local",
    author: "Editora Cristã Evangélica",
    description:
      "A revista que orienta a série atual da Escola Bíblica, percorrendo as duas cartas de Paulo e a esperança da volta de Cristo.",
    image: "/images/site/blog/tessalonicenses-evento-480.webp",
    imageSrcSet:
      "/images/site/blog/tessalonicenses-evento-480.webp 480w, /images/site/blog/tessalonicenses-evento-900.webp 900w",
    href: "https://loja.editoracristaevangelica.com.br/cartas-aos-tessalonicenses-revista-do-aluno.html",
    linkLabel: "Conhecer na editora",
  },
];
