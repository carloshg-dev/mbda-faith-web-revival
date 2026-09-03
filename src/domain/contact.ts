export interface ContactInput { name: string; email: string; message: string; honeypot: string }
export function validateContact(input: ContactInput): string | null {
  if (input.honeypot) return "Não foi possível enviar. Tente novamente.";
  if (input.name.trim().length < 2 || input.name.trim().length > 80) return "Informe seu nome, entre 2 e 80 caracteres.";
  if (input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return "Confira o endereço de e-mail.";
  if (input.message.trim().length < 10 || input.message.length > 3000) return "Escreva uma mensagem entre 10 e 3.000 caracteres.";
  return null;
}
export const escapeTemplateText = (text: string) => text.replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]!));
