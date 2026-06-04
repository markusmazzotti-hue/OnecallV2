import React, { useState } from 'react'

/* ── Icons ──────────────────────────────────────────────────────── */
const ICONS = {
  'Demolizione Industriale': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l5 2-2 5"/>
      <path d="M14 4l-3 6"/>
      <path d="M9.5 14a2 2 0 11-4 0 2 2 0 014 0z"/>
      <path d="M11 10l-3.5 3"/>
      <rect x="13" y="15" width="8" height="3" rx="0.5"/>
      <path d="M15 15v-2h4v2"/>
    </svg>
  ),
  'Taglio Termico Rottami': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 12.5V8.2c0-2.3 1.9-4.2 4.2-4.2 2.6 0 4.8 1.7 5 4.4"/>
      <path d="M18.7 8.4c.2 2.4-1 4.6-3.2 6.2L13 16.6"/>
      <path d="M13 16.6c-.5 1 -.2 2 .7 2.5M13 16.6c1 .4 2 0 2.3-1"/>
      <path d="M7.6,13.7 L9.07,14.55 L9.07,16.25 L7.6,17.1 L6.13,16.25 L6.13,14.55 Z"/>
      <path d="M7.6,10.35 L9.07,11.2 L9.07,12.9 L7.6,13.75 L6.13,12.9 L6.13,11.2 Z"/>
      <path d="M10.5,12.03 L11.97,12.88 L11.97,14.58 L10.5,15.43 L9.03,14.58 L9.03,12.88 Z"/>
      <path d="M10.5,15.37 L11.97,16.22 L11.97,17.92 L10.5,18.77 L9.03,17.92 L9.03,16.22 Z"/>
      <path d="M7.6,17.05 L9.07,17.9 L9.07,19.6 L7.6,20.45 L6.13,19.6 L6.13,17.9 Z"/>
      <path d="M4.7,15.37 L6.17,16.22 L6.17,17.92 L4.7,18.77 L3.23,17.92 L3.23,16.22 Z"/>
      <path d="M4.7,12.02 L6.17,12.87 L6.17,14.57 L4.7,15.42 L3.23,14.57 L3.23,12.87 Z"/>
      <circle cx="7.6" cy="15.4" r="0.45"/>
      <circle cx="7.6" cy="12.05" r="0.45"/>
      <circle cx="10.5" cy="13.73" r="0.45"/>
      <circle cx="10.5" cy="17.07" r="0.45"/>
      <circle cx="7.6" cy="18.75" r="0.45"/>
      <circle cx="4.7" cy="17.07" r="0.45"/>
      <circle cx="4.7" cy="13.72" r="0.45"/>
    </svg>
  ),
  'Smantellamento Impianti': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10.5" y="4" width="3" height="16" rx="0.4"/>
      <line x1="10.5" y1="7.5" x2="13.5" y2="7.5"/>
      <path d="M3 20v-6l3 2v-2l3 2v6"/>
      <path d="M15 20v-5l3 2v-2l3 2v3"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
      <circle cx="5" cy="17.6" r="0.6"/><circle cx="7.4" cy="17.6" r="0.6"/>
    </svg>
  ),
  'Intervento in Ambiente Produttivo': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z"/>
      <circle cx="12" cy="12" r="3.2"/>
    </svg>
  ),
  'Strip-out': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4l7 3-7 3-7-3z"/>
      <path d="M12 9.5l7 3-7 3-7-3z"/>
      <path d="M12 15l7 3-7 3-7-3z"/>
    </svg>
  ),
  'Caso Complesso da Valutare': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="17" rx="2"/>
      <rect x="9" y="2" width="6" height="3.2" rx="1"/>
      <circle cx="9" cy="10" r="1"/><line x1="11.5" y1="10" x2="16" y2="10"/>
      <circle cx="9" cy="13.5" r="1"/><line x1="11.5" y1="13.5" x2="16" y2="13.5"/>
      <circle cx="9" cy="17" r="1"/><line x1="11.5" y1="17" x2="16" y2="17"/>
    </svg>
  ),
  'Industria': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Smoke curls */}
      <path d="M3 4.6c.6-.8 1.4-.8 2 0s1.4.8 2 0" strokeWidth="1.2"/>
      <path d="M3.6 2.3c.5-.7 1.1-.7 1.6 0s1.1.7 1.6 0" strokeWidth="1.2"/>
      {/* Chimney */}
      <path d="M4 20.5V8h2.6v3.5"/>
      {/* Sawtooth (shed) roof building */}
      <path d="M6.6 20.5v-7l3 2v-2l3 2v-2l3 2V9h4.8v11.5z"/>
      {/* Window grid (filled squares) */}
      <g fill="currentColor" stroke="none">
        <rect x="8" y="15.4" width="1.5" height="1.5"/>
        <rect x="10.7" y="15.4" width="1.5" height="1.5"/>
        <rect x="13.4" y="15.4" width="1.5" height="1.5"/>
        <rect x="8" y="17.9" width="1.5" height="1.5"/>
        <rect x="10.7" y="17.9" width="1.5" height="1.5"/>
        <rect x="13.4" y="17.9" width="1.5" height="1.5"/>
      </g>
      {/* Right section windows (slits) */}
      <path d="M17 13h2.6M17 15.6h2.6M17 18.2h2.6"/>
    </svg>
  ),
  'Trader & Mandatari Acciaierie': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 17l2 2a1 1 0 001.5-1.3"/>
      <path d="M13.5 14.5l2 2a1 1 0 001.5-1.3l-3.7-3.7a3 3 0 00-4.2 0l-.8.8a1 1 0 01-1.4-1.4l2.7-2.7a5.5 5.5 0 016.7-.8l.4.3a2 2 0 001.4.2L21 7"/>
      <path d="M21 6l1 9h-1.6"/>
      <path d="M3 6l-1 9 6 6a1 1 0 001.5-1.3"/>
      <path d="M3 7h7"/>
    </svg>
  ),
  'Acciaieria & Fonderia': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3.5h4v3l3.2 4.3a4.2 4.2 0 01-3.4 6.7h-3.6a4.2 4.2 0 01-3.4-6.7L10 6.5z"/>
      <path d="M6.6 13.5a5.4 5.4 0 0010.8 0"/>
      <line x1="9.5" y1="20.5" x2="14.5" y2="20.5"/>
      <line x1="9.8" y1="3.5" x2="14.2" y2="3.5"/>
    </svg>
  ),
  'Altro Settore': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.6"/>
      <circle cx="5.5" cy="17" r="2.6"/>
      <circle cx="18.5" cy="17" r="2.6"/>
      <line x1="10.8" y1="7.3" x2="6.7" y2="14.7"/>
      <line x1="13.2" y1="7.3" x2="17.3" y2="14.7"/>
      <line x1="8.1" y1="17" x2="15.9" y2="17"/>
    </svg>
  ),
  'Settore Commerciale': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l1.8-3.2A1.6 1.6 0 016.2 4h11.6a1.6 1.6 0 011.4.8L21 8"/>
      <path d="M4.5 11.5V19a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-7.5"/>
      <path d="M14 20.5v-3.5a1.5 1.5 0 00-1.5-1.5h-1a1.5 1.5 0 00-1.5 1.5v3.5"/>
      <line x1="3" y1="8" x2="21" y2="8"/>
      <path d="M21 8v2a1.6 1.6 0 01-3 .7 1.6 1.6 0 01-3 0 1.6 1.6 0 01-3 0 1.6 1.6 0 01-3 0 1.6 1.6 0 01-3 0A1.6 1.6 0 013 10V8"/>
    </svg>
  ),
  'Impianto Industriale e Sito Produttivo': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="5" height="10" rx="0.4"/>
      <rect x="5.3" y="5.5" width="2.4" height="3.5"/>
      <circle cx="6.5" cy="12.5" r="0.45"/><circle cx="6.5" cy="15" r="0.45"/>
      <path d="M12.8 19l1-7h3.4l1 7z"/>
      <line x1="13" y1="14" x2="18.2" y2="14"/>
      <line x1="14.2" y1="14.5" x2="14.2" y2="19"/><line x1="15.5" y1="14.5" x2="15.5" y2="19"/><line x1="17" y1="14.5" x2="17" y2="19"/>
      <path d="M15.5 12V9M14 9.4l1.5-.9 1.5.9M15.5 8.5V6.5"/>
    </svg>
  ),
  'Centro Riciclo Rottami': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 19H4.8a1.8 1.8 0 01-1.57-2.66L7.2 9.5"/>
      <path d="M11 19h8.2a1.8 1.8 0 001.56-2.66l-1.23-2.12"/>
      <path d="M14 16l-3 3 3 3"/>
      <path d="M8.29 13.6L7.2 9.5 3.1 10.6"/>
      <path d="M9.34 5.81l1.1-1.9A1.8 1.8 0 0113.53 3.9l3.94 6.84"/>
      <path d="M13.38 9.63l4.1 1.1 1.1-4.1"/>
    </svg>
  ),
}

const SHORT_LABEL = {
  'Intervento in Ambiente Produttivo': 'INTERVENTO IN\nAMBIENTE PROD.',
  'Caso Complesso da Valutare':        'CASO COMPLESSO\nDA VALUTARE',
  'Trader & Mandatari Acciaierie':     'TRADER &\nMANDATARI\nACCIAIERIE',
  'Impianto Industriale e Sito Produttivo': 'IMPIANTO IND.\nE SITO PROD.',
}

const SUBTITLE = {
  'Altro Settore': 'Specifica il settore',
}

/* ── Geometry helpers ────────────────────────────────────────────── */
function toXY(cx, cy, r, degFromTop) {
  const rad = ((degFromTop - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
function donutArc(cx, cy, r1, r2, a1, a2) {
  const p1 = toXY(cx, cy, r2, a1)
  const p2 = toXY(cx, cy, r2, a2)
  const p3 = toXY(cx, cy, r1, a2)
  const p4 = toXY(cx, cy, r1, a1)
  const large = (a2 - a1) > 180 ? 1 : 0
  return `M${p1.x},${p1.y} A${r2},${r2} 0 ${large},1 ${p2.x},${p2.y} L${p3.x},${p3.y} A${r1},${r1} 0 ${large},0 ${p4.x},${p4.y} Z`
}

/* ── Component ───────────────────────────────────────────────────── */
/*
 * Parametric metallic rotary selector (pure SVG — supports any N segments).
 *
 * Props:
 *   items     : string[]
 *   selected  : number | number[]   (array when multiple=true)
 *   onChange  : (next) => void       (next is index OR new array)
 *   multiple  : boolean              (true = multi-select)
 *   theme     : 'orange' | 'green'
 *   stepNum, centerLabel, centerSub
 */
export default function RotarySelector({
  items,
  selected,
  onChange,
  multiple = false,
  theme = 'orange',
  stepNum,
  centerLabel,
  centerSub,
}) {
  const n  = items.length
  const id = stepNum || theme

  const isGreen = theme === 'green'
  const NEON       = isGreen ? '#7CFF1A' : '#FF8C00'
  const NEON_HI    = isGreen ? '#CCFF88' : '#FFC56B'
  const NEON_DEEP  = isGreen ? '#1A5500' : '#6B3500'
  const RGB        = isGreen ? '124,255,26' : '255,140,0'
  const GLOW_TEXT  = `0 0 14px rgba(${RGB},0.9), 0 0 28px rgba(${RGB},0.4)`

  /* ── Ring geometry ── */
  const SZ      = 470
  const CX      = 235, CY = 235
  const ROUT    = 228          // outer rim outer edge
  const RIM_IN  = 221          // outer rim inner edge
  const RO      = 216          // segment band outer
  const RI      = 127          // segment band inner
  const RCTR    = 118           // center disc radius
  const RITEM   = 172          // icon/label radius
  const GAP     = 2.6          // degrees between segments
  const segHalf = 180 / n

  const [hoverIndex, setHoverIndex] = useState(-1)

  /* ── Selection helpers ── */
  const isSel = (i) =>
    multiple ? Array.isArray(selected) && selected.includes(i) : selected === i

  const toggle = (i) => {
    if (multiple) {
      const arr = Array.isArray(selected) ? selected : []
      onChange(arr.includes(i) ? arr.filter(x => x !== i) : [...arr, i])
    } else {
      onChange(i)
    }
  }

  const selCount = multiple
    ? (Array.isArray(selected) ? selected.length : 0)
    : (selected != null ? 1 : 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: SZ, height: SZ, flexShrink: 0 }}>

        <svg width={SZ} height={SZ} viewBox={`0 0 ${SZ} ${SZ}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <defs>
            {/* Brushed-steel ring base */}
            <radialGradient id={`steel${id}`} cx="50%" cy="28%" r="80%">
              <stop offset="0%"  stopColor="#42434A" />
              <stop offset="42%" stopColor="#24252A" />
              <stop offset="100%" stopColor="#0B0B0D" />
            </radialGradient>

            {/* Unselected segment steel */}
            <linearGradient id={`segOff${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#32333A" />
              <stop offset="50%"  stopColor="#1E1F24" />
              <stop offset="100%" stopColor="#101116" />
            </linearGradient>

            {/* Selected segment — fluorescent (bright at outer rim) */}
            <radialGradient id={`segOn${id}`} cx="50%" cy="2%" r="118%">
              <stop offset="0%"   stopColor={NEON_HI}  stopOpacity="1" />
              <stop offset="32%"  stopColor={NEON}     stopOpacity="0.98" />
              <stop offset="70%"  stopColor={NEON_DEEP} stopOpacity="0.92" />
              <stop offset="100%" stopColor="#0A0A0C"  stopOpacity="0.95" />
            </radialGradient>

            {/* Center disc */}
            <radialGradient id={`disc${id}`} cx="50%" cy="36%" r="65%">
              <stop offset="0%"   stopColor="#2A2B31" />
              <stop offset="100%" stopColor="#0A0A0C" />
            </radialGradient>

            {/* Neon glow filter */}
            <filter id={`neon${id}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b1" />
              <feGaussianBlur stdDeviation="13" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer rim */}
          <circle cx={CX} cy={CY} r={ROUT + 4} fill="#050506" />
          <circle cx={CX} cy={CY} r={ROUT} fill={`url(#steel${id})`} stroke="#000" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={RIM_IN} fill="#0A0A0C" stroke="#2C2D33" strokeWidth="1.2" />

          {/* Bolts on the outer rim */}
          {Array.from({ length: 8 }).map((_, k) => {
            const p = toXY(CX, CY, (ROUT + RIM_IN) / 2, k * 45)
            return <circle key={k} cx={p.x} cy={p.y} r="3.4" fill="#0D0E11" stroke="#3A3B42" strokeWidth="1" />
          })}

          {/* Segments */}
          {items.map((_, i) => {
            const ca  = i * (360 / n)               // segment center angle (top = 0)
            const a1  = ca - segHalf + GAP / 2
            const a2  = ca + segHalf - GAP / 2
            const on  = isSel(i)
            const hot = hoverIndex === i && !on     // hover preview (not yet selected)
            const lit = on || hot
            return (
              <g key={i}
                onClick={() => toggle(i)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(h => h === i ? -1 : h)}
                style={{ cursor: 'pointer' }}>
                {/* segment plate */}
                <path
                  d={donutArc(CX, CY, RI, RO, a1, a2)}
                  fill={lit ? `url(#segOn${id})` : `url(#segOff${id})`}
                  stroke={lit ? `rgba(${RGB},0.55)` : '#0A0A0C'}
                  strokeWidth={lit ? 1.4 : 1}
                  filter={lit ? `url(#neon${id})` : undefined}
                  opacity={on ? 1 : hot ? 0.6 : 1}
                  style={{ transition: 'fill 0.2s, opacity 0.2s' }}
                />
                {/* bright outer rim highlight when lit */}
                {lit && (
                  <path
                    d={donutArc(CX, CY, RO - 14, RO - 2, a1 + 1.5, a2 - 1.5)}
                    fill={NEON_HI}
                    opacity={on ? 0.92 : 0.5}
                    filter={`url(#neon${id})`}
                  />
                )}
                {/* inner bevel line */}
                <path
                  d={donutArc(CX, CY, RI, RI + 2.5, a1, a2)}
                  fill={lit ? `rgba(${RGB},0.5)` : 'rgba(255,255,255,0.05)'}
                />
              </g>
            )
          })}

          {/* Inner ring + center disc */}
          <circle cx={CX} cy={CY} r={RI} fill="#0A0A0C" stroke="#2A2B31" strokeWidth="1.2" />
          <circle cx={CX} cy={CY} r={RCTR} fill={`url(#disc${id})`} stroke={`rgba(${RGB},0.30)`} strokeWidth="1.4" />
          <circle cx={CX} cy={CY} r={RCTR - 5} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        </svg>

        {/* ── Icons + labels over each segment ── */}
        {items.map((item, i) => {
          const angleDeg = i * (360 / n) - 90
          const angleRad = (angleDeg * Math.PI) / 180
          const x = CX + RITEM * Math.cos(angleRad)
          const y = CY + RITEM * Math.sin(angleRad)
          const on = isSel(i)
          const hot = hoverIndex === i && !on
          const lit = on || hot
          const subtitle = SUBTITLE[item]

          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(h => h === i ? -1 : h)}
              title={item}
              style={{
                position: 'absolute',
                left: x, top: y,
                transform: 'translate(-50%, -50%)',
                background: 'transparent', border: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2,
                cursor: 'pointer', zIndex: 10,
                width: 98, padding: '2px',
                pointerEvents: 'auto',
              }}
            >
              <div style={{
                color: on ? NEON_HI : hot ? NEON : '#F2F2F2',
                filter: lit
                  ? `drop-shadow(0 0 6px rgba(${RGB},1)) drop-shadow(0 0 13px rgba(${RGB},0.6))`
                  : 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))',
                transform: lit ? 'scale(1.42)' : 'scale(1.3)',
                transition: 'color 0.2s, filter 0.2s, transform 0.2s',
                lineHeight: 0,
              }}>
                {ICONS[item] || (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </div>

              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.04em',
                color: lit ? '#FFFFFF' : '#EDEDED',
                textAlign: 'center',
                lineHeight: 1.2,
                textShadow: lit ? `0 0 10px rgba(${RGB},0.9)` : '0 1px 3px rgba(0,0,0,0.95)',
                whiteSpace: 'pre-line',
                maxWidth: 96,
                transition: 'all 0.25s',
              }}>
                {SHORT_LABEL[item] || item.toUpperCase()}
              </span>

              {subtitle && (
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 7,
                  color: on ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)',
                  textAlign: 'center', lineHeight: 1.2, maxWidth: 80,
                  transition: 'color 0.25s',
                }}>
                  {subtitle}
                </span>
              )}
            </button>
          )
        })}

        {/* ── Center ── */}
        <div style={{
          position: 'absolute', left: CX, top: CY,
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', zIndex: 20, pointerEvents: 'none',
          width: RCTR * 2 - 14,
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: 72, lineHeight: 1,
            color: NEON, textShadow: GLOW_TEXT,
          }}>{stepNum}</div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700, fontSize: 12.5, letterSpacing: '0.14em',
            color: NEON, textTransform: 'uppercase', marginTop: 2,
          }}>{centerLabel}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 7.5, color: 'rgba(255,255,255,0.30)',
            marginTop: 4, lineHeight: 1.3,
          }}>{centerSub}</div>
          {multiple && (
            <div style={{
              marginTop: 6,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: 9, letterSpacing: '0.08em',
              color: selCount ? NEON : 'rgba(255,255,255,0.25)',
              textShadow: selCount ? `0 0 8px rgba(${RGB},0.7)` : 'none',
            }}>
              {selCount ? `${selCount} SELEZIONAT${selCount === 1 ? 'O' : 'I'}` : 'NESSUNA SCELTA'}
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom label strip ── */}
      <div style={{
        background: `linear-gradient(90deg, transparent, rgba(${RGB},0.07), transparent)`,
        border: `1px solid rgba(${RGB},0.22)`,
        borderRadius: 4,
        padding: '6px 18px',
        minWidth: 240, maxWidth: 300,
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700, fontSize: 12, letterSpacing: '0.05em',
          color: selCount ? NEON : 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase', lineHeight: 1.3,
        }}>
          {multiple
            ? (selCount
                ? selected.map(i => items[i]).join(' · ')
                : (centerLabel === 'TIPO INTERVENTO' ? 'Seleziona uno o più tipi' : 'Seleziona'))
            : (selected != null ? items[selected] : 'Seleziona il settore')}
        </span>
      </div>
    </div>
  )
}
