import { useEffect, useState } from 'react';

export default function LangSwitcher() {
  const [locale, setLocale] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const isEs = window.location.pathname.startsWith('/es');
    setLocale(isEs ? 'es' : 'en');
  }, []);

  function switchTo(target: 'en' | 'es') {
    if (target === locale) return;
    const path = window.location.pathname;
    let next: string;
    if (target === 'es') {
      next = path === '/' ? '/es/' : `/es${path}`;
    } else {
      next = path.replace(/^\/es/, '') || '/';
    }
    localStorage.setItem('oultra-lang', target);
    window.location.href = next;
  }

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="flex items-center rounded-md border border-border overflow-hidden text-xs font-medium"
    >
      <button
        onClick={() => switchTo('en')}
        aria-pressed={locale === 'en'}
        className={`px-2.5 py-1.5 transition-colors duration-fast ${
          locale === 'en'
            ? 'bg-bg-3 text-text-1'
            : 'text-text-3 hover:text-text-2'
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-border" aria-hidden="true" />
      <button
        onClick={() => switchTo('es')}
        aria-pressed={locale === 'es'}
        className={`px-2.5 py-1.5 transition-colors duration-fast ${
          locale === 'es'
            ? 'bg-bg-3 text-text-1'
            : 'text-text-3 hover:text-text-2'
        }`}
      >
        ES
      </button>
    </div>
  );
}
