import { CalendarDays, ChevronRight } from "lucide-react";
import { eventPhoto, WEEKLY_SCHEDULE } from "../../data/church";

export default function WeeklyPreview() {
  return <section className="weekly-preview" aria-labelledby="weekly-preview-title">
    <div className="content-width weekly-grid">
      <div>
        <h2 id="weekly-preview-title">A semana na Reconciliação</h2>
        <span className="gold-rule" aria-hidden="true" />
        <div className="schedule-preview">
          {WEEKLY_SCHEDULE.slice(0, 3).map(item => <a href="#agenda" className="schedule-row" key={item.time} aria-label={`${item.day}, ${item.time}, ${item.title}. Ver agenda completa`}>
            <CalendarDays aria-hidden="true" /><span>{item.short}</span><time>{item.time}</time><span>{item.title}</span><ChevronRight aria-hidden="true" />
          </a>)}
        </div>
      </div>
      <a className="event-teaser" href="#comunidade">
        <img src={eventPhoto("032", 480)} srcSet={`${eventPhoto("032",480)} 480w, ${eventPhoto("032",720)} 720w`} sizes="(max-width: 760px) 90vw, 36vw" width="720" height="1280" alt="Casal participante de um evento da Reconciliação" loading="lazy" decoding="async" />
        <span>Eventos da Reconciliação <ChevronRight aria-hidden="true" /></span>
      </a>
    </div>
  </section>;
}
