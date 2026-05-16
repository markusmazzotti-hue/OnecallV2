import React from 'react'

/* ── Icons ──────────────────────────────────────────────────────── */
const ICONS = {
  'Demolizione Industriale': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l2-8h14l2 8H3z"/><path d="M7 17V9"/><path d="M12 17V9"/><path d="M17 17V9"/>
      <rect x="1" y="17" width="22" height="4" rx="1"/><path d="M8 9V7a4 4 0 018 0v2"/>
    </svg>
  ),
  'Taglio Termico Rottami': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 8 4 12 8 16c1 1 2 1.5 3 1.5"/><path d="M12 2c6 6 8 10 4 14-1 1-2 1.5-3 1.5"/>
      <path d="M9 17.5C9 19.4 10.3 21 12 21s3-1.6 3-3.5"/>
      <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="2 2"/>
    </svg>
  ),
  'Smantellamento Impianti': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  'Intervento in Ambiente Produttivo': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  'Strip-out': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
    </svg>
  ),
  'Caso Complesso da Valutare': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  'Industria': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V10l5-5v5l5-5v5l5-5v15H2z"/><line x1="2" y1="20" x2="22" y2="20"/>
      <rect x="14" y="14" width="4" height="6"/>
    </svg>
  ),
  'Trader & Mandatari Acciaierie': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  'Acciaieria & Fonderia': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h10m0-11v11m0 0h-4"/>
      <path d="M2 9h20"/><circle cx="12" cy="16" r="2"/>
    </svg>
  ),
  'Altro Settore': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
      <circle cx="5" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
    </svg>
  ),
  'Settore Commerciale': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  'Impianto Industriale e Sito Produttivo': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20"/>
    </svg>
  ),
  'Centro Riciclo Rottami': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
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

/* ── Component ───────────────────────────────────────────────────── */
/*
 * Uses two PNG renders as base layers (placed in /public/):
 *   /selector-off.png  — dark metallic ring, all segments unlit
 *   /selector-on.png   — same ring, TOP segment illuminated amber/orange
 *
 * The ON image is always shown at full opacity because the active
 * segment is always rendered at the top position.
 * For the green theme a CSS hue-rotate shifts amber → lime-green.
 *
 * Interactive icons + labels are absolutely positioned HTML on top.
 * Invisible <button> elements overlap the PNG arrow graphics.
 */
export default function RotarySelector({
  items, activeIndex, onChange,
  theme = 'orange', stepNum, centerLabel, centerSub,
}) {
  const n        = items.length
  const isGreen  = theme === 'green'
  const COLOR    = isGreen ? '#7EFF00' : '#FFA500'
  const RGB      = isGreen ? '126,255,0' : '255,165,0'
  const GLOW     = isGreen
    ? '0 0 18px rgba(126,255,0,0.85), 0 0 36px rgba(126,255,0,0.35)'
    : '0 0 18px rgba(255,165,0,0.85), 0 0 36px rgba(255,165,0,0.35)'

  /*
   * SZ = PNG display size (the images include the frame + arrow buttons)
   * CX/CY = center of the ring within the image (roughly centered)
   * RITEM = radius at which icons/labels are positioned (ring band midpoint)
   * RC    = center-void radius (where stepNum is rendered)
   *
   * Arrow hit-boxes: the PNG arrows sit at left ≈16px and right ≈16px,
   * vertically centered, ~60px wide × 76px tall.
   */
  const SZ    = 440
  const CX    = 220
  const CY    = 220
  const RITEM = 152   // midpoint between inner void and outer ring edge
  const RC    = 96    // center-void radius

  const prev = () => onChange((activeIndex - 1 + n) % n)
  const next = () => onChange((activeIndex + 1) % n)

  /* CSS filter that shifts the orange ON-image to green */
  const greenFilter = 'hue-rotate(88deg) saturate(1.15)'
  const onFilter    = isGreen
    ? `${greenFilter} drop-shadow(0 0 18px rgba(100,255,0,0.4))`
    : 'drop-shadow(0 0 18px rgba(255,165,0,0.35))'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: SZ, height: SZ, flexShrink: 0 }}>

        {/* ── Layer 1: base OFF image (always dark, always shown) ── */}
        <img
          src="/selector-off.png"
          alt=""
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain',
            userSelect: 'none', pointerEvents: 'none',
          }}
        />

        {/* ── Layer 2: ON image (top segment illuminated, always shown) ── */}
        <img
          src="/selector-on.png"
          alt=""
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain',
            filter: onFilter,
            userSelect: 'none', pointerEvents: 'none',
          }}
        />

        {/* ── HTML items: icon + label, rotate to show active at top ── */}
        {items.map((item, i) => {
          const pos      = (i - activeIndex + n) % n
          const angleDeg = pos * (360 / n) - 90   // 0° → right, -90° → top
          const angleRad = (angleDeg * Math.PI) / 180
          const x        = CX + RITEM * Math.cos(angleRad)
          const y        = CY + RITEM * Math.sin(angleRad)
          const isActive = i === activeIndex
          const diff     = Math.min(pos, n - pos)
          const opacity  = isActive ? 1 : Math.max(0.22, 0.62 - diff * 0.14)
          const subtitle = SUBTITLE[item]

          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              title={item}
              style={{
                position: 'absolute',
                left: x, top: y,
                transform: 'translate(-50%, -50%)',
                background: 'transparent', border: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 3,
                opacity,
                cursor: 'pointer',
                transition: 'opacity 0.4s ease',
                zIndex: 10,
                width: 82, padding: '2px',
              }}
            >
              {/* Icon */}
              <div style={{
                color: isActive ? COLOR : '#5A5A5A',
                filter: isActive
                  ? `drop-shadow(0 0 7px rgba(${RGB},0.9)) drop-shadow(0 0 14px rgba(${RGB},0.5))`
                  : 'none',
                transition: 'color 0.35s, filter 0.35s',
                lineHeight: 0,
              }}>
                {ICONS[item] || (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                )}
              </div>

              {/* Label */}
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: isActive ? 10 : 9,
                letterSpacing: '0.04em',
                color: isActive ? '#FFFFFF' : '#888',
                textAlign: 'center',
                lineHeight: 1.25,
                textShadow: isActive ? `0 0 10px rgba(${RGB},0.8)` : 'none',
                whiteSpace: 'pre-line',
                maxWidth: 80,
                transition: 'all 0.35s',
              }}>
                {SHORT_LABEL[item] || item.toUpperCase()}
              </span>

              {/* Per-item subtitle */}
              {subtitle && (
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 7,
                  color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  maxWidth: 78,
                  transition: 'color 0.35s',
                }}>
                  {subtitle}
                </span>
              )}
            </button>
          )
        })}

        {/* ── Center: step number + labels ── */}
        <div style={{
          position: 'absolute',
          left: CX, top: CY,
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 20,
          pointerEvents: 'none',
          width: RC * 2 - 12,
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: 64, lineHeight: 1,
            color: COLOR, textShadow: GLOW,
          }}>{stepNum}</div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700, fontSize: 11,
            letterSpacing: '0.15em',
            color: COLOR, textTransform: 'uppercase', marginTop: 2,
          }}>{centerLabel}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 8, color: 'rgba(255,255,255,0.28)',
            marginTop: 4, lineHeight: 1.35,
          }}>{centerSub}</div>
        </div>

        {/* ── Invisible click-targets over the PNG arrow buttons ──
              Left arrow: ~16px from left, centered vertically, ~60×76px
              Right arrow: ~16px from right, centered vertically, ~60×76px  ── */}
        <button
          onClick={prev}
          aria-label="Precedente"
          style={{
            position: 'absolute',
            left: 16, top: '50%',
            transform: 'translateY(-50%)',
            width: 60, height: 76,
            background: 'transparent', border: 'none',
            cursor: 'pointer', zIndex: 30,
          }}
        />
        <button
          onClick={next}
          aria-label="Successivo"
          style={{
            position: 'absolute',
            right: 16, top: '50%',
            transform: 'translateY(-50%)',
            width: 60, height: 76,
            background: 'transparent', border: 'none',
            cursor: 'pointer', zIndex: 30,
          }}
        />
      </div>

      {/* ── Active item label strip below the wheel ── */}
      <div style={{
        background: `linear-gradient(90deg, transparent, rgba(${RGB},0.07), transparent)`,
        border: `1px solid rgba(${RGB},0.22)`,
        borderRadius: 4,
        padding: '5px 24px',
        minWidth: 230,
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700, fontSize: 13,
          letterSpacing: '0.07em',
          color: COLOR, textTransform: 'uppercase',
        }}>{items[activeIndex]}</span>
      </div>
    </div>
  )
}
