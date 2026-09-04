import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, MapPin, Send } from "lucide-react";
import { CHURCH } from "../../data/church";
import { EMAILJS_CONFIG } from "../../config/emailjs";
import { escapeTemplateText, validateContact } from "../../domain/contact";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [error, setError] = useState("");
  const lock = useRef(false);
  const lastAttempt = useRef(0);
  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (lock.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const input = {name:String(values.get("name")??""), email:String(values.get("email")??""), message:String(values.get("message")??""), honeypot:String(values.get("website")??"")};
    const validation = validateContact(input);
    if (validation) { setError(validation); setStatus("error"); return; }
    if (Date.now() - lastAttempt.current < 60_000) { setError("Aguarde um minuto antes de tentar novamente. Você também pode falar conosco pelo WhatsApp."); setStatus("error"); return; }
    lock.current = true; lastAttempt.current = Date.now(); setStatus("sending"); setError("");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        name:escapeTemplateText(input.name.trim()), email:escapeTemplateText(input.email.trim().toLowerCase()),
        message:escapeTemplateText(input.message.trim()), timestamp:new Date().toLocaleString("pt-BR", {timeZone:"America/Sao_Paulo"}),
      }, {publicKey:EMAILJS_CONFIG.PUBLIC_KEY, limitRate:{id:"church-contact",throttle:60_000}});
      form.reset(); setStatus("success");
    } catch {
      setError("Não conseguimos enviar sua mensagem. Tente novamente em um minuto ou use o WhatsApp. Seu texto foi mantido.");
      setStatus("error");
    } finally { lock.current = false; }
  };
  return <section id="contato" className="section-space contact-section" aria-labelledby="contact-title">
    <div className="content-width contact-layout">
      <div><h2 id="contact-title">Há lugar<br />para você aqui.</h2><span className="gold-rule" aria-hidden="true" /><p>Vai nos visitar ou quer conversar com a igreja? Será um prazer receber sua mensagem.</p><address><MapPin aria-hidden="true" /><span>{CHURCH.address}<br />{CHURCH.neighborhood}<br />{CHURCH.city}</span></address><a className="button button-blue" href={CHURCH.maps} target="_blank" rel="noopener noreferrer">Como chegar <ArrowUpRight aria-hidden="true" /></a><a className="inline-link" href={CHURCH.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp · {CHURCH.phone}<ArrowUpRight aria-hidden="true" /></a></div>
      <form className="contact-form" onSubmit={send}>
        <h3>Fale com a Reconciliação</h3>
        <p className="fine-print">Todos os campos são obrigatórios. Não envie informações sensíveis.</p>
        <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        <div className="form-row"><div><label htmlFor="contact-name">Seu nome</label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={80} /></div><div><label htmlFor="contact-email">E-mail</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div>
        <label htmlFor="contact-message">Como podemos ajudar?</label><textarea id="contact-message" name="message" rows={5} minLength={10} maxLength={3000} required aria-describedby="message-limit" /><p className="fine-print" id="message-limit">De 10 a 3.000 caracteres.</p>
        {status === "error" && <p role="alert" className="form-error">{error}</p>}
        {status === "success" && <p role="status" className="form-success">Mensagem enviada. Obrigado por entrar em contato!</p>}
        <button className="button button-gold" type="submit" disabled={status === "sending"}><Send aria-hidden="true" />{status === "sending" ? "Enviando mensagem…" : "Enviar mensagem"}</button>
        <p className="fine-print">Ao enviar, seu nome, e-mail e mensagem serão encaminhados à igreja pelo EmailJS.</p>
      </form>
    </div>
  </section>;
}
