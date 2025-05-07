import { createI18n } from 'vue-i18n';
import en from './locales/en';
import es from './locales/es';
import ptBR from './locales/pt-BR';

const i18n = createI18n({
  locale: 'pt-BR', // Default locale
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
    en,
    es,
  },
});

export default i18n;