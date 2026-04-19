import en from '@/data/translations/en';
import es from '@/data/translations/es';

export type Locale = 'en' | 'es';
export type { Translations } from '@/data/translations/en';

export function useTranslations(locale: string | undefined) {
  return locale === 'es' ? es : en;
}
