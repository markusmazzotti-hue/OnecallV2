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
      padding: '0 24px',
      height: 44,
      gap: 0,
      overflowX: 'auto',
    }}>
      {STEPS.map((step, idx) => {
        const isActive = activeSteps.includes(step.num)
        return (
          <React.Fragment key={step.num}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 16px',
              height: '100%',
              borderBottom: isActive ? '2px solid #FF8C00' : '2px solid transparent',
              opacity: isActive ? 1 : 0.45,
              flexShrink: 0,
            }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: isActive
                  ? 'linear-gradient(135deg, #CC7000, #FF8C00)'
                  : '#1E1E1E',
                border: isActive ? 'none' : '1px solid #2A2A2A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: isActive ? '#fff' : '#555',
                boxShadow: isActive ? '0 0 8px rgba(255,140,0,0.5)' : 'none',
                flexShrink: 0,
              }}>{step.num}</div>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.08em',
                color: isActive ? '#FFA500' : '#555',
                whiteSpace: 'nowrap',
              }}>{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{ width: 1, height: 20, background: '#1E1E1E', flexShrink: 0 }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
