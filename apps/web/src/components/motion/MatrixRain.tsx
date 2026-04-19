import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const CHARS = '0123456789ABCDEFｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ';
const COL_WIDTH = 18;
const FONT_SIZE = 12;
const STEP_MS = 80;
const HEAD_COLOR = '139,154,184';  // --color-text-2
const TRAIL_COLOR = '74,85,104';   // --color-text-3
const CANVAS_OPACITY = 0.3;

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let intervalId: ReturnType<typeof setInterval>;
    let drops: number[] = [];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      canvas!.width = parent.offsetWidth;
      canvas!.height = parent.offsetHeight;
      const cols = Math.floor(canvas!.width / COL_WIDTH);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -canvas!.height / FONT_SIZE));
    }

    function step() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cols = drops.length;

      // fade previous frame
      ctx!.fillStyle = 'rgba(8,10,15,0.18)';
      ctx!.fillRect(0, 0, w, h);

      ctx!.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * FONT_SIZE;
        if (y < 0) {
          drops[i]++;
          continue;
        }

        // head character (bright)
        const headChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx!.fillStyle = `rgba(${HEAD_COLOR},0.85)`;
        ctx!.fillText(headChar, i * COL_WIDTH, y);

        // one character above: slightly dimmer
        if (y > FONT_SIZE) {
          const prevChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx!.fillStyle = `rgba(${TRAIL_COLOR},0.5)`;
          ctx!.fillText(prevChar, i * COL_WIDTH, y - FONT_SIZE);
        }

        drops[i]++;
        // reset column randomly after it passes bottom
        if (y > h && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        }
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    resize();
    intervalId = setInterval(step, STEP_MS);

    return () => {
      clearInterval(intervalId);
      ro.disconnect();
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
        opacity: CANVAS_OPACITY,
      }}
    />
  );
}
