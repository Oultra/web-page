import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface Category {
  id: string;
  name: string;
  score: number;
}

interface Props {
  total: number;
  categories: Category[];
}

const SCORE_COLOR = (score: number) => {
  if (score >= 80) return 'from-success to-accent-2';
  if (score >= 60) return 'from-accent-1 to-accent-2';
  return 'from-warning to-accent-1';
};

const SCORE_LABEL = (score: number) => {
  if (score >= 80) return { text: 'Strong', color: 'text-success' };
  if (score >= 60) return { text: 'Moderate', color: 'text-accent-2' };
  return { text: 'Needs work', color: 'text-warning' };
};

export default function ScoreBreakdown({ total, categories }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const label = SCORE_LABEL(total);

  return (
    <div ref={ref} className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
      {/* Score circle */}
      <div className="flex flex-col items-center justify-center bg-bg-3 border border-border rounded-xl p-8">
        <div className="relative w-28 h-28 mb-3">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{
                strokeDashoffset: visible
                  ? 2 * Math.PI * 42 * (1 - total / 100)
                  : 2 * Math.PI * 42,
              }}
              transition={{ duration: 1.2, ease: [0, 0, 0.2, 1], delay: 0.1 }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-3xl font-bold text-text-1 tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {visible ? total : 0}
            </motion.span>
          </div>
        </div>
        <span className="text-xs text-text-3 mb-1">Overall score</span>
        <span className={`text-sm font-semibold ${label.color}`}>{label.text}</span>
      </div>

      {/* Category bars */}
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={cat.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-text-2">{cat.name}</span>
              <span className="text-sm font-mono font-medium text-text-1 tabular-nums">{cat.score}</span>
            </div>
            <div className="score-bar-track">
              <motion.div
                className={`score-bar-fill bg-gradient-to-r ${SCORE_COLOR(cat.score)}`}
                initial={{ width: '0%' }}
                animate={{ width: visible ? `${cat.score}%` : '0%' }}
                transition={{
                  duration: reducedMotion ? 0 : 0.8,
                  delay: reducedMotion ? 0 : 0.2 + i * 0.08,
                  ease: [0, 0, 0.2, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
