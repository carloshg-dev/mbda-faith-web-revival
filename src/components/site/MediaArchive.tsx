import { useState } from "react";
const artwork = [["5solas","Os cinco solas"],["atos","Estudo de Atos"],["reforma","A Reforma Protestante"],["apocalipse","Apocalipse"],["salmos","Os Salmos"],["fundamentos","Fundamentos da fé"]] as const;
export default function MediaArchive() {
  const [open,setOpen]=useState(false);
  return <section id="midia" className="media-archive content-width"><details onToggle={event=>setOpen(event.currentTarget.open)}><summary>Do nosso acervo · artes e estudos</summary><p>Materiais da história do ministério. As datas e os horários impressos podem não corresponder à programação atual.</p>{open && <div className="artwork-grid">{artwork.map(([file,title])=><a href={`/images/site/${file}.webp`} key={file} target="_blank" rel="noopener noreferrer"><img src={`/images/site/${file}.webp`} alt={title} width="900" height={['apocalipse','salmos','fundamentos'].includes(file)?600:506} loading="lazy" decoding="async" /><span>{title} · ampliar</span></a>)}</div>}</details></section>;
}
