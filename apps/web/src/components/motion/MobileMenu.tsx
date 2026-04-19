import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LangSwitcher from './LangSwitcher';

interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

interface Props {
  navItems?: NavItem[];
  homeLabel?: string;
  companyLabel?: string;
  contactLabel?: string;
  startProjectLabel?: string;
  prefix?: string;
}

export default function MobileMenu({
  navItems = [],
  homeLabel = 'Home',
  companyLabel = 'Company',
  contactLabel = 'Contact',
  startProjectLabel = 'Start a project',
  prefix = '',
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex items-center justify-center w-9 h-9 rounded-md text-text-2 hover:text-text-1 hover:bg-bg-2 transition-colors"
      >
        <span aria-hidden="true">
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav"
              ref={menuRef}
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: '0%' }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(288px,85vw)] bg-bg-1 border-l border-border flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-border">
                <a
                  href={`${prefix}/`}
                  className="text-sm font-semibold text-text-1"
                  onClick={() => setOpen(false)}
                >
                  Oultra
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-8 h-8 rounded-md text-text-2 hover:text-text-1 hover:bg-bg-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <nav className="flex-1 px-3 py-5 overflow-y-auto">
                <ul role="list" className="space-y-0.5">
                  <li>
                    <a
                      href={`${prefix}/`}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-text-2 hover:text-text-1 hover:bg-bg-2 transition-colors"
                    >
                      {homeLabel}
                    </a>
                  </li>
                  {navItems.map(item => (
                    <li key={item.href + item.label}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center pl-7 pr-3 py-2.5 rounded-md text-sm text-text-3 hover:text-text-2 hover:bg-bg-2 transition-colors"
                      >
                        <span className="mr-2 text-text-3" aria-hidden="true">↳</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={`${prefix}/company`}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-text-2 hover:text-text-1 hover:bg-bg-2 transition-colors"
                    >
                      {companyLabel}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${prefix}/contact`}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-text-2 hover:text-text-1 hover:bg-bg-2 transition-colors"
                    >
                      {contactLabel}
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="p-4 border-t border-border space-y-3">
                <div className="flex justify-center">
                  <LangSwitcher />
                </div>
                <a
                  href={`${prefix}/contact`}
                  className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-white bg-accent-1 hover:bg-blue-500 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {startProjectLabel}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
