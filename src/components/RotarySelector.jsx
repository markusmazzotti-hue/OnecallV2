import React from 'react'

/* ── Icons ──────────────────────────────────────────────── */
const ICONS = {
  'Demolizione Industriale': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l2-8h14l2 8H3z"/><path d="M7 17V9"/><path d="M12 17V9"/><path d="M17 17V9"/>
      <rect x="1" y="17" width="22" height="4" rx="1"/><path d="M8 9V7a4 4 0 018 0v2"/>
    </svg>
  ),
  'Taglio Termico Rottami': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 8 4 12 8 16c1 1 2 1.5 3 1.5"/><path d="M12 2c6 6 8 10 4 14-1 1-2 1.5-3 1.5"/>
      <path d="M9 17.5C9 19.4 10.3 21 12 21s3-1.6 3-3.5"/>
      <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="2 2"/>
    </svg>
  ),
  'Smantellamento Impianti': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  'Intervento in Ambiente Produttivo': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  'Strip-out': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
    </svg>
  ),
  'Caso Complesso da Valutare': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  'Industria': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V10l5-5v5l5-5v5l5-5v15H2z"/><line x1="2" y1="20" x2="22" y2="20"/>
      <rect x="14" y="14" width="4" height="6"/>
    </svg>
  ),
  'Trader & Mandatari Acciaierie': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  'Acciaieria & Fonderia': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h10m0-11v11m0 0h-4"/>
      <path d="M2 9h20"/><circle cx="12" cy="16" r="2"/>
    </svg>
  ),
  'Altro Settore': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
      <circle cx="5" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
    </svg>
  ),
  'Settore Commerciale': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  'Impianto Industriale e Sito Produttivo': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20"/>
    </svg>
  ),
  'Centro Riciclo Rottami': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
    </svg>
  ),
}

/* Items that need shorter label lines */
const SHORT_LABEL = {
  'Intervento in Ambiente Produttivo': 'INTERVENTO IN\nAMBIENTE PROD.',
  'Caso Complesso da Valutare':        'CASO COMPLESSO\nDA VALUTARE',
  'Trader & Mandatari Acciaierie':     'TRADER &\nMANDATARI\nACCIAIERIE',
  'Impianto Industriale e Sito Produttivo': 'IMPIANTO IND.\nE SITO PROD.',
}

/* Items with a subtitle line shown under the label */
const SUBTITLE = {
  'Altro Settore': 'Specifica il settore',
}

/* ── Geometry helpers ─────────────────────────────────────── */
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

/* ── Component ────────────────────────────────────────────── */
export default function RotarySelector({
  items, activeIndex, onChange,
  theme = 'orange', stepNum, centerLabel, centerSub,
}) {
  const n = items.length
  const isGreen = theme === 'green'

  /* Lime-green for green theme (matches industrial mockup), orange for Step 1 */
  const COLOR      = isGreen ? '#7EFF00' : '#FF8C00'
  const COLOR_BRIGHT = isGreen ? '#AAFF44' : '#FFA500'
  const COLOR_MID  = isGreen ? '#336600' : '#662200'
  const COLOR_DARK = isGreen ? '#0A1800' : '#180800'
  const COLOR_DIM  = isGreen ? 'rgba(126,255,0,0.25)' : 'rgba(255,140,0,0.25)'
  const GLOW       = isGreen
    ? '0 0 20px rgba(126,255,0,0.9), 0 0 40px rgba(126,255,0,0.4)'
    : '0 0 20px rgba(255,140,0,0.9), 0 0 40px rgba(255,140,0,0.4)'
  const RGB        = isGreen ? '126,255,0' : '255,140,0'

  /* Ring geometry — sized to match the industrial mockup */
  const SZ    = 350
  const CX    = 175, CY = 175
  const RO    = 165          // outer edge of ring
  const RI    = 95           // inner edge of ring
  const RC    = 86           // center disc radius
  const RITEM = 130          // item icon/text positioning radius (midpoint ≈ (95+165)/2)
  const GAP   = 4            // gap in degrees between segments

  const prev = () => onChange((activeIndex - 1 + n) % n)
  const next = () => onChange((activeIndex + 1) % n)

  const segHalf = 180 / n    // half-arc of one segment

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: SZ + 64, height: SZ, flexShrink: 0 }}>

        {/* ── SVG Ring ── */}
        <svg
          width={SZ} height={SZ}
          viewBox={`0 0 ${SZ} ${SZ}`}
          style={{ position: 'absolute', top: 0, left: 32, overflow: 'visible' }}
        >
          <defs>
            {/* Active segment fill: bright outer, fades to dark inner */}
            <radialGradient id={`ag${stepNum}`} cx="50%" cy="0%" r="100%" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor={COLOR_BRIGHT} stopOpacity="1"   />
              <stop offset="25%"  stopColor={COLOR}        stopOpacity="0.95"/>
              <stop offset="55%"  stopColor={COLOR_MID}    stopOpacity="0.85"/>
              <stop offset="85%"  stopColor={COLOR_DARK}   stopOpacity="0.9" />
              <stop offset="100%" stopColor="#060606"      stopOpacity="0.95"/>
            </radialGradient>

            {/* Center disc gradient */}
            <radialGradient id={`cg${stepNum}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#252525" />
              <stop offset="100%" stopColor="#070707" />
            </radialGradient>

            {/* Glow filter for active segment */}
            <filter id={`gf${stepNum}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Strong outer-arc glow */}
            <filter id={`of${stepNum}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="14" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* ── Base ring layers (outermost to innermost) ── */}
          <circle cx={CX} cy={CY} r={RO + 10} fill="#040404" />
          <circle cx={CX} cy={CY} r={RO + 4}  fill="#0A0A0A" stroke="#181818" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={RO}      fill="#111111" stroke="#222222" strokeWidth="1.5" />

          {/* ── Inactive segments ── */}
          {Array.from({ length: n }).map((_, i) => {
            const pos = (i - activeIndex + n) % n
            if (pos === 0) return null
            const ca = pos * (360 / n)
            const isNearActive = Math.min(pos, n - pos) === 1
            return (
              <path
                key={i}
                d={donutArc(CX, CY, RI + 3, RO - 4, ca - segHalf + GAP / 2, ca + segHalf - GAP / 2)}
                fill={isNearActive ? '#0E0E0E' : '#090909'}
                stroke="#1D1D1D"
                strokeWidth="0.8"
                onClick={() => onChange(i)}
                style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
              />
            )
          })}

          {/* ── Active segment (top = angle 0) — very bright ── */}
          <path
            d={donutArc(CX, CY, RI + 3, RO - 4, -segHalf + GAP / 2, segHalf - GAP / 2)}
            fill={`url(#ag${stepNum})`}
            stroke={COLOR_DIM}
            strokeWidth="1.5"
            filter={`url(#gf${stepNum})`}
          />

          {/* ── Outer bright rim arc at active position ── */}
          <path
            d={donutArc(CX, CY, RO - 18, RO - 3, -segHalf + GAP / 2 + 2, segHalf - GAP / 2 - 2)}
            fill={COLOR_BRIGHT}
            opacity="0.92"
            filter={`url(#of${stepNum})`}
          />

          {/* ── Inner ring border rings ── */}
          <circle cx={CX} cy={CY} r={RI + 3} fill="#0A0A0A" stroke="#202020" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r={RI - 1} fill="#111111" stroke={COLOR_DIM} strokeWidth="1" />
          <circle cx={CX} cy={CY} r={RI - 6} fill="#0D0D0D" stroke="#191919" strokeWidth="0.5" />

          {/* ── Center disc ── */}
          <circle cx={CX} cy={CY} r={RC} fill={`url(#cg${stepNum})`} stroke={COLOR_DIM} strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r={RC - 5} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

          {/* ── Bolt decorations at 8 positions on outer rim ── */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const p   = toXY(CX, CY, RO - 7, a)
            const big = a % 90 === 0
            return (
              <circle
                key={a}
                cx={p.x} cy={p.y}
                r={big ? 4 : 2.5}
                fill={big ? '#161616' : '#111'}
                stroke={big ? '#2E2E2E' : '#1E1E1E'}
                strokeWidth={big ? 1 : 0.7}
              />
            )
          })}

          {/* ── Thin outer-ring accent line ── */}
          <circle cx={CX} cy={CY} r={RO + 1} fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
        </svg>

        {/* ── HTML Items (icon + label inside ring band) ── */}
        {items.map((item, i) => {
          const pos      = (i - activeIndex + n) % n
          const angleDeg = pos * (360 / n) - 90
          const angleRad = (angleDeg * Math.PI) / 180
          const x        = 32 + CX + RITEM * Math.cos(angleRad)
          const y        = CY  + RITEM * Math.sin(angleRad)
          const isActive = i === activeIndex
          const diff     = Math.min(pos, n - pos)
          const opacity  = isActive ? 1 : Math.max(0.18, 0.62 - diff * 0.15)
          const subtitle = SUBTITLE[item]

          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              title={item}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                opacity,
                cursor: 'pointer',
                transition: 'opacity 0.4s ease',
                zIndex: isActive ? 10 : 5,
                width: 80,
                padding: '2px',
                pointerEvents: 'auto',
              }}
            >
              {/* Icon */}
              <div style={{
                color: isActive ? COLOR : '#3A3A3A',
                filter: isActive ? `drop-shadow(0 0 7px ${COLOR}) drop-shadow(0 0 14px ${COLOR})` : 'none',
                transition: 'color 0.35s, filter 0.35s',
                lineHeight: 0,
              }}>
                {ICONS[item] || (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                )}
              </div>

              {/* Main label */}
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 8,
                letterSpacing: '0.04em',
                color: isActive ? '#FFFFFF' : '#383838',
                textAlign: 'center',
                lineHeight: 1.2,
                textShadow: isActive ? `0 0 12px ${COLOR}, 0 0 6px ${COLOR}` : 'none',
                whiteSpace: 'pre-line',
                maxWidth: 78,
                transition: 'color 0.35s, text-shadow 0.35s',
              }}>
                {SHORT_LABEL[item] || item.toUpperCase()}
              </span>

              {/* Per-item subtitle (e.g. "Specifica il settore") */}
              {subtitle && (
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 6.5,
                  color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  maxWidth: 76,
                  transition: 'color 0.35s',
                }}>
                  {subtitle}
                </span>
              )}
            </button>
          )
        })}

        {/* ── Center text ── */}
        <div style={{
          position: 'absolute',
          left: 32 + CX,
          top: CY,
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 20,
          pointerEvents: 'none',
          width: RC * 2 - 10,
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 62,
            lineHeight: 1,
            color: COLOR,
            textShadow: GLOW,
          }}>{stepNum}</div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: COLOR,
            textTransform: 'uppercase',
            marginTop: 2,
          }}>{centerLabel}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 8,
            color: 'rgba(255,255,255,0.28)',
            marginTop: 4,
            lineHeight: 1.35,
          }}>{centerSub}</div>
        </div>

        {/* ── Navigation arrows ── */}
        {[
          { side: 'left',  fn: prev, label: '‹' },
          { side: 'right', fn: next, label: '›' },
        ].map(({ side, fn, label }) => (
          <button
            key={side}
            onClick={fn}
            style={{
              position: 'absolute',
              [side]: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 28,
              height: 54,
              background: 'rgba(6,6,6,0.97)',
              border: `1px solid rgba(${RGB},0.55)`,
              borderRadius: 5,
              color: COLOR,
              fontSize: 24,
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30,
              boxShadow: `0 0 14px rgba(${RGB},0.45), inset 0 0 8px rgba(${RGB},0.08)`,
              transition: 'box-shadow 0.2s',
              letterSpacing: '-2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 24px rgba(${RGB},0.75), inset 0 0 12px rgba(${RGB},0.15)`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = `0 0 14px rgba(${RGB},0.45), inset 0 0 8px rgba(${RGB},0.08)`
            }}
          >{label}</button>
        ))}
      </div>

      {/* ── Active item label strip ── */}
      <div style={{
        background: `linear-gradient(90deg, transparent, rgba(${RGB},0.07), transparent)`,
        border: `1px solid rgba(${RGB},0.22)`,
        borderRadius: 4,
        padding: '5px 22px',
        minWidth: 230,
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.07em',
          color: COLOR,
          textTransform: 'uppercase',
        }}>{items[activeIndex]}</span>
      </div>
    </div>
  )
}
