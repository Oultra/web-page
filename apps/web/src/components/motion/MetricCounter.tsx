import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function MetricCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  className = '',
}: Props) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (reducedMotion.current) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started]);

  useEffect(() => {
    if (!started || reducedMotion.current) return;

    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [started, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
