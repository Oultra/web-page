import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

type Stage = 'idle' | 'typing' | 'scanning' | 'revealing' | 'hold';

const TARGET_URL = 'https://example.com';
const TARGET_SCORE = 74;

const CATEGORIES = [
  { id: 'metadata', name: 'Metadata & Titles', score: 85 },
  { id: 'structured', name: 'Structured Data', score: 60 },
  { id: 'content', name: 'Content Quality', score: 78 },
  { id: 'performance', name: 'Performance', score: 71 },
  { id: 'accessibility', name: 'Accessibility', score: 82 },
  { id: 'crawlability', name: 'Crawlability', score: 65 },
];

const ISSUES = [
  { id: 1, severity: 'high' as const, text: 'Missing FAQ schema on 8 pages' },
  { id: 2, severity: 'high' as const, text: 'No canonical URL on product pages' },
  { id: 3, severity: 'medium' as const, text: 'Heading hierarchy breaks on 3 pages' },
];

const SEVERITY_STYLE = {
  high: 'text-danger',
  medium: 'text-warning',
  low: 'text-text-3',
};

const SEVERITY_ICON = {
  high: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1L11 10H1L6 1Z" fill="currentColor" opacity="0.9"/>
      <path d="M6 5v2.5M6 9v.5" stroke="#080a0f" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  medium: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="currentColor" opacity="0.9"/>
      <path d="M6 4v3M6 8.5v.5" stroke="#080a0f" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  low: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="currentColor" opacity="0.9"/>
      <path d="M4 6l1.5 1.5L8 4" stroke="#080a0f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function ScoreRing({ score, visible }: { score: number; visible: boolean }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <motion.circle
          cx="40" cy="40" r={r}
          fill="none"
          stroke="url(#heroGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: visible ? offset : circ }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1], delay: 0.1 }}
        />
        <defs>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <span className="text-xl font-bold text-text-1 leading-none tabular-nums">{score}</span>
        <span className="text-[9px] text-text-3 leading-none mt-0.5">/100</span>
      </motion.div>
    </div>
  );
}

export default function HeroAuditShell() {
  const [stage, setStage] = useState<Stage>('idle');
  const [cycle, setCycle] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const showScore = stage === 'revealing' || stage === 'hold';
  const showIssues = stage === 'revealing' || stage === 'hold';
  const displayUrl = stage === 'idle'
    ? ''
    : TARGET_URL.slice(0, typedChars);

  // Typing effect
  useEffect(() => {
    if (stage === 'idle') {
      setTypedChars(0);
      return;
    }
    if (stage !== 'typing') {
      setTypedChars(TARGET_URL.length);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedChars(i);
      if (i >= TARGET_URL.length) clearInterval(interval);
    }, 55);

    return () => clearInterval(interval);
  }, [stage]);

  // Scan progress
  useEffect(() => {
    if (stage === 'idle' || stage === 'typing') {
      setScanProgress(0);
      return;
    }
    if (stage !== 'scanning') {
      setScanProgress(100);
      return;
    }

    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + 2.2, 100);
      setScanProgress(Math.round(p));
      if (p >= 100) clearInterval(interval);
    }, 44);

    return () => clearInterval(interval);
  }, [stage]);

  // Main animation cycle
  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const delay = (ms: number) =>
      new Promise<void>(resolve => {
        const t = setTimeout(resolve, ms);
        if (cancelled) clearTimeout(t);
      });

    (async () => {
      await delay(800);
      if (cancelled) return;
      setStage('typing');

      await delay(TARGET_URL.length * 55 + 400);
      if (cancelled) return;
      setStage('scanning');

      await delay(2200);
      if (cancelled) return;
      setStage('revealing');

      await delay(1600);
      if (cancelled) return;
      setStage('hold');

      await delay(3200);
      if (cancelled) return;
      setStage('idle');

      await delay(400);
      if (!cancelled) setCycle(c => c + 1);
    })();

    return () => { cancelled = true; };
  }, [cycle, reducedMotion]);

  // Static state for reduced-motion
  const staticMode = reducedMotion;
  const staticStage: Stage = 'hold';

  const activeStage = staticMode ? staticStage : stage;
  const activeShowScore = staticMode || showScore;
  const activeShowIssues = staticMode || showIssues;
  const activeScanProgress = staticMode ? 100 : scanProgress;
  const activeDisplayUrl = staticMode ? TARGET_URL : displayUrl;
  const activeCategoryVisible = staticMode ? true : activeStage !== 'idle' && activeStage !== 'typing';

  return (
    <div
      className="relative w-full max-w-[520px] mx-auto"
      aria-label="AI Readiness Audit interface demo"
      role="img"
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.18) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)',
        }}
      />

      {/* Shell panel */}
      <div className="relative bg-bg-1 border border-border-strong rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* Panel header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-2/60">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <span className="ml-2 text-[11px] font-mono text-text-3 tracking-wide">
            Oultra Audit Engine · v1.0
          </span>
        </div>

        <div className="p-5 space-y-4">
          {/* URL input */}
          <div className="flex items-center gap-2 bg-bg-0 border border-border rounded-md px-3 py-2.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-text-3">
              <path d="M7 1a6 6 0 100 12A6 6 0 007 1zm0 0v12M1 7h12M2.5 3.5C3.5 5 5 6 7 6s3.5-1 4.5-2.5M2.5 10.5C3.5 9 5 8 7 8s3.5 1 4.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="flex-1 text-sm font-mono text-text-1 min-h-[20px] truncate">
              {activeDisplayUrl || (
                <span className="text-text-3">https://yourwebsite.com</span>
              )}
              {activeStage === 'typing' && (
                <span className="inline-block w-0.5 h-4 bg-accent-1 ml-0.5 animate-pulse" aria-hidden="true" />
              )}
            </span>
            <AnimatePresence>
              {activeStage === 'idle' && !staticMode && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="shrink-0 chip chip-blue text-[10px] py-0.5 px-2"
                >
                  Ready
                </motion.span>
              )}
              {(activeStage === 'typing' || activeStage === 'scanning') && !staticMode && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="shrink-0 chip chip-cyan text-[10px] py-0.5 px-2"
                >
                  {activeStage === 'typing' ? 'Starting…' : 'Scanning…'}
                </motion.span>
              )}
              {(activeStage === 'revealing' || activeStage === 'hold') && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="shrink-0 chip chip-success text-[10px] py-0.5 px-2"
                >
                  Complete
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Scan progress */}
          <AnimatePresence>
            {(activeStage === 'scanning') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-text-3">Scanning website…</span>
                  <span className="text-[11px] font-mono text-accent-2">{activeScanProgress}%</span>
                </div>
                <div className="h-1 bg-bg-0 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-3 to-accent-2 rounded-full"
                    style={{ width: `${activeScanProgress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score + Categories */}
          <AnimatePresence>
            {(activeCategoryVisible || activeStage === 'scanning') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {/* Score row */}
                <AnimatePresence>
                  {activeShowScore && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 pb-3 border-b border-border"
                    >
                      <ScoreRing score={TARGET_SCORE} visible={activeShowScore} />
                      <div>
                        <p className="text-xs text-text-3 mb-0.5">Overall score</p>
                        <p className="text-lg font-bold text-text-1 tabular-nums">{TARGET_SCORE}<span className="text-sm font-normal text-text-3">/100</span></p>
                        <p className="text-[11px] text-warning font-medium">Needs improvement</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Category bars */}
                <div className="space-y-2.5">
                  {CATEGORIES.map((cat, i) => (
                    <div key={cat.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-text-3 font-mono">{cat.name}</span>
                        <AnimatePresence>
                          {activeShowScore && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.06 }}
                              className="text-[11px] font-mono text-text-2 tabular-nums"
                            >
                              {cat.score}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="h-1 bg-bg-0 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${cat.score >= 80 ? 'bg-gradient-to-r from-success to-accent-2' : cat.score >= 60 ? 'bg-gradient-to-r from-accent-1 to-accent-2' : 'bg-gradient-to-r from-warning to-accent-1'}`}
                          initial={{ width: '0%' }}
                          animate={{
                            width: activeStage === 'scanning'
                              ? `${Math.min(activeScanProgress, cat.score)}%`
                              : activeShowScore
                              ? `${cat.score}%`
                              : '0%',
                          }}
                          transition={{
                            duration: reducedMotion ? 0 : activeStage === 'revealing' ? 0.7 : 0.3,
                            delay: reducedMotion ? 0 : activeStage === 'revealing' ? i * 0.07 : 0,
                            ease: [0, 0, 0.2, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Issues */}
          <AnimatePresence>
            {activeShowIssues && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.4 }}
                className="border-t border-border pt-3"
              >
                <p className="text-[10px] font-mono text-text-3 uppercase tracking-wider mb-2">Top Issues</p>
                <ul className="space-y-1.5" role="list">
                  {ISSUES.map((issue, i) => (
                    <motion.li
                      key={issue.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reducedMotion ? 0 : 0.5 + i * 0.12 }}
                      className="flex items-start gap-2"
                    >
                      <span className={`mt-0.5 shrink-0 ${SEVERITY_STYLE[issue.severity]}`}>
                        {SEVERITY_ICON[issue.severity]}
                      </span>
                      <span className="text-[11px] text-text-2 leading-snug">{issue.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
