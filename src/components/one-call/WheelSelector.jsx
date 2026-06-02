import Panel from './Panel.jsx'

const SIZE = 440
const CX = 220, CY = 220
const OUTER_R = 196, INNER_R = 120, LABEL_R = 158
const TICK_INNER = 186, TICK_OUTER = 204

function deg2rad(d) { return (d - 90) * Math.PI / 180 }

function sectorArc(cx, cy, outerR, innerR, startDeg, endDeg, gap = 2) {
  const s1 = deg2rad(startDeg + gap), e1 = deg2rad(endDeg - gap)
  const ox1 = cx + outerR * Math.cos(s1), oy1 = cy + outerR * Math.sin(s1)
  const ox2 = cx + outerR * Math.cos(e1), oy2 = cy + outerR * Math.sin(e1)
  const ix1 = cx + innerR * Math.cos(e1), iy1 = cy + innerR * Math.sin(e1)
  const ix2 = cx + innerR * Math.cos(s1), iy2 = cy + innerR * Math.sin(s1)
  const large = (endDeg - startDeg) > 180 ? 1 : 0
  return `M${ox1},${oy1} A${outerR},${outerR} 0 ${large} 1 ${ox2},${oy2} L${ix1},${iy1} A${innerR},${innerR} 0 ${large} 0 ${ix2},${iy2} Z`
}

function labelPos(cx, cy, midDeg) {
  const r = deg2rad(midDeg)
  return { x: cx + LABEL_R * Math.cos(r), y: cy + LABEL_R * Math.sin(r) }
}

function tickPos(cx, cy, deg) {
  const r = deg2rad(deg)
  return {
    x1: cx + TICK_INNER * Math.cos(r), y1: cy + TICK_INNER * Math.sin(r),
    x2: cx + TICK_OUTER * Math.cos(r), y2: cy + TICK_OUTER * Math.sin(r),
  }
}

const ACCENT = {
  orange: '#ffad18',
  lime:   '#a9f01f',
  cyan:   '#12c7f4',
}

export default function WheelSelector({ step, title, options, selected, onSelect, accent = 'orange' }) {
  const color      = ACCENT[accent] || ACCENT.orange
  const glowId     = `dg${step}`
  const count      = options.length
  const sectorDeg  = 360 / count
  const selArr     = Array.isArray(selected) ? selected : (selected ? [selected] : [])
  const selCount   = selArr.length
  const selItem    = selCount === 1 ? options.find(o => o.id === selArr[0]) : null
  const isMulti    = Array.isArray(selected)

  const cycleBy = (delta) => {
    if (isMulti) return
    const idx  = options.findIndex(o => o.id === selected)
    const next = options[((idx ?? 0) + delta + count) % count]
    onSelect(next.id)
  }

  return (
    <Panel step={step} title={title} accent={accent} className="oc-panel--wheel">
      <div className="oc-dial-wrap">

        <button
          type="button"
          className={`oc-dial-arrow oc-dial-arrow--${accent}`}
          onClick={() => cycleBy(-1)}
          aria-label="Voce precedente"
        >
          <svg viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L2 8l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <svg
          width={SIZE} height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="oc-dial-svg"
          aria-label={title}
        >
          <defs>
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id={`${glowId}bg`} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={color} stopOpacity=".08"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ambient glow */}
          <circle cx={CX} cy={CY} r={OUTER_R + 20} fill={`url(#${glowId}bg)`}/>

          {/* outer decorative rings */}
          <circle cx={CX} cy={CY} r={OUTER_R + 10} fill="none" stroke="rgba(255,255,255,.03)" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r={OUTER_R +  4} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>

          {/* sector arcs */}
          {options.map((item, i) => {
            const startDeg = i * sectorDeg
            const endDeg   = startDeg + sectorDeg
            const active   = selArr.includes(item.id)
            return (
              <path
                key={item.id}
                d={sectorArc(CX, CY, OUTER_R, INNER_R, startDeg, endDeg)}
                fill={active ? color : 'rgba(8,16,22,.92)'}
                stroke={active ? color : 'rgba(255,255,255,.07)'}
                strokeWidth={active ? 1.5 : 1}
                filter={active ? `url(#${glowId})` : undefined}
                style={{ cursor: 'pointer', transition: 'fill .2s, stroke .2s' }}
                onClick={() => onSelect(item.id)}
                role="button"
                aria-pressed={active}
              />
            )
          })}

          {/* tick lines at sector boundaries */}
          {options.map((_, i) => {
            const t = tickPos(CX, CY, i * sectorDeg)
            return <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(255,255,255,.18)" strokeWidth="1"/>
          })}

          {/* sector text labels */}
          {options.map((item, i) => {
            const midDeg = i * sectorDeg + sectorDeg / 2
            const pos    = labelPos(CX, CY, midDeg)
            const active = selArr.includes(item.id)
            const darkFg = active && (accent === 'orange' || accent === 'lime')
            const fill   = active ? (darkFg ? 'rgba(4,6,8,.9)' : '#fff') : 'rgba(232,236,239,.45)'
            const words  = item.label.split(' ')

            return (
              <text
                key={item.id}
                x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fill={fill}
                fontSize={words.length > 2 ? 8 : 9.5}
                fontFamily="'Barlow Condensed', sans-serif"
                fontWeight="800"
                letterSpacing=".05em"
                style={{ pointerEvents: 'none', textTransform: 'uppercase' }}
              >
                {words.length <= 2
                  ? item.label.toUpperCase()
                  : words.map((w, wi) => (
                    <tspan key={wi} x={pos.x} dy={wi === 0 ? -(words.length - 1) * 6 : 12}>
                      {w.toUpperCase()}
                    </tspan>
                  ))
                }
              </text>
            )
          })}

          {/* inner hub rings */}
          <circle cx={CX} cy={CY} r={INNER_R - 2}  fill="#05080d" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r={INNER_R - 10} fill="#071018" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r={INNER_R - 22} fill="#05080d" stroke={`${color}44`}          strokeWidth="1.5"/>

          {/* hub step tag */}
          <text x={CX} y={CY - 32} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(232,236,239,.28)" fontSize="7.5"
            fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" letterSpacing=".2em"
            style={{ textTransform: 'uppercase' }}>
            STEP {step}
          </text>

          {/* hub selection state */}
          {selCount === 0 && (
            <text x={CX} y={CY + 2} textAnchor="middle" dominantBaseline="middle"
              fill="rgba(232,236,239,.2)" fontSize="10"
              fontFamily="'Barlow Condensed', sans-serif" letterSpacing=".12em">
              SELEZIONA
            </text>
          )}

          {selCount === 1 && selItem && (() => {
            const words = selItem.label.toUpperCase().split(' ')
            const lineH = 14
            const top   = CY - ((words.length - 1) * lineH) / 2
            return words.map((w, wi) => (
              <text key={wi}
                x={CX} y={top + wi * lineH}
                textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize="11"
                fontFamily="'Barlow Condensed', sans-serif" fontWeight="900" letterSpacing=".05em">
                {w}
              </text>
            ))
          })()}

          {selCount > 1 && (
            <>
              <text x={CX} y={CY - 5} textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize="28"
                fontFamily="'Barlow Condensed', sans-serif" fontWeight="900">
                {selCount}
              </text>
              <text x={CX} y={CY + 18} textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize="8"
                fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" letterSpacing=".12em">
                SELEZIONATI
              </text>
            </>
          )}

          {/* hub sub-label */}
          <text x={CX} y={CY + 32} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(232,236,239,.18)" fontSize="7"
            fontFamily="'Barlow Condensed', sans-serif" letterSpacing=".16em">
            {step === 1 ? 'TIPO INTERVENTO' : 'SETTORE'}
          </text>
        </svg>

        <button
          type="button"
          className={`oc-dial-arrow oc-dial-arrow--${accent}`}
          onClick={() => cycleBy(+1)}
          aria-label="Voce successiva"
        >
          <svg viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
      <p className="oc-help">
        {isMulti
          ? 'Clicca sui settori per selezionare. Selezione multipla attiva.'
          : 'Clicca sul settore desiderato o usa le frecce per navigare.'}
      </p>
    </Panel>
  )
}
