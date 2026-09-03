// Configuração do EmailJS
// Public identifiers only. Provider-side domain restrictions and anti-abuse settings require review.

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_j2rcgbd',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ps1vxah',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'X1cKWT3OTz3QZf-7r',
};
