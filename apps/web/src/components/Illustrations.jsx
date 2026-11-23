/**
 * Illustrations.jsx: the site's visual language, drawn once.
 * Everything is about delivery: boards, roadmaps, milestones, connected blocks.
 * Line art in the ink ramp with the sky accent used only for "this one matters".
 */

import React from 'react';

const INK = 'hsl(222 26% 10%)';
const INK_2 = 'hsl(222 26% 13%)';
const LINE = 'hsl(0 0% 100% / 0.14)';
const FAINT = 'hsl(0 0% 100% / 0.16)';
const TEXT = 'hsl(0 0% 100% / 0.55)';
const ACCENT = 'hsl(var(--primary))';
const ACCENT_SOFT = 'hsl(var(--primary) / 0.28)';
const MONO = 'Geist Mono, ui-monospace, monospace';

// ─── Hero: a delivery board ──────────────────────────────────────────────────

const COLUMNS = [
  { name: 'Plan', cards: [['Scope signed off', 'done'], ['Risks logged', 'done']] },
  { name: 'Build', cards: [['Order sync API', 'active'], ['Admin roles', null]] },
  { name: 'Test', cards: [['QA pass', null]] },
  { name: 'Live', cards: [['Checkout v1', 'done']] },
];

/** Glass kanban board: what a project manager actually looks at all day. */
export const DeliveryBoard = () => (
  <div className="glass-surface w-full max-w-[540px] overflow-hidden rounded-2xl" role="img" aria-label="A project delivery board with columns Plan, Build, Test and Live">
    <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="status-dot" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">Sprint 12</span>
      </div>
      <span className="font-mono text-xs text-muted-foreground">On track</span>
    </div>

    <div className="grid grid-cols-4 gap-2.5 p-4">
      {COLUMNS.map((col) => (
        <div key={col.name} className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-medium text-muted-foreground">{col.name}</span>
            <span className="font-mono text-[11px] text-muted-foreground/70">{col.cards.length}</span>
          </div>
          {col.cards.map(([title, state]) => (
            <div
              key={title}
              className={`rounded-lg border p-2.5 ${state === 'active' ? 'border-primary/50 bg-primary/10' : 'border-white/10 bg-white/[0.04]'}`}
            >
              <p className="m-0 text-xs leading-snug text-foreground/90">{title}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${state === 'done' ? 'bg-[#4cc38a]' : state === 'active' ? 'bg-primary' : 'bg-white/25'}`} />
                <span className="font-mono text-[11px] text-muted-foreground">{state === 'done' ? 'Done' : state === 'active' ? 'In progress' : 'Queued'}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

    <div className="border-t border-white/10 px-5 py-3.5">
      <div className="mb-2 flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">Release progress</span>
        <span className="font-mono text-foreground/80">68%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[68%] rounded-full bg-primary" />
      </div>
    </div>
  </div>
);

// ─── Process: a roadmap with five phases ─────────────────────────────────────

const PHASES = [
  { label: 'Discover', x: 0, w: 120, y: 0 },
  { label: 'Scope', x: 100, w: 130, y: 1 },
  { label: 'Build', x: 210, w: 300, y: 2 },
  { label: 'Test', x: 430, w: 140, y: 3 },
  { label: 'Launch', x: 560, w: 90, y: 4 },
];

/** Gantt-style roadmap with a milestone flag at launch. */
export const Roadmap = ({ className = '' }) => (
  <svg viewBox="0 0 700 200" fill="none" className={className} role="img" aria-label="Project roadmap: discover, scope, build, test, launch">
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line key={i} x1={20 + i * 100} y1="8" x2={20 + i * 100} y2="188" stroke="hsl(0 0% 100% / 0.06)" />
    ))}
    {PHASES.map((p) => (
      <g key={p.label}>
        <rect x={20 + p.x} y={14 + p.y * 34} width={p.w} height="22" rx="11" fill={p.label === 'Build' ? ACCENT_SOFT : INK_2} stroke={p.label === 'Build' ? ACCENT : LINE} />
        <text x={32 + p.x} y={29 + p.y * 34} fontFamily={MONO} fontSize="10" fill={p.label === 'Build' ? 'hsl(0 0% 100% / 0.9)' : TEXT}>{p.label}</text>
      </g>
    ))}
    <path d="M668 8v180" stroke={ACCENT} strokeDasharray="3 4" />
    <path d="M668 10l22 7-22 7z" fill={ACCENT} />
    <circle cx="668" cy="188" r="4" fill={ACCENT} />
  </svg>
);

// ─── Page headers ─────────────────────────────────────────────────────────────

const Frame = ({ children, label }) => (
  <svg viewBox="0 0 360 260" fill="none" className="h-auto w-full" role="img" aria-label={label}>
    <rect x="1" y="1" width="358" height="258" rx="20" fill="hsl(0 0% 100% / 0.02)" stroke="hsl(0 0% 100% / 0.08)" />
    {children}
  </svg>
);

/** Services: four blocks connected into one working system. */
export const ServicesArt = () => (
  <Frame label="Four service blocks connected into one system">
    <g stroke={ACCENT} strokeOpacity="0.55" strokeDasharray="3 4">
      <path d="M130 90h50M180 90v80M180 170h-50M230 90h0M180 130h50" />
    </g>
    {[
      [40, 52, 'API'],
      [200, 52, 'Web'],
      [40, 152, 'Cloud'],
      [200, 152, 'AI'],
    ].map(([x, y, t]) => (
      <g key={t}>
        <rect x={x} y={y} width="120" height="56" rx="12" fill={INK} stroke={LINE} />
        <rect x={x + 14} y={y + 16} width="24" height="24" rx="7" stroke={ACCENT} />
        <text x={x + 48} y={y + 33} fontFamily={MONO} fontSize="11" fill="hsl(0 0% 100% / 0.85)">{t}</text>
        <rect x={x + 48} y={y + 40} width="48" height="3" rx="1.5" fill={FAINT} />
      </g>
    ))}
    <circle cx="180" cy="130" r="9" fill={ACCENT} />
    <circle cx="180" cy="130" r="16" stroke={ACCENT} strokeOpacity="0.4" />
  </Frame>
);

/** Resume: a profile card with a rising timeline. */
export const ResumeArt = () => (
  <Frame label="A profile card beside a rising career timeline">
    <rect x="36" y="40" width="130" height="180" rx="14" fill={INK} stroke={LINE} />
    <circle cx="66" cy="76" r="16" stroke={ACCENT} strokeWidth="1.5" />
    <rect x="92" y="68" width="56" height="6" rx="3" fill="hsl(0 0% 100% / 0.55)" />
    <rect x="92" y="80" width="38" height="4" rx="2" fill={ACCENT_SOFT} />
    {[110, 124, 138, 152].map((y, i) => (
      <rect key={y} x="54" y={y} width={92 - i * 8} height="4" rx="2" fill={FAINT} />
    ))}
    <rect x="54" y="176" width="34" height="14" rx="7" stroke={ACCENT} strokeOpacity="0.6" />
    <rect x="94" y="176" width="30" height="14" rx="7" stroke={ACCENT} strokeOpacity="0.6" />
    <path d="M196 214c30 0 30-26 60-26s30-40 60-40" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
    {[[196, 214], [226, 200], [256, 188], [286, 168], [316, 148]].map(([x, y], i) => (
      <circle key={x} cx={x} cy={y} r={i === 4 ? 7 : 4} fill={i === 4 ? ACCENT : INK} stroke={ACCENT} />
    ))}
    <text x="196" y="236" fontFamily={MONO} fontSize="9" fill={TEXT}>2023</text>
    <text x="298" y="236" fontFamily={MONO} fontSize="9" fill={TEXT}>2026</text>
  </Frame>
);

/** Service detail: a work package broken into checked steps. */
export const ServiceArt = () => (
  <Frame label="A work package broken into completed steps">
    <rect x="48" y="40" width="264" height="180" rx="14" fill={INK} stroke={LINE} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="70" y={64 + i * 38} width="20" height="20" rx="6" stroke={i < 3 ? ACCENT : LINE} fill={i < 3 ? ACCENT_SOFT : 'none'} />
        {i < 3 && <path d={`M75 ${74 + i * 38}l4 4 7-8`} stroke="hsl(0 0% 100% / 0.95)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
        <rect x="104" y={68 + i * 38} width={150 - i * 16} height="5" rx="2.5" fill={i < 3 ? 'hsl(0 0% 100% / 0.5)' : FAINT} />
        <rect x="104" y={79 + i * 38} width={96 - i * 8} height="4" rx="2" fill={FAINT} />
      </g>
    ))}
    <circle cx="282" cy="196" r="14" fill={ACCENT} />
    <path d="M275 196l5 5 9-10" stroke="hsl(var(--primary-foreground))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** 404: a path that stops short of its flag. */
export const LostPathArt = () => (
  <svg viewBox="0 0 360 160" fill="none" className="mx-auto h-auto w-full max-w-sm" role="img" aria-label="A path that ends before reaching its destination flag">
    <path d="M24 120c40 0 50-60 100-60s50 50 90 50" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M214 110c20 0 28 6 34 12" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 6" />
    <circle cx="24" cy="120" r="6" fill={INK} stroke={ACCENT} strokeWidth="1.5" />
    <path d="M318 126V56" stroke={LINE} strokeWidth="1.5" />
    <path d="M318 56h30l-8 10 8 10h-30z" fill="hsl(0 0% 100% / 0.12)" stroke={LINE} />
    <path d="M262 126l12 12M274 126l-12 12" stroke="hsl(0 0% 100% / 0.4)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
