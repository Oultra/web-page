import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const COLS = 36;
const ROWS = 28;
const CHAR_W = 12;
const CHAR_H = 18;
const FONT_SIZE = 13;
const STEP_MS = 55;

const CHARS = '0123456789ABCDEFabcdef<>/|{}[]=._-+#@%';

// accent-2 cyan head → accent-1 blue mid → text-3 dim tail
const HEAD  = '6,182,212';
const MID   = '37,99,235';
const TAIL  = '74,85,104';
const BG    = '8,10,15';

const W = COLS * CHAR_W;
const H = ROWS * CHAR_H;

function rand(n: number) { return Math.floor(Math.random() * n); }
function randChar() { return CHARS[rand(CHARS.length)]; }

export default function HeroCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = W;
    canvas.height = H;

    // each drop: current row position (fractional), speed, trail length
    type Drop = { y: number; speed: number; trail: number };
    const drops: Drop[] = Array.from({ length: COLS }, () => ({
      y: -rand(ROWS * 2),
      speed: 0.4 + Math.random() * 0.6,
      trail: 6 + rand(10),
    }));

    // per-cell char cache so trail chars stay stable
    const chars: string[][] = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => randChar())
    );

    function step() {
      // dim previous frame — semi-transparent fill creates the trail effect
      ctx.fillStyle = `rgba(${BG},0.25)`;
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let c = 0; c < COLS; c++) {
        const drop = drops[c];
        const headRow = Math.floor(drop.y);

        for (let t = 0; t < drop.trail; t++) {
          const r = headRow - t;
          if (r < 0 || r >= ROWS) continue;

          // refresh head char each tick, keep trail chars stable
          if (t === 0) chars[r][c] = randChar();

          const progress = 1 - t / drop.trail;
          let color: string;
          let alpha: number;

          if (t === 0) {
            color = HEAD;
            alpha = 0.95;
          } else if (progress > 0.5) {
            color = MID;
            alpha = progress * 0.7 + 0.1;
          } else {
            color = TAIL;
            alpha = progress * 0.5 + 0.05;
          }

          ctx.fillStyle = `rgba(${color},${alpha.toFixed(2)})`;
          ctx.fillText(chars[r][c], c * CHAR_W, r * CHAR_H + FONT_SIZE);
        }

        drop.y += drop.speed;
        if (drop.y - drop.trail > ROWS) {
          drop.y = -rand(ROWS);
          drop.speed = 0.4 + Math.random() * 0.6;
          drop.trail = 6 + rand(10);
        }
      }

      // edge fades so it blends with the layout
      const fadeW = CHAR_W * 3;
      const lg = ctx.createLinearGradient(0, 0, fadeW, 0);
      lg.addColorStop(0, `rgba(${BG},1)`);
      lg.addColorStop(1, `rgba(${BG},0)`);
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, fadeW, H);

      const rg = ctx.createLinearGradient(W - fadeW, 0, W, 0);
      rg.addColorStop(0, `rgba(${BG},0)`);
      rg.addColorStop(1, `rgba(${BG},1)`);
      ctx.fillStyle = rg;
      ctx.fillRect(W - fadeW, 0, fadeW, H);

      const fadeH = CHAR_H * 3;
      const tg = ctx.createLinearGradient(0, 0, 0, fadeH);
      tg.addColorStop(0, `rgba(${BG},1)`);
      tg.addColorStop(1, `rgba(${BG},0)`);
      ctx.fillStyle = tg;
      ctx.fillRect(0, 0, W, fadeH);

      const bg2 = ctx.createLinearGradient(0, H - fadeH, 0, H);
      bg2.addColorStop(0, `rgba(${BG},0)`);
      bg2.addColorStop(1, `rgba(${BG},1)`);
      ctx.fillStyle = bg2;
      ctx.fillRect(0, H - fadeH, W, fadeH);
    }

    if (reduced) {
      // single static frame — dim background fill then one pass
      ctx.fillStyle = `rgba(${BG},1)`;
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          ctx.fillStyle = `rgba(${TAIL},0.15)`;
          ctx.fillText(chars[r][c], c * CHAR_W, r * CHAR_H + FONT_SIZE);
        }
      }
      return;
    }

    const interval = setInterval(step, STEP_MS);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        width: `${W}px`,
        height: `${H}px`,
        maxWidth: '100%',
      }}
    />
  );
}
