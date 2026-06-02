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
 * Accordion-style horizontal stepper (Bootstrap-accordion behaviour):
 *  - exactly one panel "open" at a time = the current step (first not completed)
 *  - completed steps collapse but stay illuminated (orange + check)
 *  - future steps stay dim and collapsed
 * As each step completes, its panel closes and the next opens.
 *
 * Props: completed = number[] of finished step numbers.
 */
export default function HeaderStepper({ completed = [] }) {
  // current open step = first step not yet completed (or none if all done)
  const active = STEPS.find(s => !completed.includes(s.num))?.num ?? null

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flexWrap: 'nowrap',
    }}>
      {STEPS.map((step, idx) => {
        const done = completed.includes(step.num)
        const open = step.num === active
        const lit = done || open

        return (
          <React.Fragment key={step.num}>
            <div
              title={step.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                height: 30,
                padding: open ? '0 13px 0 6px' : '0 5px',
                borderRadius: 15,
                background: open
                  ? 'rgba(255,140,0,0.16)'
                  : done
                  ? 'rgba(255,140,0,0.10)'
                  : 'transparent',
                border: open
                  ? '1px solid rgba(255,140,0,0.7)'
                  : done
                  ? '1px solid rgba(255,140,0,0.35)'
                  : '1px solid #222',
                boxShadow: open ? '0 0 14px rgba(255,140,0,0.35)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.34,1.1,0.5,1)',
                flexShrink: 0,
              }}
            >
              {/* number / check badge */}
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: lit ? 'linear-gradient(135deg,#CC7000,#FF8C00)' : 'transparent',
                border: lit ? 'none' : '1px solid #2E2E2E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12,
                color: lit ? '#fff' : '#444',
                boxShadow: lit ? '0 0 10px rgba(255,140,0,0.7)' : 'none',
                flexShrink: 0,
                transition: 'all 0.4s',
              }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : step.num}
              </div>

              {/* label — only the OPEN step shows it (accordion expand) */}
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.07em',
                color: '#FFA500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: open ? 200 : 0,
                opacity: open ? 1 : 0,
                textShadow: '0 0 8px rgba(255,140,0,0.5)',
                transition: 'max-width 0.4s ease, opacity 0.3s ease',
              }}>{step.label}</span>
            </div>

            {/* connector */}
            {idx < STEPS.length - 1 && (
              <div style={{
                width: 10, height: 2, borderRadius: 1, flexShrink: 0,
                background: completed.includes(step.num) ? 'rgba(255,140,0,0.5)' : '#222',
                transition: 'background 0.4s',
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
