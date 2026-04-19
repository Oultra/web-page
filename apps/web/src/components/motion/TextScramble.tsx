import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface Props {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2';
  startDelay?: number;
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
const SCRAMBLE_STEPS = 8;
const STEP_INTERVAL = 40;
const LOCK_STAGGER = 60;

function rand(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)];
}

export default function TextScramble({ text, className, tag = 'h1', startDelay = 200 }: Props) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : '');
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }

    const timer = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;

      const chars = text.split('');
      const locked = new Array(chars.length).fill(false);
      // spaces and punctuation lock immediately
      chars.forEach((c, i) => {
        if (!/[A-Za-z0-9]/.test(c)) locked[i] = true;
      });

      const stepCounts = new Array(chars.length).fill(0);
      const lockAt = chars.map((_, i) => Math.round(i * LOCK_STAGGER / STEP_INTERVAL));

      let tick = 0;
      frameRef.current = setInterval(() => {
        tick++;
        // lock chars that have reached their stagger time
        chars.forEach((_, i) => {
          if (!locked[i] && tick >= lockAt[i] && stepCounts[i] >= SCRAMBLE_STEPS) {
            locked[i] = true;
          }
        });

        setDisplay(
          chars.map((c, i) => {
            if (locked[i]) return c;
            stepCounts[i]++;
            return tick < lockAt[i] ? ' ' : rand(CHARSET);
          }).join('')
        );

        if (locked.every(Boolean)) {
          clearInterval(frameRef.current!);
          setDisplay(text);
        }
      }, STEP_INTERVAL);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, reduced, startDelay]);

  const Tag = tag;
  return <Tag className={className}>{display || '\u00A0'}</Tag>;
}
