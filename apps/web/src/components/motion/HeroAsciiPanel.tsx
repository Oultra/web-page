import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// ─── config ───────────────────────────────────────────────────────────────────
const COLS = 38;
const ROWS = 26;
const CHAR_W = 11;
const CHAR_H = 19;
const TICK_MS = 90;

// character pools
const NOISE = '0123456789ABCDEFabcdef></.{}[]|_-+=%#@';
const BRIGHT_CHARS = '▓▒░█▓▒';

// brand colors (raw rgb so we can set alpha)
const COLOR_DIM    = '74,85,104';    // text-3
const COLOR_MID    = '139,154,184';  // text-2
const COLOR_ACCENT = '37,99,235';    // accent-1
const COLOR_CYAN   = '6,182,212';    // accent-2

// ─── logo mask ────────────────────────────────────────────────────────────────
// Oultra 2×2 block logo, centered in the grid
// Each "pixel" of the logo maps to a 3×3 block of chars
const LOGO_PX: [number, number][] = (() => {
  const positions: [number, number][] = [];
  const blockSize = 3;
  const gap = 2;
  // top-left square
  const tl = { col: 8, row: 5 };
  const tr = { col: tl.col + blockSize * 3 + gap, row: tl.row };
  const bl = { col: tl.col, row: tl.row + blockSize * 3 + gap };
  const br = { col: tr.col, row: bl.row };

  for (const origin of [tl, tr, bl, br]) {
    for (let dr = 0; dr < blockSize * 3; dr++) {
      for (let dc = 0; dc < blockSize * 3; dc++) {
        positions.push([origin.col + dc, origin.row + dr]);
      }
    }
  }
  return positions;
})();

const LOGO_SET = new Set(LOGO_PX.map(([c, r]) => `${c},${r}`));

// ─── animation phases ─────────────────────────────────────────────────────────
// Each phase: duration in ticks
const PHASES = [
  { name: 'chaos',   ticks: 18 },   // all noise
  { name: 'emerge',  ticks: 22 },   // logo chars solidify
  { name: 'hold',    ticks: 28 },   // logo steady, noise still flickers
  { name: 'dissolve',ticks: 18 },   // logo fades back to noise
] as const;

type PhaseName = typeof PHASES[number]['name'];

// ─── helpers ──────────────────────────────────────────────────────────────────
function randChar(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── component ────────────────────────────────────────────────────────────────
export default function HeroAsciiPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = COLS * CHAR_W;
    canvas.height = ROWS * CHAR_H;

    // per-cell state
    type Cell = { char: string; alpha: number; isLogo: boolean };
    const grid: Cell[][] = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => ({
        char: randChar(NOISE),
        alpha: Math.random() * 0.25 + 0.05,
        isLogo: LOGO_SET.has(`${c},${r}`),
      }))
    );

    // per-logo-cell emergence progress 0→1
    const logoProgress = new Map<string, number>();
    LOGO_PX.forEach(([c, r]) => logoProgress.set(`${c},${r}`, 0));

    let tick = 0;
    let phaseIdx = 0;
    let phaseElapsed = 0;

    function currentPhase(): PhaseName {
      return PHASES[phaseIdx].name;
    }

    function advance() {
      phaseElapsed++;
      if (phaseElapsed >= PHASES[phaseIdx].ticks) {
        phaseIdx = (phaseIdx + 1) % PHASES.length;
        phaseElapsed = 0;
      }
    }

    function draw() {
      tick++;
      advance();
      const phase = currentPhase();
      const pct = phaseElapsed / PHASES[phaseIdx].ticks;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${CHAR_H - 3}px "JetBrains Mono", monospace`;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r][c];
          const key = `${c},${r}`;
          const x = c * CHAR_W;
          const y = r * CHAR_H + (CHAR_H - 3);

          if (cell.isLogo) {
            let progress = logoProgress.get(key)!;

            if (phase === 'emerge') {
              progress = Math.min(1, progress + 0.08 + Math.random() * 0.06);
            } else if (phase === 'hold') {
              progress = Math.min(1, progress + 0.05);
            } else if (phase === 'dissolve') {
              progress = Math.max(0, progress - 0.07 - Math.random() * 0.05);
            } else {
              // chaos — reset
              progress = Math.max(0, progress - 0.15);
            }

            logoProgress.set(key, progress);

            if (progress > 0.5) {
              // solid logo char
              const ch = randChar(BRIGHT_CHARS);
              cell.char = ch;
              // blend between accent-1 and accent-2 based on row/col
              const blend = (c + r) % 2 === 0;
              const color = blend ? COLOR_ACCENT : COLOR_CYAN;
              const alpha = 0.5 + progress * 0.45;
              ctx.fillStyle = `rgba(${color},${alpha.toFixed(2)})`;
              ctx.fillText(ch, x, y);
            } else if (progress > 0) {
              // partial — scramble
              if (Math.random() < 0.4) cell.char = randChar(NOISE);
              const alpha = progress * 0.6 + 0.1;
              ctx.fillStyle = `rgba(${COLOR_MID},${alpha.toFixed(2)})`;
              ctx.fillText(cell.char, x, y);
            }
          } else {
            // noise cell — randomly change char
            if (Math.random() < 0.12) {
              cell.char = randChar(NOISE);
              cell.alpha = Math.random() * 0.22 + 0.04;
            }
            ctx.fillStyle = `rgba(${COLOR_DIM},${cell.alpha.toFixed(2)})`;
            ctx.fillText(cell.char, x, y);
          }
        }
      }

      // edge fade — left and right gradients
      const fadeW = CHAR_W * 3;
      const leftFade = ctx.createLinearGradient(0, 0, fadeW, 0);
      leftFade.addColorStop(0, 'rgba(8,10,15,1)');
      leftFade.addColorStop(1, 'rgba(8,10,15,0)');
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 0, fadeW, canvas.height);

      const rightFade = ctx.createLinearGradient(canvas.width - fadeW, 0, canvas.width, 0);
      rightFade.addColorStop(0, 'rgba(8,10,15,0)');
      rightFade.addColorStop(1, 'rgba(8,10,15,1)');
      ctx.fillStyle = rightFade;
      ctx.fillRect(canvas.width - fadeW, 0, fadeW, canvas.height);

      // top and bottom fade
      const fadeH = CHAR_H * 2;
      const topFade = ctx.createLinearGradient(0, 0, 0, fadeH);
      topFade.addColorStop(0, 'rgba(8,10,15,1)');
      topFade.addColorStop(1, 'rgba(8,10,15,0)');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, canvas.width, fadeH);

      const botFade = ctx.createLinearGradient(0, canvas.height - fadeH, 0, canvas.height);
      botFade.addColorStop(0, 'rgba(8,10,15,0)');
      botFade.addColorStop(1, 'rgba(8,10,15,1)');
      ctx.fillStyle = botFade;
      ctx.fillRect(0, canvas.height - fadeH, canvas.width, fadeH);
    }

    // static render for reduced motion
    if (reduced) {
      draw();
      return;
    }

    const interval = setInterval(draw, TICK_MS);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        width: `${COLS * CHAR_W}px`,
        height: `${ROWS * CHAR_H}px`,
        maxWidth: '100%',
      }}
    />
  );
}
