import React from 'react'

export default function DonutChart({ data, total, size = 180, thickness = 28 }) {
  const radius = (size / 2) - thickness / 2
  const circumference = 2 * Math.PI * radius
  const cx = size / 2
  const cy = size / 2

  let offset = 0
  const segments = data.map(item => {
    const pct = item.value / total
    const dashArray = pct * circumference
    const dashOffset = -offset * circumference
    const seg = { ...item, dashArray, dashOffset, pct }
    offset += pct
    return seg
  })

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={thickness}
        />
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
            strokeDashoffset={seg.dashOffset}
            style={{ transition: 'all 0.5s ease', opacity: 0.9 }}
          />
        ))}
      </svg>
      {/* Center text */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 700,
          fontSize: 32,
          color: '#fff',
          lineHeight: 1,
        }}>{total}</div>
        <div style={{
          fontFamily: "'Rajdhani',sans-serif",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '0.1em',
          color: '#555',
          marginTop: 3,
        }}>TOTALI</div>
      </div>
    </div>
  )
}
