import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const CHAR_W = 10;
const CHAR_H = 16;
const TICK_MS = 100;
const NOISE = '0123456789ABCDEFabcdef></.{}[]|_-+=%#@';
const COLOR_DIM = '74,85,104';
const BG = '8,10,15';

function randChar(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function HeroAsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Cell = { char: string; alpha: number };
    let cols = 0;
    let rows = 0;
    let grid: Cell[][] = [];

    function resize() {
      // Walk up DOM to find the section (astro-island wrapper has 0 dimensions)
      let el: HTMLElement | null = canvas;
      while (el && el.tagName.toLowerCase() !== 'section') {
        el = el.parentElement;
      }
      const w = el ? el.offsetWidth : window.innerWidth;
      const h = el ? el.offsetHeight : window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      cols = Math.floor(w / CHAR_W);
      rows = Math.floor(h / CHAR_H);
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          char: randChar(NOISE),
          alpha: Math.random() * 0.20 + 0.06,
        }))
      );
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${CHAR_H - 4}px "JetBrains Mono", monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          if (Math.random() < 0.04) {
            cell.char = randChar(NOISE);
            cell.alpha = Math.random() * 0.20 + 0.06;
          }
          ctx.fillStyle = `rgba(${COLOR_DIM},${cell.alpha.toFixed(2)})`;
          ctx.fillText(cell.char, c * CHAR_W, r * CHAR_H + (CHAR_H - 4));
        }
      }

      // left/right edge fades
      const fadeW = CHAR_W * 3;
      const lg = ctx.createLinearGradient(0, 0, fadeW, 0);
      lg.addColorStop(0, `rgba(${BG},1)`);
      lg.addColorStop(1, `rgba(${BG},0)`);
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, fadeW, canvas.height);

      const rg = ctx.createLinearGradient(canvas.width - fadeW, 0, canvas.width, 0);
      rg.addColorStop(0, `rgba(${BG},0)`);
      rg.addColorStop(1, `rgba(${BG},1)`);
      ctx.fillStyle = rg;
      ctx.fillRect(canvas.width - fadeW, 0, fadeW, canvas.height);

      // top/bottom fades
      const fadeHT = CHAR_H * 2;
      const tg = ctx.createLinearGradient(0, 0, 0, fadeHT);
      tg.addColorStop(0, `rgba(${BG},1)`);
      tg.addColorStop(1, `rgba(${BG},0)`);
      ctx.fillStyle = tg;
      ctx.fillRect(0, 0, canvas.width, fadeHT);

      const fadeHB = CHAR_H * 5;
      const bg2 = ctx.createLinearGradient(0, canvas.height - fadeHB, 0, canvas.height);
      bg2.addColorStop(0, `rgba(${BG},0)`);
      bg2.addColorStop(1, `rgba(${BG},1)`);
      ctx.fillStyle = bg2;
      ctx.fillRect(0, canvas.height - fadeHB, canvas.width, fadeHB);
    }

    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      draw();
      return () => window.removeEventListener('resize', resize);
    }

    const interval = setInterval(draw, TICK_MS);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
