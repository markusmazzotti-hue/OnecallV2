import React from 'react'

const STEPS = [
  { num: 1, label: 'TIPO INTERVENTO' },
  { num: 2, label: 'SETTORE' },
  { num: 3, label: 'DOVE E QUANDO' },
  { num: 4, label: 'FOTO, VIDEO E AUDIO' },
  { num: 5, label: 'DESCRIZIONE' },
  { num: 6, label: 'CONTATTI' },
  { num: 7, label: 'RIEPILOGO' },
]

/*
 * completed: array of step numbers that are done -> stay illuminated (orange).
 */
export default function StepNav({ completed = [] }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'var(--oc-surface)',
      borderBottom: '1px solid var(--oc-card-border)',
      padding: '0 16px',
      height: 44,
      gap: 3,
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {STEPS.map((step) => {
        const isLit = completed.includes(step.num)

        return (
          <div
            key={step.num}
            title={step.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: isLit ? '5px 14px' : '5px 9px',
              borderRadius: 4,
              background: isLit ? 'rgba(255,140,0,0.14)' : 'transparent',
              border: isLit ? '1px solid rgba(255,140,0,0.55)' : '1px solid transparent',
              boxShadow: isLit ? '0 0 12px rgba(255,140,0,0.25)' : 'none',
              transition: 'all 0.35s ease',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: isLit ? 'linear-gradient(135deg, #CC7000, #FF8C00)' : 'transparent',
              border: isLit ? 'none' : '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: isLit ? '#fff' : '#3A3A3A',
              boxShadow: isLit ? '0 0 10px rgba(255,140,0,0.7)' : 'none',
              flexShrink: 0,
              transition: 'all 0.35s ease',
            }}>
              {isLit ? (
                /* check mark when completed */
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : step.num}
            </div>
            {isLit && (
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.08em',
                color: '#FFA500',
                whiteSpace: 'nowrap',
                textShadow: '0 0 8px rgba(255,140,0,0.5)',
              }}>{step.label}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
