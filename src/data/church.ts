export const CHURCH = {
  name: "Ministério Bíblico da Reconciliação",
  address: "Av. Osvaldo Aranha, 790",
  neighborhood: "Jardim Maravilha (Vicente de Carvalho)",
  city: "Guarujá/SP · CEP 11470-100",
  whatsapp: "https://wa.me/5513981517913",
  phone: "+55 (13) 98151-7913",
  maps: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Av. Osvaldo Aranha 790 Guarujá SP 11470-100"),
  youtube: "https://www.youtube.com/@mbdareconciliacao",
  instagram: "https://www.instagram.com/mbdareconciliacao/",
  facebook: "https://www.facebook.com/reconciliacaoguaruja",
} as const;

export const WEEKLY_SCHEDULE = [
  { day: "Domingo", short: "DOM", time: "08h", title: "Oração", format: "Presencial" },
  { day: "Domingo", short: "DOM", time: "09h", title: "Escola Bíblica", format: "Presencial" },
  { day: "Domingo", short: "DOM", time: "11h", title: "Ministração da Palavra", format: "Presencial" },
  { day: "Quarta-feira", short: "QUA", time: "20h", title: "Oração e Palavra", format: "Presencial" },
] as const;

export const MONTHLY_GATHERINGS = [
  { cadence: "1º domingo de cada mês", shortCadence: "1º DOM", title: "Ceia do Senhor" },
  { cadence: "Último domingo de cada mês", shortCadence: "ÚLT. DOM", title: "Culto da Família" },
] as const;

export type EventPhoto = {
  id: string;
  kind: "couple" | "community" | "pastor" | "baptism";
  width: number;
  height: number;
  alt?: string;
};

export const BAPTISM_EVENT = {
  title: "Culto Especial de Batismo",
  date: "26 de agosto de 2026",
  dateTime: "2026-08-26",
  description: "Fé, confissão pública e novos começos em uma caminhada de discipulado com Cristo.",
  youtube: "https://www.youtube.com/watch?v=lyla5Gl2oBI",
} as const;

export const EVENT_PHOTOS = [
  { id: "batismo-01", kind: "baptism", width: 720, height: 1560, alt: "Participantes do batismo reunidos junto à tribuna antes da celebração" },
  { id: "032", kind: "couple", width: 720, height: 1280 },
  { id: "004", kind: "couple", width: 720, height: 1280 },
  { id: "005", kind: "couple", width: 720, height: 1280 },
  { id: "batismo-02", kind: "baptism", width: 720, height: 1560, alt: "Batizanda sendo acolhida na piscina durante o culto especial" },
  { id: "011", kind: "couple", width: 719, height: 1280 },
  { id: "019", kind: "couple", width: 720, height: 1280 },
  { id: "batismo-03", kind: "baptism", width: 720, height: 1560, alt: "Novo membro sendo recebido ao sair das águas do batismo" },
  { id: "020", kind: "couple", width: 719, height: 1280 },
  { id: "045", kind: "pastor", width: 720, height: 1560 },
  { id: "batismo-04", kind: "baptism", width: 720, height: 405, alt: "Igreja reunida em oração durante o culto especial de batismo" },
  { id: "027", kind: "couple", width: 720, height: 1280 },
  { id: "034", kind: "couple", width: 720, height: 1280 },
  { id: "batismo-05", kind: "baptism", width: 720, height: 1560, alt: "Momento de cuidado e acolhimento após o batismo nas águas" },
  { id: "040", kind: "couple", width: 720, height: 1280 },
  { id: "042", kind: "community", width: 720, height: 1560 },
  { id: "batismo-06", kind: "baptism", width: 720, height: 405, alt: "Comunidade da Reconciliação reunida para celebrar os novos membros" },
  { id: "052", kind: "couple", width: 720, height: 1560 },
  { id: "055", kind: "community", width: 720, height: 1280 },
] as const satisfies readonly EventPhoto[];
export const eventPhoto = (id: string, width: 480 | 720) => id.startsWith("batismo-")
  ? `/images/site/eventos/${id}-${width}.webp`
  : `/images/site/eventos/evento-${id}-${width}.webp`;
