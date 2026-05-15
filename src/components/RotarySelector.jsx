import React, { useState, useCallback } from 'react'

const ITEM_ICONS = {
  // Step 1
  'Demolizione Industriale': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l2-8h14l2 8H3z"/><path d="M7 17V9"/><path d="M12 17V9"/><path d="M17 17V9"/>
      <rect x="1" y="17" width="22" height="4" rx="1"/>
      <path d="M8 9V7a4 4 0 018 0v2"/>
    </svg>
  ),
  'Taglio Termico Rottami': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 8 4 12 8 16c1 1 2 1.5 3 1.5"/><path d="M12 2c6 6 8 10 4 14-1 1-2 1.5-3 1.5"/>
      <path d="M9 17.5C9 19.4 10.3 21 12 21s3-1.6 3-3.5"/>
      <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="2 2"/>
    </svg>
  ),
  'Smantellamento Impianti': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  'Intervento in Ambiente Produttivo': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  'Strip-out': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
    </svg>
  ),
  'Caso Complesso da Valutare': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  // Step 2
  'Industria': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V10l5-5v5l5-5v5l5-5v15H2z"/><line x1="2" y1="20" x2="22" y2="20"/>
      <rect x="14" y="14" width="4" height="6"/>
    </svg>
  ),
  'Trader & Mandatari Acciaierie': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  'Acciaieria & Fonderia': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h10m0-11v11m0 0h-4"/>
      <path d="M2 9h20"/><circle cx="12" cy="16" r="2"/>
    </svg>
  ),
  'Altro Settore': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  'Settore Commerciale': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  'Impianto Industriale e Sito Produttivo': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20"/><path d="M2 7h5M2 17h5M17 7h5M17 17h5"/>
    </svg>
  ),
  'Centro Riciclo Rottami': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      <polyline points="23,20 23,14 17,14"/><path d="M21 9a9 9 0 00-2.13 9.36L23 14"/>
    </svg>
  ),
}

function getItemLabel(label) {
  if (label === 'Intervento in Ambiente Produttivo') return 'Amb. Produttivo'
  if (label === 'Caso Complesso da Valutare') return 'Caso Complesso'
  if (label === 'Trader & Mandatari Acciaierie') return 'Trader Acciaierie'
  if (label === 'Impianto Industriale e Sito Produttivo') return 'Impianto Prod.'
  return label
}

export default function RotarySelector({ items, activeIndex, onChange, theme = 'orange', stepNum, centerLabel, centerSub }) {
  const total = items.length
  const color = theme === 'green' ? '#00E676' : '#FF8C00'
  const colorDim = theme === 'green' ? 'rgba(0,230,118,0.35)' : 'rgba(255,140,0,0.35)'
  const glowShadow = theme === 'green'
    ? '0 0 18px rgba(0,230,118,0.7), 0 0 36px rgba(0,230,118,0.3)'
    : '0 0 18px rgba(255,140,0,0.7), 0 0 36px rgba(255,140,0,0.3)'
  const bgGlow = theme === 'green'
    ? 'radial-gradient(ellipse at center, rgba(0,230,118,0.08) 0%, transparent 70%)'
    : 'radial-gradient(ellipse at center, rgba(255,140,0,0.08) 0%, transparent 70%)'

  const prev = () => onChange((activeIndex - 1 + total) % total)
  const next = () => onChange((activeIndex + 1) % total)

  const radius = 115

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ position: 'relative', width: 300, height: 300, flexShrink: 0 }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: bgGlow,
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Outer ring */}
        <div style={{
          position: 'absolute', inset: 10,
          border: `1px solid ${colorDim}`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Inner ring */}
        <div style={{
          position: 'absolute', inset: 60,
          border: `1px solid rgba(255,255,255,0.05)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Center */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1,
            color: color,
            textShadow: glowShadow,
          }}>{stepNum}</div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.12em',
            color: color,
            marginTop: 2,
          }}>{centerLabel}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 3,
            maxWidth: 72,
            lineHeight: 1.3,
          }}>{centerSub}</div>
        </div>

        {/* Items */}
        {items.map((item, i) => {
          const angleDeg = -90 + ((i - activeIndex + total) % total) * (360 / total)
          const angleRad = (angleDeg * Math.PI) / 180
          const x = Math.cos(angleRad) * radius
          const y = Math.sin(angleRad) * radius

          // Distance from active (top)
          const diff = Math.min((i - activeIndex + total) % total, (activeIndex - i + total) % total)
          const maxDiff = Math.floor(total / 2)
          const proximity = 1 - diff / maxDiff

          const isActive = i === activeIndex
          const opacity = isActive ? 1 : 0.25 + proximity * 0.45
          const scale = isActive ? 1.1 : 0.7 + proximity * 0.2
          const itemColor = isActive ? color : `rgba(255,255,255,${0.4 + proximity * 0.4})`
          const itemShadow = isActive ? glowShadow : 'none'

          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              title={item}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                opacity,
                transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                background: isActive
                  ? `radial-gradient(ellipse at center, rgba(${theme === 'green' ? '0,230,118' : '255,140,0'},0.18) 0%, transparent 70%)`
                  : 'transparent',
                border: isActive ? `1px solid ${colorDim}` : '1px solid transparent',
                borderRadius: 8,
                padding: '6px 8px',
                cursor: 'pointer',
                width: 68,
                zIndex: isActive ? 5 : 3,
                filter: isActive ? `drop-shadow(${glowShadow.split(',')[0]})` : 'none',
              }}
            >
              <div style={{ color: itemColor, filter: isActive ? `drop-shadow(0 0 6px ${color})` : 'none' }}>
                {ITEM_ICONS[item] || (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                )}
              </div>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: 9,
                letterSpacing: '0.04em',
                color: itemColor,
                textAlign: 'center',
                lineHeight: 1.2,
                textShadow: isActive ? itemShadow : 'none',
                whiteSpace: 'pre-wrap',
                maxWidth: 62,
              }}>
                {getItemLabel(item).toUpperCase()}
              </span>
            </button>
          )
        })}

        {/* Nav arrows */}
        <button
          onClick={prev}
          style={{
            position: 'absolute',
            left: -10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(30,30,30,0.9)',
            border: `1px solid #2A2A2A`,
            borderRadius: '50%',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            fontSize: 16,
            zIndex: 20,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = glowShadow }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.boxShadow = 'none' }}
        >‹</button>
        <button
          onClick={next}
          style={{
            position: 'absolute',
            right: -10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(30,30,30,0.9)',
            border: `1px solid #2A2A2A`,
            borderRadius: '50%',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            fontSize: 16,
            zIndex: 20,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = glowShadow }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.boxShadow = 'none' }}
        >›</button>
      </div>

      {/* Active label */}
      <div style={{
        marginTop: 8,
        textAlign: 'center',
        background: `linear-gradient(90deg, transparent, rgba(${theme === 'green' ? '0,230,118' : '255,140,0'},0.08), transparent)`,
        border: `1px solid rgba(${theme === 'green' ? '0,230,118' : '255,140,0'},0.2)`,
        borderRadius: 4,
        padding: '6px 16px',
        minWidth: 200,
      }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.06em',
          color: color,
          textTransform: 'uppercase',
        }}>
          {items[activeIndex]}
        </span>
      </div>
    </div>
  )
}
