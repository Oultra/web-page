import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

// ── constants ─────────────────────────────────────────────────────────────
const SCENES = ['pipeline', 'stream', 'neural'] as const;
type Scene = typeof SCENES[number];

const SCENE_MS = 8500;
const FADE_MS  = 500;

const C = {
  a1:  '#2563eb',
  a2:  '#06b6d4',
  t1:  '#eef2ff',
  t2:  '#8b9ab8',
  t3:  '#4a5568',
  ok:  '#10b981',
  bg:  '#0d1017',
  bg2: '#131720',
  bdr: 'rgba(255,255,255,0.07)',
  bdrH:'rgba(255,255,255,0.13)',
};

const mono: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 11,
  lineHeight: 1.75,
};

// ── helpers ───────────────────────────────────────────────────────────────
function Bar({ v, color = C.a1 }: { v: number; color?: string }) {
  const f = Math.round((v / 100) * 8);
  return (
    <span>
      <span style={{ color }}> {'█'.repeat(f)}</span>
      <span style={{ color: C.t3 }}>{'░'.repeat(8 - f)}</span>
    </span>
  );
}

// ── Scene: Pipeline ───────────────────────────────────────────────────────
const STEPS = [
  { label: 'Mapping codebase',        ms: '112ms' },
  { label: 'Resolving dependencies',  ms: '54ms'  },
  { label: 'Running AI integration',  ms: '341ms' },
];
const SCORES = [
  { label: 'Code quality',  v: 94, c: C.ok },
  { label: 'Test coverage', v: 71, c: C.a2 },
  { label: 'AI-ready',      v: 68, c: C.a1 },
  { label: 'Scalability',   v: 87, c: C.ok },
];

function PipelineScene() {
  const [step,    setStep]    = useState(0);
  const [bars,    setBars]    = useState([0, 0, 0, 0]);
  const [scoring, setScoring] = useState(false);
  const [done,    setDone]    = useState(false);
  const [blink,   setBlink]   = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setStep(3); setBars(SCORES.map(s => s.v)); setScoring(true); setDone(true); return; }
    const ts = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1700),
      setTimeout(() => setScoring(true), 2400),
      setTimeout(() => setDone(true), 5500),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!scoring) return;
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(n + 4, 100);
      setBars(SCORES.map(s => Math.min(s.v, n)));
      if (n >= 100) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [scoring]);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={mono}>
      <div style={{ color: C.t3, marginBottom: 10, letterSpacing: 1, fontSize: 10 }}>OULTRA / BUILD PIPELINE</div>

      {STEPS.map((s, i) => step > i && (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
          <span style={{ color: C.ok }}>[✓]</span>
          <span style={{ color: C.t2, flex: 1 }}>{s.label}</span>
          <span style={{ color: C.t3 }}>{s.ms}</span>
        </div>
      ))}

      {step >= 3 && (
        <div style={{ marginTop: 4 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: scoring ? 4 : 0 }}>
            <span style={{ color: done ? C.ok : C.a2 }}>{done ? '[✓]' : '[▶]'}</span>
            <span style={{ color: C.t2 }}>Evaluating project health</span>
            {!scoring && <span style={{ color: C.a2 }}>{blink ? '▌' : ' '}</span>}
          </div>
          {scoring && (
            <div style={{ marginLeft: 24 }}>
              {SCORES.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 1 }}>
                  <span style={{ color: C.t3, width: 78, display: 'inline-block' }}>{s.label}</span>
                  <Bar v={bars[i]} color={s.c} />
                  <span style={{ color: C.t1, width: 26, textAlign: 'right' }}>{bars[i]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        {done
          ? <><span style={{ color: C.ok }}>[✓]</span><span style={{ color: C.t2 }}>Done — 4 recommendations ready</span></>
          : step >= 3 && scoring && (
            <><span style={{ color: C.t3 }}>[ ]</span><span style={{ color: C.t3 }}>Generating report{blink ? '...' : '   '}</span></>
          )
        }
      </div>
    </div>
  );
}

// ── Scene: Stream ─────────────────────────────────────────────────────────
const RESPONSE = 'Custom software built around your workflow — not the other way around. We integrate AI where it compounds value: inference pipelines, smart automation, and systems that improve as you ship.';

function StreamScene() {
  const [phase,  setPhase]  = useState(0);
  const [typed,  setTyped]  = useState('');
  const [blink,  setBlink]  = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setPhase(3); setTyped(RESPONSE); return; }
    const ts = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== 3 || typed.length >= RESPONSE.length) return;
    const t = setTimeout(() => setTyped(RESPONSE.slice(0, typed.length + 1)), 16);
    return () => clearTimeout(t);
  }, [phase, typed]);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={mono}>
      <div style={{ color: C.t3, marginBottom: 10, letterSpacing: 1, fontSize: 10 }}>OULTRA / AI-GENERATE</div>

      <div style={{ marginBottom: 10 }}>
        <span style={{ color: C.a2 }}>{'> '}</span>
        <span style={{ color: C.t3 }}>prompt: </span>
        <span style={{ color: C.t1 }}>how does oultra build software?</span>
      </div>

      {phase >= 1 && (
        <div style={{ color: C.t2, marginBottom: 4 }}>{'  Thinking...'}</div>
      )}
      {phase >= 2 && (
        <div style={{ color: C.t2, marginBottom: 10 }}>{'  Generating response...'}</div>
      )}

      {phase >= 3 && (
        <div>
          <div style={{ color: C.t3, marginBottom: 4 }}>Response:</div>
          <div style={{ color: C.t1 }}>
            {typed}
            <span style={{
              display: 'inline-block',
              width: 7,
              height: 12,
              background: C.a2,
              verticalAlign: 'text-bottom',
              marginLeft: 1,
              opacity: typed.length >= RESPONSE.length ? (blink ? 1 : 0) : 1,
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Scene: Neural ─────────────────────────────────────────────────────────
const NODES = ['○', '◎', '●', '◉'];
const LAYER = [0, 1, 2, 3] as const;

function NeuralScene() {
  const [tick, setTick] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick(t => t + 1), 380);
    return () => clearInterval(id);
  }, []);

  const rows = [0, 1, 2, 3];
  return (
    <div style={mono}>
      <div style={{ color: C.t3, marginBottom: 10, letterSpacing: 1, fontSize: 10 }}>NEURAL NETWORK / ACTIVE</div>

      <div style={{ display: 'flex', gap: 0, marginBottom: 6 }}>
        {['input', 'hidden ×2', 'output'].map((l, i) => (
          <span key={i} style={{ color: C.t3, fontSize: 9, flex: 1, textAlign: i === 2 ? 'right' : 'left', paddingRight: i === 1 ? 0 : 0 }}>{l}</span>
        ))}
      </div>

      {rows.map(r => {
        const inC  = NODES[(tick + r) % NODES.length];
        const hidC = NODES[(tick + r + 1) % NODES.length];
        const outC = r === 1 ? NODES[(tick + 2) % NODES.length] : null;
        const iCol = (tick + r) % 4 === 2 ? C.a2 : C.a1;
        const hCol = (tick + r + 1) % 4 === 2 ? C.a2 : C.t2;
        return (
          <div key={r} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ color: iCol }}>{inC}</span>
            <span style={{ color: C.t3 }}> ─────── </span>
            <span style={{ color: hCol }}>{hidC}</span>
            <span style={{ color: C.t3 }}> ─────── </span>
            {outC
              ? <span style={{ color: C.ok }}>{outC}</span>
              : <span style={{ color: C.t3 }}>·</span>
            }
          </div>
        );
      })}

      <div style={{ marginTop: 10, color: C.t3 }}>
        <div>Layer activations: <span style={{ color: C.a2 }}>94%</span></div>
        <div>Active paths: <span style={{ color: C.t1 }}>{3 + (tick % 3)}/12</span></div>
        <div style={{ marginTop: 4 }}>
          Processing layer <span style={{ color: C.a1 }}>{(tick % 3) + 1}/3</span>
          {tick % 3 === 2 && <span style={{ color: C.ok }}> ✓</span>}
        </div>
      </div>
    </div>
  );
}

// ── Panel shell ───────────────────────────────────────────────────────────
const LABELS: Record<Scene, string> = {
  pipeline: 'Analysis',
  stream:   'Generate',
  neural:   'Network',
};

export default function HeroAIPanel() {
  const [idx,  setIdx]  = useState(0);
  const [fade, setFade] = useState(1);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setFade(0);
      const t = setTimeout(() => { setIdx(i => (i + 1) % SCENES.length); setFade(1); }, FADE_MS);
      return () => clearTimeout(t);
    }, SCENE_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const scene = SCENES[idx];

  return (
    <div style={{
      width: 380,
      maxWidth: '100%',
      background: C.bg,
      border: `1px solid ${C.bdrH}`,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(37,99,235,0.18), 0 1px 3px rgba(0,0,0,0.5)',
    }}>
      {/* chrome bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 14px',
        borderBottom: `1px solid ${C.bdr}`,
        background: C.bg2,
      }}>
        {['#ef4444','#f59e0b','#10b981'].map((col, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: col, display: 'inline-block' }} />
        ))}
        <span style={{ flex: 1 }} />
        {SCENES.map((s, i) => (
          <span key={s} style={{
            fontSize: 10,
            fontFamily: '"JetBrains Mono", monospace',
            color: i === idx ? C.a2 : C.t3,
            padding: '2px 7px',
            borderRadius: 4,
            background: i === idx ? 'rgba(6,182,212,0.1)' : 'transparent',
            border: `1px solid ${i === idx ? 'rgba(6,182,212,0.3)' : 'transparent'}`,
            transition: `color ${FADE_MS}ms, background ${FADE_MS}ms`,
          }}>
            {LABELS[s]}
          </span>
        ))}
      </div>

      {/* scene */}
      <div style={{
        padding: '18px 20px',
        minHeight: 270,
        opacity: fade,
        transition: `opacity ${FADE_MS}ms ease`,
      }}>
        {scene === 'pipeline' && <PipelineScene key="pipeline" />}
        {scene === 'stream'   && <StreamScene   key="stream"   />}
        {scene === 'neural'   && <NeuralScene   key="neural"   />}
      </div>
    </div>
  );
}
