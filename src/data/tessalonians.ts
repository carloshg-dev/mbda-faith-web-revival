export interface ThessaloniansStudySection {
  navLabel: string;
  title: string;
  lessonRange: string;
  reading: string;
  summary: string;
  keywords: string[];
  context: string;
  keyPoints: string[];
  application: string;
  questions: string[];
}

export const THESSALONIANS_EVENT = {
  title: "Escola Bíblica — 1ª e 2ª epístolas de Paulo aos Tessalonicenses",
  date: "13 de setembro de 2026",
  time: "9h e 11h",
  teacher: "Pr. Luiz Carlos Aparício",
} as const;

export const THESSALONIANS_SOURCES = {
  publisher: "https://loja.editoracristaevangelica.com.br/cartas-aos-tessalonicenses-revista-do-aluno.html",
  sample: "https://portal.editoracristaevangelica.com.br/media/9Kd6urRKmxIIJefs1vkn5UUu4kZkOm5I/download",
  perlego: "https://www.perlego.com/book/3957744/tessalonicenses-revista-do-aluno-viso-de-uma-igreja-local-pdf",
} as const;

export const thessaloniansStudy: ThessaloniansStudySection[] = [
  {
    navLabel: "Tessalônica e a missão",
    title: "Uma igreja nasce no cruzamento do mundo",
    lessonRange: "Lição 1",
    reading: "Atos 17:1-10 · 1 Tessalonicenses 1:1-10",
    summary: "As cartas começam com uma comunidade jovem, formada em meio à oposição e situada numa cidade estratégica. Tessalônica ligava rotas, comércio e culturas; por isso, a fé recebida ali rapidamente encontrou caminhos para alcançar outros lugares.",
    keywords: ["Tessalônica", "evangelho", "oposição", "missão", "igreja local"],
    context: "Paulo chegou à cidade durante sua segunda viagem missionária, acompanhado por Silas e Timóteo, por volta de 49 ou 50 d.C. O anúncio de Jesus como o Cristo produziu conversões, mas também resistência. A saída apressada dos missionários deixou uma igreja nova, necessitada de cuidado, ensino e encorajamento.",
    keyPoints: [
      "A igreja surge porque o evangelho é anunciado e acolhido, não porque todas as condições são favoráveis.",
      "Uma comunidade local pode exercer influência muito além de seu endereço quando vive e comunica a fé.",
      "Oposição e fragilidade não anulam a obra de Deus; tornam ainda mais necessário o discipulado.",
    ],
    application: "Olhe para o lugar onde Deus colocou a igreja: bairro, família, trabalho e cidade também são caminhos de missão. A pergunta não é apenas como preservar a comunidade, mas como permitir que o evangelho se espalhe por meio dela.",
    questions: [
      "Que características do nosso contexto se parecem com os desafios de Tessalônica?",
      "Por quais caminhos o testemunho da igreja pode alcançar pessoas além de seus encontros?",
    ],
  },
  {
    navLabel: "Uma igreja modelo",
    title: "Fé que trabalha, amor que serve, esperança que permanece",
    lessonRange: "Lição 2",
    reading: "1 Tessalonicenses 1:1-10",
    summary: "Paulo reconhece maturidade não por tamanho, orçamento ou quantidade de atividades, mas por virtudes que se tornam visíveis. Fé, amor e esperança formam uma comunidade que serve, suporta a pressão e aponta para Cristo.",
    keywords: ["fé", "amor", "esperança", "testemunho", "perseverança"],
    context: "Os tessalonicenses receberam a mensagem em circunstâncias difíceis e se tornaram referência para outros crentes. Sua transformação alcançou escolhas, relacionamentos e testemunho público. A igreja modelo não é apresentada como perfeita, mas como uma comunidade em movimento, moldada pelo evangelho.",
    keyPoints: [
      "A fé bíblica produz ação e obediência concretas.",
      "O amor assume trabalho, cuidado e responsabilidade pelo próximo.",
      "A esperança na volta de Cristo sustenta perseverança no presente.",
    ],
    application: "Avalie a saúde da igreja pelo fruto espiritual que ela produz. Programas são ferramentas; o alvo é formar pessoas cuja confiança em Cristo aparece no serviço, no amor e na constância.",
    questions: [
      "Onde nossa fé já se tornou serviço visível?",
      "O que a esperança cristã muda em nossa maneira de atravessar dificuldades?",
    ],
  },
  {
    navLabel: "Liderança que cuida",
    title: "Autoridade com verdade, afeto e responsabilidade",
    lessonRange: "Lições 3 a 5",
    reading: "1 Tessalonicenses 2:1–3:13",
    summary: "O ministério de Paulo é descrito por motivações transparentes, coragem para anunciar a verdade e profundo cuidado pelas pessoas. Liderança cristã não é domínio: é mordomia, presença, exemplo e disposição para formar outros.",
    keywords: ["liderança", "mordomia", "sinceridade", "cuidado", "parceria"],
    context: "Distante da igreja e impedido de retornar, Paulo explicou sua ausência e enviou Timóteo para fortalecer os irmãos. Suas palavras revelam uma liderança que combina ternura e firmeza, trabalha em equipe e transforma preocupação pastoral em oração e acompanhamento.",
    keyPoints: [
      "O caráter do mensageiro deve confirmar a mensagem que ele anuncia.",
      "Cuidar envolve ouvir notícias, compartilhar cargas e fortalecer quem enfrenta oposição.",
      "Parcerias saudáveis reconhecem limites pessoais e mantêm a missão avançando.",
    ],
    application: "Liderar é servir ao crescimento espiritual de pessoas reais. Honestidade, abertura, oração e acompanhamento constante protegem a igreja de uma liderança baseada apenas em posição ou visibilidade.",
    questions: [
      "Que marcas de cuidado pastoral aparecem em nossas relações?",
      "Como podemos apoiar melhor aqueles que ensinam e acompanham a igreja?",
    ],
  },
  {
    navLabel: "Santidade cotidiana",
    title: "Uma vida que agrada a Deus no corpo e nos relacionamentos",
    lessonRange: "Lições 4 e 6",
    reading: "1 Tessalonicenses 3:1–4:8",
    summary: "A fidelidade cristã atravessa sofrimento, desejos e decisões íntimas. Paulo liga santidade à vontade de Deus e mostra que pureza não é isolamento do mundo, mas uma vida inteira colocada sob o senhorio de Cristo.",
    keywords: ["fidelidade", "santidade", "pureza", "ética", "autocontrole"],
    context: "A comunidade enfrentava pressão externa e precisava de formação moral interna. As exortações alcançam sexualidade, domínio próprio, respeito ao outro e integridade. A esperança futura nunca serve como fuga das responsabilidades presentes.",
    keyPoints: [
      "Santificação é uma caminhada orientada pela vontade de Deus.",
      "O corpo e a sexualidade também pertencem à vida de discipulado.",
      "Fidelidade em meio à oposição depende da presença e da graça de Deus.",
    ],
    application: "Leve a fé para as áreas que costumam permanecer escondidas. A igreja deve ensinar a verdade com clareza e oferecer um ambiente de graça, responsabilidade e restauração.",
    questions: [
      "Em quais escolhas práticas precisamos alinhar convicção e comportamento?",
      "Como falar de santidade sem separar verdade, graça e cuidado?",
    ],
  },
  {
    navLabel: "Trabalho e testemunho",
    title: "Esperar por Cristo sem abandonar o presente",
    lessonRange: "Lição 7",
    reading: "1 Tessalonicenses 4:9-12 · 2 Tessalonicenses 3:6-13",
    summary: "A expectativa da volta de Jesus não produz passividade. Paulo relaciona amor fraternal, trabalho diário, responsabilidade e bom testemunho. A esperança cristã organiza o cotidiano em vez de dispensá-lo.",
    keywords: ["trabalho", "responsabilidade", "amor fraternal", "reputação", "serviço"],
    context: "Alguns crentes haviam deixado suas responsabilidades e se tornado peso para a comunidade. As cartas corrigem essa distorção: trabalhar com serenidade, cuidar do que é próprio e perseverar no bem fazem parte da ética do Reino.",
    keyPoints: [
      "Trabalho honesto pode ser uma expressão de amor ao próximo.",
      "A comunidade acolhe necessidades reais sem premiar a irresponsabilidade.",
      "A vida comum também comunica a credibilidade do evangelho.",
    ],
    application: "Considere profissão, estudo, casa e serviço na igreja como campos de fidelidade. A espiritualidade cristã não despreza tarefas comuns; ela lhes dá propósito e direção.",
    questions: [
      "Nosso modo de trabalhar reforça ou enfraquece nosso testemunho?",
      "Como unir generosidade e responsabilidade no cuidado comunitário?",
    ],
  },
  {
    navLabel: "A volta de Cristo",
    title: "Esperança para o luto, vigilância para a vida",
    lessonRange: "Lições 8 e 9",
    reading: "1 Tessalonicenses 4:13–5:11",
    summary: "O ensino sobre a volta de Cristo nasce para consolar, fortalecer e despertar. Diante da morte, a igreja não fica sem esperança; diante do futuro, ela não vive em especulação, mas em sobriedade, fé, amor e prontidão.",
    keywords: ["volta de Cristo", "ressurreição", "esperança", "consolo", "vigilância"],
    context: "Os tessalonicenses tinham dúvidas sobre os irmãos que morreram antes da vinda do Senhor. Paulo responde com a certeza da ressurreição e da reunião com Cristo. Em seguida, desloca o foco do calendário para a postura: filhos da luz vivem atentos e encorajam uns aos outros.",
    keyPoints: [
      "A ressurreição de Cristo sustenta a esperança diante da morte.",
      "A promessa da sua vinda consola a comunidade e chama à perseverança.",
      "Vigilância bíblica é fidelidade diária, não ansiedade por previsões.",
    ],
    application: "Use a doutrina para cuidar de pessoas, não para alimentar medo. A esperança cristã deve produzir consolo no luto, coragem na aflição e uma vida preparada para encontrar o Senhor.",
    questions: [
      "Como a ressurreição transforma nossa maneira de enfrentar o luto?",
      "Que diferença existe entre vigilância espiritual e especulação?",
    ],
  },
  {
    navLabel: "Harmonia e discernimento",
    title: "Uma comunidade que não apaga a ação do Espírito",
    lessonRange: "Lições 10 a 12",
    reading: "1 Tessalonicenses 5:12-28",
    summary: "A primeira carta termina dentro da vida comunitária: respeito, paz, paciência, encorajamento, oração, gratidão e discernimento. A espiritualidade madura acolhe a ação de Deus e, ao mesmo tempo, examina tudo com responsabilidade.",
    keywords: ["harmonia", "oração", "gratidão", "discernimento", "santificação"],
    context: "Paulo dirige recomendações a líderes e membros. Os desanimados precisam de encorajamento, os fracos de amparo e todos de longanimidade. Alegria e oração caminham com o exame cuidadoso do ensino e com a escolha do que é bom.",
    keyPoints: [
      "Paz comunitária exige respeito, paciência e cuidado diferenciado.",
      "Oração e gratidão formam uma comunidade atenta à presença de Deus.",
      "Discernimento evita tanto a credulidade quanto o desprezo precipitado.",
    ],
    application: "Cultive uma igreja onde correção e encorajamento caminham juntos. A maturidade aparece quando a verdade é examinada, o bem é preservado e pessoas frágeis não são deixadas para trás.",
    questions: [
      "Quem precisa hoje de encorajamento, amparo ou paciência?",
      "Como podemos crescer em discernimento sem apagar a vida espiritual?",
    ],
  },
  {
    navLabel: "Permanecer firmes",
    title: "Verdade, perseverança e Palavra até o fim",
    lessonRange: "Lições 13 a 17",
    reading: "2 Tessalonicenses 1:1–3:18",
    summary: "A segunda carta fortalece uma igreja perseguida, corrige confusões sobre o Dia do Senhor e chama os crentes a permanecerem firmes no ensino recebido. A esperança continua central, agora acompanhada por discernimento contra o engano e compromisso renovado com a Palavra.",
    keywords: ["perseverança", "verdade", "discernimento", "Palavra", "proclamação"],
    context: "A comunidade sofria oposição severa, havia sido perturbada por um ensino apresentado falsamente como apostólico e ainda enfrentava desordem no trabalho. Paulo responde com oração, esclarecimento doutrinário e exortação prática.",
    keyPoints: [
      "Sofrimento não significa abandono; a igreja persevera confiando na justiça de Deus.",
      "A verdade recebida nas Escrituras protege contra mensagens alarmistas e falsificadas.",
      "Permanecer firme inclui orar pela expansão da Palavra, obedecer e não se cansar de fazer o bem.",
    ],
    application: "Enfrente confusão com Bíblia aberta, oração e vida responsável. Uma igreja preparada para o futuro é aquela que permanece na verdade e continua proclamando o evangelho no presente.",
    questions: [
      "Que critérios usamos para reconhecer e rejeitar um ensino enganoso?",
      "Como perseverar no bem quando a oposição ou o cansaço aumentam?",
    ],
  },
];
