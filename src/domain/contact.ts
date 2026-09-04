export interface ContactInput { name: string; email: string; message: string; honeypot: string }
export function validContactEmail(value: string): boolean {
  const email = value.trim();
  if (email.length > 254 || /[<>"\r\n]/.test(value)) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  return local.length > 0 && local.length <= 64 && !local.startsWith(".") && !local.endsWith(".")
    && !local.includes("..") && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)
    && /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(domain);
}
export function validateContact(input: ContactInput): string | null {
  if (input.honeypot) return "Não foi possível enviar. Tente novamente.";
  if (input.name.trim().length < 2 || input.name.trim().length > 80) return "Informe seu nome, entre 2 e 80 caracteres.";
  if (!validContactEmail(input.email)) return "Confira o endereço de e-mail.";
  if (input.message.trim().length < 10 || input.message.length > 3000) return "Escreva uma mensagem entre 10 e 3.000 caracteres.";
  return null;
}
export const escapeTemplateText = (text: string) => text.replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]!));
