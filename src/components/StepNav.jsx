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

export default function StepNav({ activeSteps = [1, 2] }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#0A0A0A',
      borderBottom: '1px solid #1A1A1A',
      padding: '0 16px',
      height: 44,
      gap: 3,
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {STEPS.map((step) => {
        const isPrimary = activeSteps[0] === step.num
        const isSecondary = activeSteps.length > 1 && activeSteps[1] === step.num

        return (
          <div
            key={step.num}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 14px',
              borderRadius: 4,
              background: isPrimary
                ? 'rgba(255,140,0,0.14)'
                : isSecondary
                ? 'rgba(255,140,0,0.04)'
                : 'transparent',
              border: isPrimary
                ? '1px solid rgba(255,140,0,0.55)'
                : isSecondary
                ? '1px solid rgba(255,140,0,0.25)'
                : '1px solid transparent',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: isPrimary
                ? 'linear-gradient(135deg, #CC7000, #FF8C00)'
                : 'transparent',
              border: isPrimary
                ? 'none'
                : isSecondary
                ? '1px solid #FF8C00'
                : '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: isPrimary ? '#fff' : isSecondary ? '#FF8C00' : '#3A3A3A',
              boxShadow: isPrimary ? '0 0 8px rgba(255,140,0,0.5)' : 'none',
              flexShrink: 0,
            }}>{step.num}</div>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: isPrimary || isSecondary ? 700 : 600,
              fontSize: 11,
              letterSpacing: '0.08em',
              color: isPrimary ? '#FFA500' : isSecondary ? '#CC8800' : '#333',
              whiteSpace: 'nowrap',
            }}>{step.label}</span>
          </div>
        )
      })}
    </div>
  )
}
