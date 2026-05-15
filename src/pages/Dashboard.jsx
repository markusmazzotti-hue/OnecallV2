import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: '⊞', label: 'DASHBOARD', active: true },
  { icon: '≡', label: 'RICHIESTE' },
  { icon: '📅', label: 'CALENDARIO' },
  { icon: '🗺', label: 'MAPPA INTERVENTI' },
  { icon: '👥', label: 'PARTNER & NETWORK' },
  { icon: '⛏', label: 'CANTIERI ATTIVI' },
  { icon: '📊', label: 'STATISTICHE' },
  { icon: '🗄', label: 'ARCHIVIO' },
  { icon: '⚙', label: 'IMPOSTAZIONI' },
  { icon: '🔔', label: 'NOTIFICHE', badge: 12 },
]

const REQUESTS = [
  { id: '#OC-2024-0128', type: 'Taglio Termico Rottami', city: 'Taranto (TA)', status: 'In valutazione', statusColor: '#0088FF', priority: 'Urgente', priorityColor: '#FF3333', date: '22/05/2024' },
  { id: '#OC-2024-0127', type: 'Demolizione Industriale', city: 'Genova (GE)', status: 'Sopralluogo', statusColor: '#FF8C00', priority: 'Breve termine', priorityColor: '#FF8C00', date: '21/05/2024' },
  { id: '#OC-2024-0126', type: 'Smantellamento Impianti', city: 'Brescia (BS)', status: 'In esecuzione', statusColor: '#00CC66', priority: 'Programmabile', priorityColor: '#00CC66', date: '21/05/2024' },
  { id: '#OC-2024-0125', type: 'Strip-out', city: 'Milano (MI)', status: 'In valutazione', statusColor: '#0088FF', priority: 'Breve termine', priorityColor: '#FF8C00', date: '20/05/2024' },
  { id: '#OC-2024-0124', type: 'Caso Complesso', city: 'Venezia (VE)', status: 'In attesa info', statusColor: '#9A9A9A', priority: 'Urgente', priorityColor: '#FF3333', date: '20/05/2024' },
]

const TYPE_DATA = [
  { label: 'Taglio Termico Rottami', count: 34, pct: 26.6 },
  { label: 'Demolizione Industriale', count: 28, pct: 21.9 },
  { label: 'Smantellamento Impianti', count: 23, pct: 18.0 },
  { label: 'Strip-out', count: 17, pct: 13.3 },
  { label: 'Amb. Produttivo', count: 14, pct: 10.9 },
  { label: 'Caso Complesso', count: 12, pct: 9.4 },
]

const SECTOR_DATA = [
  { label: 'Industria', count: 52, pct: 40.6 },
  { label: 'Centro Riciclo Rottami', count: 23, pct: 18.0 },
  { label: 'Trader & Mandatari', count: 18, pct: 14.1 },
  { label: 'Acciaieria & Fonderia', count: 15, pct: 11.7 },
  { label: 'General Contractor', count: 12, pct: 9.4 },
  { label: 'Impianto Industriale', count: 8, pct: 6.2 },
]

const ACTIVITIES = [
  { icon: '+', color: '#00CC66', desc: 'Nuova richiesta ricevuta', id: '#OC-2024-0128', sub: 'Taglio Termico Rottami', time: '10:24' },
  { icon: '👁', color: '#0088FF', desc: 'Richiesta visualizzata', id: '#OC-2024-0127', sub: 'Demolizione Industriale', time: '09:48' },
  { icon: '✏', color: '#FF8C00', desc: 'Richiesta assegnata a partner', id: '#OC-2024-0126', sub: 'Smantellamento Impianti', time: '09:15' },
  { icon: '✓', color: '#00CC66', desc: 'Richiesta completata', id: '#OC-2024-0123', sub: 'Strip-out', time: 'Ieri 17:32' },
  { icon: '📄', color: '#9A9A9A', desc: 'Scheda partner inviata', id: '#OC-2024-0125', sub: 'Caso Complesso', time: 'Ieri 15:20' },
]

const ITALY_CITIES = [
  { name: 'Milano', x: 98, y: 72, count: 6, color: '#FF8C00' },
  { name: 'Venezia', x: 135, y: 78, count: 5, color: '#FF8C00' },
  { name: 'Torino', x: 72, y: 80, count: 4, color: '#00CC66' },
  { name: 'Genova', x: 88, y: 102, count: 3, color: '#00CC66' },
  { name: 'Bologna', x: 118, y: 105, count: 7, color: '#FF8C00' },
  { name: 'Firenze', x: 112, y: 130, count: 4, color: '#0088FF' },
  { name: 'Roma', x: 118, y: 175, count: 12, color: '#FF8C00' },
  { name: 'Napoli', x: 128, y: 210, count: 15, color: '#FF3333' },
  { name: 'Bari', x: 158, y: 205, count: 18, color: '#FF3333' },
  { name: 'Taranto', x: 160, y: 225, count: 21, color: '#FF3333' },
  { name: 'Cagliari', x: 68, y: 235, count: 7, color: '#FF8C00' },
  { name: 'Palermo', x: 102, y: 260, count: 9, color: '#0088FF' },
]

function CircularProgress({ value, max, color, size = 80 }) {
  const pct = Math.min(value / max, 1)
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1E1E1E" strokeWidth="5" />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  )
}

function KpiCard({ label, value, sub, color, icon, max = 130 }) {
  return (
    <div style={{
      background: '#111111',
      border: '1px solid #1E1E1E',
      borderRadius: 6,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <CircularProgress value={value} max={max} color={color} size={68} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>{icon}</div>
      </div>
      <div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 38,
          color,
          lineHeight: 1,
          textShadow: `0 0 20px ${color}88`,
        }}>{value}</div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.08em',
          color: '#9A9A9A',
          marginTop: 2,
        }}>{label}</div>
        <div style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  )
}

function DonutChart() {
  const segments = [
    { label: 'Urgenti', value: 8, pct: 6.3, color: '#FF3333' },
    { label: 'Breve termine', value: 46, pct: 35.9, color: '#FF8C00' },
    { label: 'Programmabili', value: 61, pct: 47.7, color: '#00CC66' },
    { label: 'Da valutare', value: 13, pct: 10.1, color: '#0088FF' },
  ]
  const total = segments.reduce((s, x) => s + x.pct, 0)
  let cumulPct = 0
  const r = 70
  const cx = 90
  const cy = 90
  const paths = segments.map(seg => {
    const start = (cumulPct / total) * 360
    const end = ((cumulPct + seg.pct) / total) * 360
    cumulPct += seg.pct
    const startRad = (start - 90) * Math.PI / 180
    const endRad = (end - 90) * Math.PI / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)
    const large = seg.pct / total > 0.5 ? 1 : 0
    const ri = 42
    const xi1 = cx + ri * Math.cos(startRad)
    const yi1 = cy + ri * Math.sin(startRad)
    const xi2 = cx + ri * Math.cos(endRad)
    const yi2 = cy + ri * Math.sin(endRad)
    return { ...seg, d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${ri} ${ri} 0 ${large} 0 ${xi1} ${yi1} Z` }
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg width={180} height={180}>
          {paths.map((p, i) => (
            <path key={i} d={p.d} fill={p.color} opacity={0.85}
              style={{ filter: `drop-shadow(0 0 4px ${p.color}88)` }} />
          ))}
          <circle cx={cx} cy={cy} r={38} fill="#0E0E0E" />
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#fff"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 26 }}>128</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fill="#9A9A9A"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: '0.06em' }}>TOTALI</text>
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}`, flexShrink: 0 }} />
            <div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, color: '#fff' }}>{s.label}: </span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif" }}> ({s.pct}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const card = {
  background: '#111111',
  border: '1px solid #1E1E1E',
  borderRadius: 6,
  padding: '14px',
  overflow: 'hidden',
}

const cardHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
}

const cardTitle = {
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: '0.1em',
  color: '#9A9A9A',
  textTransform: 'uppercase',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState(0)

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        width: 200,
        background: '#090909',
        borderRight: '1px solid #1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid #1A1A1A' }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: '#fff',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
          }}>PALMISANO<br />
            <span style={{ color: '#FF8C00' }}>ONE CALL™</span>
          </div>
          <div style={{ fontSize: 9, color: '#555', letterSpacing: '0.1em', fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, marginTop: 2 }}>
            DEMOLIZIONI & TAGLIO TERMICO
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 0', overflow: 'auto' }}>
          {NAV_ITEMS.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveNav(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                cursor: 'pointer',
                background: i === activeNav ? 'rgba(255,140,0,0.08)' : 'transparent',
                borderLeft: `3px solid ${i === activeNav ? '#FF8C00' : 'transparent'}`,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (i !== activeNav) e.currentTarget.style.background = '#131313' }}
              onMouseLeave={e => { if (i !== activeNav) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.08em',
                color: i === activeNav ? '#FF8C00' : '#777',
                flex: 1,
              }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  background: '#FF3333',
                  color: '#fff',
                  borderRadius: 10,
                  padding: '1px 6px',
                  fontSize: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                }}>{item.badge}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Assistenza */}
        <div style={{
          margin: 10,
          background: '#0E0E0E',
          border: '1px solid #1E1E1E',
          borderRadius: 4,
          padding: '10px',
        }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: '#FF8C00', marginBottom: 6 }}>ASSISTENZA RAPIDA</div>
          <div style={{ fontSize: 10, color: '#777', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
            📞 +39 099 1234567<br />
            ✉ operativo@palmisano.it
          </div>
        </div>

        {/* Back to form */}
        <button
          onClick={() => navigate('/')}
          style={{
            margin: '0 10px 10px',
            background: 'transparent',
            border: '1px solid #2A2A2A',
            borderRadius: 4,
            color: '#555',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: '0.06em',
            padding: '7px',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C00'; e.currentTarget.style.color = '#FF8C00' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#555' }}
        >← MODULO CLIENTE</button>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          background: '#090909',
          borderBottom: '1px solid #1A1A1A',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 28, color: '#fff', letterSpacing: '0.04em', lineHeight: 1 }}>
              DASHBOARD
            </div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 11, color: '#FF8C00', letterSpacing: '0.1em' }}>
              PANORAMICA RICHIESTE TECNICHE
            </div>
            <div style={{ fontSize: 11, color: '#555', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
              Gestisci, assegna e monitora tutte le richieste in modo semplice e veloce.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              background: '#0E0E0E',
              border: '1px solid #FF8C00',
              borderRadius: 4,
              padding: '10px 14px',
              boxShadow: '0 0 12px rgba(255,140,0,0.2)',
            }}>
              <div style={{ fontSize: 9, color: '#FF8C00', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.1em' }}>
                ONE CALL™ — ACCESSO DIRETTO PER RICHIESTE TECNICHE
              </div>
              <button
                onClick={() => navigate('/')}
                style={{
                  marginTop: 6,
                  background: 'linear-gradient(135deg, #CC6600, #FF8C00)',
                  border: 'none',
                  borderRadius: 3,
                  color: '#fff',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >NUOVA RICHIESTA +</button>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#0E0E0E',
              border: '1px solid #1E1E1E',
              borderRadius: 4,
              padding: '8px 12px',
            }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, #CC6600, #FF8C00)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: '#fff',
              }}>P</div>
              <div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, color: '#fff' }}>ADMIN PALMISANO</div>
                <div style={{ fontSize: 10, color: '#FF8C00', fontFamily: "'Inter', sans-serif" }}>Amministratore</div>
              </div>
              <span style={{ color: '#555', fontSize: 12 }}>∨</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            <KpiCard label="RICHIESTE TOTALI" value={128} sub="+18% rispetto al mese scorso" color="#0088FF" icon="📋" max={200} />
            <KpiCard label="IN VALUTAZIONE" value={24} sub="18.8% del totale" color="#0088FF" icon="⏱" max={130} />
            <KpiCard label="IN ESECUZIONE" value={15} sub="11.7% del totale" color="#FF8C00" icon="⛏" max={130} />
            <KpiCard label="COMPLETATE" value={89} sub="69.5% del totale" color="#00CC66" icon="✓" max={130} />
            <KpiCard label="URGENTI" value={8} sub="6.3% del totale" color="#FF3333" icon="⚠" max={130} />
          </div>

          {/* Middle row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10 }}>

            {/* Recent requests */}
            <div style={card}>
              <div style={cardHeader}>
                <span style={cardTitle}>RICHIESTE RECENTI</span>
                <button style={{ background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 3, color: '#9A9A9A', fontSize: 10, padding: '3px 8px', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: '0.06em' }}>
                  VEDI TUTTE ∨
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['ID RICHIESTA', 'TIPO INTERVENTO', 'LOCALITÀ', 'STATO', 'PRIORITÀ', 'DATA'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left',
                        padding: '4px 8px',
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: 9,
                        letterSpacing: '0.08em',
                        color: '#555',
                        borderBottom: '1px solid #1A1A1A',
                        whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REQUESTS.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #161616' }}>
                      <td style={{ padding: '8px 8px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#FF8C00' }}>{r.id}</td>
                      <td style={{ padding: '8px 8px', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#fff', whiteSpace: 'nowrap' }}>{r.type}</td>
                      <td style={{ padding: '8px 8px', fontSize: 11, color: '#9A9A9A', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>{r.city}</td>
                      <td style={{ padding: '8px 8px' }}>
                        <span style={{
                          background: `${r.statusColor}22`,
                          border: `1px solid ${r.statusColor}55`,
                          borderRadius: 3,
                          padding: '2px 6px',
                          fontSize: 10,
                          color: r.statusColor,
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}>{r.status}</span>
                      </td>
                      <td style={{ padding: '8px 8px' }}>
                        <span style={{
                          background: `${r.priorityColor}22`,
                          border: `1px solid ${r.priorityColor}55`,
                          borderRadius: 3,
                          padding: '2px 6px',
                          fontSize: 10,
                          color: r.priorityColor,
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}>{r.priority}</span>
                      </td>
                      <td style={{ padding: '8px 8px', fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif', whiteSpace: 'nowrap'" }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Priority donut */}
            <div style={card}>
              <div style={cardHeader}>
                <span style={cardTitle}>RICHIESTE PER PRIORITÀ</span>
                <span style={{ fontSize: 10, color: '#555' }}>QUESTO MESE</span>
              </div>
              <DonutChart />
            </div>

            {/* By type */}
            <div style={card}>
              <div style={cardHeader}>
                <span style={cardTitle}>PER TIPO INTERVENTO</span>
                <span style={{ fontSize: 10, color: '#555' }}>QUESTO MESE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TYPE_DATA.map((t, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9A9A9A' }}>{t.label}</span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#FF8C00' }}>{t.count}</span>
                    </div>
                    <div style={{ height: 4, background: '#1A1A1A', borderRadius: 2 }}>
                      <div style={{
                        height: '100%',
                        width: `${t.pct}%`,
                        background: `linear-gradient(90deg, #CC6600, #FF8C00)`,
                        borderRadius: 2,
                        boxShadow: '0 0 4px rgba(255,140,0,0.4)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>

            {/* Italy map */}
            <div style={card}>
              <div style={cardHeader}>
                <span style={cardTitle}>MAPPA INTERVENTI</span>
                <button style={{ background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 3, color: '#9A9A9A', fontSize: 10, padding: '3px 8px', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: '0.06em' }}>
                  VEDI MAPPA COMPLETA ∨
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <svg viewBox="0 0 200 290" style={{ width: '100%' }} fill="none">
                    <path d="M85 10 L90 8 L98 12 L105 10 L112 15 L110 22 L114 28 L117 35 L120 42 L122 50 L124 58 L126 65 L130 72 L134 80 L140 88 L144 95 L147 102 L150 110 L152 118 L150 126 L147 132 L144 138 L140 142 L136 148 L132 154 L127 160 L120 165 L114 168 L108 170 L102 172 L96 170 L90 166 L85 162 L80 156 L76 150 L74 144 L72 138 L70 130 L72 122 L75 115 L78 108 L80 100 L80 92 L78 85 L76 78 L75 70 L74 62 L75 55 L78 48 L80 40 L82 32 L83 22 Z" stroke="#2A2A2A" strokeWidth="1.5" fill="#141414" />
                    <path d="M150 118 L155 122 L162 130 L166 138 L164 146 L158 150 L153 146 L151 140 L150 132 Z" stroke="#2A2A2A" strokeWidth="1.5" fill="#141414" />
                    <path d="M78 172 L83 178 L86 185 L85 193 L79 197 L73 193 L71 185 L74 178 Z" stroke="#2A2A2A" strokeWidth="1.5" fill="#141414" />
                    <path d="M90 255 L100 250 L114 252 L120 260 L114 268 L100 270 L90 265 Z" stroke="#2A2A2A" strokeWidth="1.5" fill="#141414" />
                    {ITALY_CITIES.map((c, i) => (
                      <g key={i}>
                        <circle cx={c.x} cy={c.y} r={Math.max(4, Math.min(10, c.count / 3))} fill={c.color} opacity={0.75}
                          style={{ filter: `drop-shadow(0 0 4px ${c.color})` }} />
                        <text x={c.x + 7} y={c.y + 4} fill="#888" style={{ fontFamily: "'Inter', sans-serif", fontSize: 7 }}>{c.count}</text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.08em', color: '#555', marginBottom: 8 }}>LEGENDA PRIORITÀ</div>
                  {[
                    { label: 'Urgente', color: '#FF3333' },
                    { label: 'Breve termine', color: '#FF8C00' },
                    { label: 'Programmabile', color: '#00CC66' },
                    { label: 'Da valutare', color: '#0088FF' },
                  ].map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, boxShadow: `0 0 4px ${l.color}` }} />
                      <span style={{ fontSize: 10, color: '#777', fontFamily: "'Inter', sans-serif" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* By sector */}
            <div style={card}>
              <div style={cardHeader}>
                <span style={cardTitle}>RICHIESTE PER SETTORE</span>
                <span style={{ fontSize: 10, color: '#555' }}>QUESTO MESE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SECTOR_DATA.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid #161616' }}>
                    <span style={{ fontSize: 11, color: '#9A9A9A', fontFamily: "'Inter', sans-serif" }}>{s.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>{s.count}</span>
                      <span style={{ fontSize: 10, color: '#555' }}>({s.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div style={card}>
              <div style={cardHeader}>
                <span style={cardTitle}>ATTIVITÀ RECENTI</span>
                <button style={{ background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 3, color: '#9A9A9A', fontSize: 10, padding: '3px 8px', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: '0.06em' }}>
                  VEDI TUTTE ∨
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ACTIVITIES.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 24, height: 24,
                      background: `${a.color}22`,
                      border: `1px solid ${a.color}44`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      color: a.color,
                      flexShrink: 0,
                    }}>{a.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 11, color: '#9A9A9A' }}>{a.desc}</div>
                      <div style={{ fontSize: 10, color: '#FF8C00', fontFamily: "'Inter', sans-serif" }}>{a.id} - {a.sub}</div>
                    </div>
                    <span style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div style={{
            background: '#0E0E0E',
            border: '1px solid #1A1A1A',
            borderRadius: 6,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', color: '#FF8C00', paddingRight: 24, borderRight: '1px solid #1A1A1A', marginRight: 24, whiteSpace: 'nowrap' }}>
              PANORAMICA GENERALE
            </div>
            {[
              { icon: '👥', label: 'PARTNER ATTIVI', value: '27' },
              { icon: '⛏', label: 'CANTIERI ATTIVI', value: '15' },
              { icon: '📋', label: 'SOPRALLUOGHI', value: '9' },
              { icon: '📎', label: 'DOC. ALLEGATI', value: '312' },
              { icon: '⏱', label: 'MEDIA RISPOSTA', value: '2h 15m' },
            ].map((s, i, arr) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                borderRight: i < arr.length - 1 ? '1px solid #1A1A1A' : 'none',
                marginRight: i < arr.length - 1 ? 24 : 0,
                paddingRight: i < arr.length - 1 ? 24 : 0,
              }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: '0.08em', color: '#555' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
