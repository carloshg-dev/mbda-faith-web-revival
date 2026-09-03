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
  kind: "couple" | "community" | "pastor";
  width: 719 | 720;
  height: 1280 | 1560;
};

export const EVENT_PHOTOS = [
  { id: "032", kind: "couple", width: 720, height: 1280 },
  { id: "004", kind: "couple", width: 720, height: 1280 },
  { id: "005", kind: "couple", width: 720, height: 1280 },
  { id: "011", kind: "couple", width: 719, height: 1280 },
  { id: "019", kind: "couple", width: 720, height: 1280 },
  { id: "020", kind: "couple", width: 719, height: 1280 },
  { id: "045", kind: "pastor", width: 720, height: 1560 },
  { id: "027", kind: "couple", width: 720, height: 1280 },
  { id: "034", kind: "couple", width: 720, height: 1280 },
  { id: "040", kind: "couple", width: 720, height: 1280 },
  { id: "042", kind: "community", width: 720, height: 1560 },
  { id: "052", kind: "couple", width: 720, height: 1560 },
  { id: "055", kind: "community", width: 720, height: 1280 },
] as const satisfies readonly EventPhoto[];
export const eventPhoto = (id: string, width: 480 | 720) => `/images/site/eventos/evento-${id}-${width}.webp`;
