import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItalyMap from '../components/ItalyMap.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { supabase } from '../lib/supabase.js'

/* ============================================================
   DATA
   ============================================================ */
const RECENT_REQUESTS = [
  { id: '#OC-2024-0128', type: 'Taglio Termico Rottami', city: 'Taranto (TA)', status: 'In valutazione', statusColor: '#0088FF', priority: 'Urgente', priorityColor: '#FF3333', date: '22/05/2024' },
  { id: '#OC-2024-0127', type: 'Demolizione Industriale', city: 'Genova (GE)', status: 'Sopralluogo', statusColor: '#FF8C00', priority: 'Breve termine', priorityColor: '#FF8C00', date: '21/05/2024' },
  { id: '#OC-2024-0126', type: 'Smantellamento Impianti', city: 'Brescia (BS)', status: 'In esecuzione', statusColor: '#00CC66', priority: 'Programmabile', priorityColor: '#00CC66', date: '21/05/2024' },
  { id: '#OC-2024-0125', type: 'Strip-out', city: 'Milano (MI)', status: 'In valutazione', statusColor: '#0088FF', priority: 'Breve termine', priorityColor: '#FF8C00', date: '20/05/2024' },
  { id: '#OC-2024-0124', type: 'Caso Complesso', city: 'Venezia (VE)', status: 'In attesa info', statusColor: '#9A9A9A', priority: 'Urgente', priorityColor: '#FF3333', date: '20/05/2024' },
]

const DONUT_DATA = [
  { label: 'Urgenti', value: 8, color: '#FF3333', pct: '6.3%' },
  { label: 'Breve termine', value: 46, color: '#FF8C00', pct: '35.9%' },
  { label: 'Programmabili', value: 61, color: '#00CC66', pct: '47.7%' },
  { label: 'Da valutare', value: 13, color: '#0088FF', pct: '10.1%' },
]

const INTERVENTO_BARS = [
  { label: 'Taglio Termico Rottami', value: 34, pct: '26.6%' },
  { label: 'Demolizione Industriale', value: 28, pct: '21.9%' },
  { label: 'Smantellamento Impianti', value: 23, pct: '18.0%' },
  { label: 'Strip-out', value: 17, pct: '13.3%' },
  { label: 'Intervento Amb. Produttivo', value: 14, pct: '10.9%' },
  { label: 'Caso Complesso', value: 12, pct: '9.4%' },
]

const SETTORE_ITEMS = [
  { label: 'Industria', value: 52, pct: '40.6%', color: '#FF8C00' },
  { label: 'Centro Riciclo Rottami', value: 23, pct: '18.0%', color: '#FF8C00' },
  { label: 'Trader & Mandatari Acciaierie', value: 18, pct: '14.1%', color: '#FF8C00' },
  { label: 'Acciaieria & Fonderia', value: 15, pct: '11.7%', color: '#9A9A9A' },
  { label: 'General Contractor Industriale', value: 12, pct: '9.4%', color: '#9A9A9A' },
  { label: 'Impianto Ind. e Sito Produttivo', value: 8, pct: '6.2%', color: '#9A9A9A' },
]

const ACTIVITIES = [
  { icon: '+', color: '#00CC66', text: 'Nuova richiesta ricevuta', id: '#OC-2024-0128', subtext: 'Taglio Termico Rottami', time: '10:24' },
  { icon: '👁', color: '#0088FF', text: 'Richiesta visualizzata', id: '#OC-2024-0127', subtext: 'Demolizione Industriale', time: '09:48' },
  { icon: '✏', color: '#FF8C00', text: 'Richiesta assegnata a partner', id: '#OC-2024-0126', subtext: 'Smantellamento Impianti', time: '09:15' },
  { icon: '✓', color: '#00CC66', text: 'Richiesta completata', id: '#OC-2024-0123', subtext: 'Strip-out', time: 'Ieri 17:32' },
  { icon: '📄', color: '#9A9A9A', text: 'Scheda partner inviata', id: '#OC-2024-0125', subtext: 'Caso Complesso', time: 'Ieri 15:20' },
]

const KPIS = [
  { label: 'RICHIESTE TOTALI', value: 128, sub: '+18% rispetto al mese scorso', color: '#0088FF', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ), pct: 100 },
  { label: 'IN VALUTAZIONE', value: 24, sub: '18.8% del totale', color: '#0088FF', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
    </svg>
  ), pct: 18.8 },
  { label: 'IN ESECUZIONE', value: 15, sub: '11.7% del totale', color: '#FF8C00', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M6 20V10M10 20V4M14 20V8M18 20V14"/>
    </svg>
  ), pct: 11.7 },
  { label: 'COMPLETATE', value: 89, sub: '69.5% del totale', color: '#00CC66', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ), pct: 69.5 },
  { label: 'URGENTI', value: 8, sub: '6.3% del totale', color: '#FF3333', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ), pct: 6.3 },
]

const BOTTOM_STATS = [
  { label: 'PARTNER ATTIVI', value: 27, icon: '👥' },
  { label: 'CANTIERI ATTIVI', value: 15, icon: '⛑' },
  { label: 'SOPRALLUOGHI PIANIFICATI', value: 9, icon: '📋' },
  { label: 'DOCUMENTI ALLEGATI', value: 312, icon: '📎' },
  { label: 'MEDIA RISPOSTA', value: '2h 15m', icon: '⏱' },
]

const NAV_ITEMS = [
  { label: 'DASHBOARD', active: true, icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )},
  { label: 'RICHIESTE', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )},
  { label: 'CALENDARIO', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )},
  { label: 'MAPPA INTERVENTI', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2 1,6"/>
      <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  )},
  { label: 'PARTNER & NETWORK', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )},
  { label: 'CANTIERI ATTIVI', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/>
      <path d="M18 2l4 4-4 4"/>
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/>
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>
    </svg>
  )},
  { label: 'STATISTICHE', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )},
  { label: 'ARCHIVIO', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21,8 21,21 3,21 3,8"/>
      <rect x="1" y="3" width="22" height="5"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  )},
  { label: 'IMPOSTAZIONI', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )},
  { label: 'NOTIFICHE', badge: 12, icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  )},
]

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: '#111111',
      border: '1px solid #1E1E1E',
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top left, rgba(255,140,0,0.02) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  )
}

function CardHeader({ title, action }) {
  return (
    <div style={{
      padding: '12px 16px',
      borderBottom: '1px solid #1A1A1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'linear-gradient(90deg, rgba(255,140,0,0.04) 0%, transparent 70%)',
    }}>
      <span style={{
        fontFamily: "'Rajdhani',sans-serif",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '0.1em',
        color: '#9A9A9A',
      }}>{title}</span>
      {action && (
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: "'Rajdhani',sans-serif", fontWeight: 600,
          fontSize: 11, color: '#FF8C00', letterSpacing: '0.06em',
        }}>{action}</button>
      )}
    </div>
  )
}

function KpiCard({ label, value, sub, color, icon, pct }) {
  const size = 90
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <Card style={{ flex: 1, minWidth: 0 }}>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {/* Circular gauge */}
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1A1A1A" strokeWidth="6" />
            <circle
              cx={size/2} cy={size/2} r={r}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}
            />
          </svg>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            textAlign: 'center',
          }}>
            <div style={{ color: icon.props ? color : color }}>{icon}</div>
          </div>
        </div>

        {/* Big number */}
        <div style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 1,
          color: color,
          textShadow: `0 0 20px ${color}66`,
        }}>{value}</div>

        <div style={{
          fontFamily: "'Rajdhani',sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.1em',
          color: '#9A9A9A',
          textAlign: 'center',
        }}>{label}</div>

        <div style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 10,
          color: '#555',
          textAlign: 'center',
          lineHeight: 1.4,
        }}>{sub}</div>
      </div>
    </Card>
  )
}

function StatusBadge({ label, color }) {
  const rgba = color === '#FF3333' ? '255,51,51' : color === '#FF8C00' ? '255,140,0' : color === '#00CC66' ? '0,204,102' : color === '#0088FF' ? '0,136,255' : '100,100,100'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 7px',
      borderRadius: 3,
      background: `rgba(${rgba},0.12)`,
      border: `1px solid rgba(${rgba},0.3)`,
      fontFamily: "'Rajdhani',sans-serif",
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '0.05em',
      color: color,
      whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function statoColor(s) {
  const map = { in_valutazione: '#0088FF', sopralluogo: '#FF8C00', in_esecuzione: '#00CC66', in_attesa_info: '#9A9A9A', completata: '#00CC66' }
  return map[s] || '#9A9A9A'
}
function statoLabel(s) {
  const map = { in_valutazione: 'In valutazione', sopralluogo: 'Sopralluogo', in_esecuzione: 'In esecuzione', in_attesa_info: 'In attesa info', completata: 'Completata' }
  return map[s] || s
}
function priorityColor(p) {
  const map = { urgente: '#FF3333', breve_termine: '#FF8C00', programmabile: '#00CC66' }
  return map[p] || '#9A9A9A'
}
function priorityLabel(p) {
  const map = { urgente: 'Urgente', breve_termine: 'Breve termine', programmabile: 'Programmabile' }
  return map[p] || p
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('DASHBOARD')
  const [richieste, setRichieste] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('richieste')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (data && data.length > 0) setRichieste(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // KPI calcolati dai dati reali (fallback ai mock se vuoto)
  const hasReal = richieste.length > 0
  const total      = hasReal ? richieste.length : 128
  const inVal      = hasReal ? richieste.filter(r => r.stato === 'in_valutazione').length  : 24
  const inExec     = hasReal ? richieste.filter(r => r.stato === 'in_esecuzione').length   : 15
  const completed  = hasReal ? richieste.filter(r => r.stato === 'completata').length       : 89
  const urgent     = hasReal ? richieste.filter(r => r.tempistica === 'urgente').length     : 8

  // Richieste recenti
  const recentRows = hasReal
    ? richieste.slice(0, 5).map((r, i) => ({
        id: `#OC-${new Date(r.created_at).getFullYear()}-${String(i + 1).padStart(4, '0')}`,
        type: r.tipo_intervento,
        city: r.localita || '—',
        status: statoLabel(r.stato),
        statusColor: statoColor(r.stato),
        priority: priorityLabel(r.tempistica),
        priorityColor: priorityColor(r.tempistica),
        date: formatDate(r.created_at),
      }))
    : RECENT_REQUESTS

  // Donut priorità
  const urgCount   = hasReal ? richieste.filter(r => r.tempistica === 'urgente').length        : 8
  const breveCount = hasReal ? richieste.filter(r => r.tempistica === 'breve_termine').length  : 46
  const progCount  = hasReal ? richieste.filter(r => r.tempistica === 'programmabile').length  : 61
  const valCount   = hasReal ? richieste.filter(r => !r.tempistica).length                     : 13
  const donutData = hasReal ? [
    { label: 'Urgenti',      value: urgCount,   color: '#FF3333', pct: total ? `${((urgCount/total)*100).toFixed(1)}%`   : '0%' },
    { label: 'Breve termine',value: breveCount, color: '#FF8C00', pct: total ? `${((breveCount/total)*100).toFixed(1)}%` : '0%' },
    { label: 'Programmabili',value: progCount,  color: '#00CC66', pct: total ? `${((progCount/total)*100).toFixed(1)}%`  : '0%' },
    { label: 'Da valutare',  value: valCount,   color: '#0088FF', pct: total ? `${((valCount/total)*100).toFixed(1)}%`   : '0%' },
  ] : DONUT_DATA

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>

      {/* SIDEBAR */}
      <aside style={{
        width: 220,
        background: '#0A0A0A',
        borderRight: '1px solid #1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #1A1A1A',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg,#CC7000,#FF8C00)',
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 10px rgba(255,140,0,0.5)',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l2-8h14l2 8H3z"/>
                <path d="M8 9V7a4 4 0 018 0v2"/>
                <rect x="1" y="17" width="22" height="4" rx="1"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', lineHeight: 1 }}>PALMISANO</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 9, color: '#FF8C00', letterSpacing: '0.12em', lineHeight: 1 }}>ONE CALL™</div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                width: '100%',
                padding: '9px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: item.label === activeNav ? 'rgba(255,140,0,0.08)' : 'transparent',
                border: 'none',
                borderLeft: item.label === activeNav ? '2px solid #FF8C00' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s',
                color: item.label === activeNav ? '#FFA500' : '#555',
              }}
              onMouseEnter={e => { if (item.label !== activeNav) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={e => { if (item.label !== activeNav) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: item.label === activeNav ? '#FF8C00' : '#555', flexShrink: 0 }}>{item.icon}</span>
                <span style={{
                  fontFamily: "'Rajdhani',sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: item.label === activeNav ? '#FFA500' : '#555',
                }}>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  background: '#FF3333',
                  color: '#fff',
                  borderRadius: 10,
                  padding: '1px 5px',
                  fontSize: 9,
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Assistenza box */}
        <div style={{
          margin: '12px',
          padding: '12px',
          background: 'rgba(255,140,0,0.05)',
          border: '1px solid rgba(255,140,0,0.15)',
          borderRadius: 6,
        }}>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 11, color: '#FF8C00', letterSpacing: '0.08em', marginBottom: 8 }}>ASSISTENZA RAPIDA</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1H5a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#9A9A9A' }}>+39 099 1234567</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: '#9A9A9A' }}>operativo@palmisano.it</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', minWidth: 0 }}>

        {/* Dashboard header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid #1A1A1A',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '0.08em',
              color: '#fff',
              lineHeight: 1,
            }}>DASHBOARD <span style={{ color: '#FF8C00' }}>—</span> PANORAMICA RICHIESTE TECNICHE</h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#555', marginTop: 4 }}>
              Gestisci, assegna e monitora tutte le richieste in modo semplice e veloce.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg,#CC7000,#FF8C00)',
                border: 'none', borderRadius: 5,
                padding: '8px 14px',
                fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.08em',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(255,140,0,0.4)',
                whiteSpace: 'nowrap',
              }}
            >ONE CALL™ — ACCESSO DIRETTO</button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#0E0E0E',
              border: '1px solid #1E1E1E',
              borderRadius: 5,
              padding: '7px 12px',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg,#1A1A1A,#2A2A2A)',
                border: '1px solid #3A3A3A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: '#FF8C00',
              }}>A</div>
              <div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12, color: '#fff', lineHeight: 1 }}>ADMIN PALMISANO</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555' }}>Amministratore</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* KPI ROW */}
          <div style={{ display: 'flex', gap: 12 }}>
            {KPIS.map((kpi, i) => {
              const liveValues = [total, inVal, inExec, completed, urgent]
              const liveColors = ['#0088FF','#0088FF','#FF8C00','#00CC66','#FF3333']
              return <KpiCard key={i} {...kpi} value={liveValues[i]} color={liveColors[i]} />
            })}
          </div>

          {/* MIDDLE ROW: Requests, Donut, Bars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14 }}>

            {/* Recent requests */}
            <Card>
              <CardHeader title="RICHIESTE RECENTI" action="VEDI TUTTE ∨" />
              <div style={{ padding: '0 0 8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                      {['ID RICHIESTA','TIPO','LOCALITÀ','STATO','PRIORITÀ','DATA'].map(h => (
                        <th key={h} style={{
                          padding: '7px 10px',
                          fontFamily: "'Rajdhani',sans-serif",
                          fontWeight: 700, fontSize: 9,
                          letterSpacing: '0.08em',
                          color: '#555',
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentRows.map((r, i) => (
                      <tr
                        key={i}
                        style={{ borderBottom: '1px solid #141414', transition: 'background 0.15s', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '8px 10px' }}>
                          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 12, color: '#FF8C00' }}>{r.id}</span>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9A9A', whiteSpace: 'nowrap' }}>{r.type}</span>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#777' }}>{r.city}</span>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <StatusBadge label={r.status} color={r.statusColor} />
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <StatusBadge label={r.priority} color={r.priorityColor} />
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', whiteSpace: 'nowrap' }}>{r.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Donut chart */}
            <Card>
              <CardHeader title="RICHIESTE PER PRIORITÀ" />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <DonutChart data={donutData} total={total} size={160} thickness={24} />
                {/* Legend */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {donutData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9A9A' }}>{d.label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, color: '#fff' }}>{d.value}</span>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', minWidth: 36, textAlign: 'right' }}>{d.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Bar chart */}
            <Card>
              <CardHeader title="RICHIESTE PER TIPO INTERVENTO" action="QUESTO MESE ∨" />
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {INTERVENTO_BARS.map((b, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9A9A', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{b.label}</span>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 13, color: '#fff' }}>{b.value}</span>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555' }}>{b.pct}</span>
                      </div>
                    </div>
                    <div style={{ height: 4, background: '#1A1A1A', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: b.pct,
                        background: i < 2 ? 'linear-gradient(90deg,#CC7000,#FF8C00)' : '#2A2A2A',
                        borderRadius: 2,
                        boxShadow: i < 2 ? '0 0 6px rgba(255,140,0,0.4)' : 'none',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* BOTTOM ROW: Map, Settore, Activities */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

            {/* Map */}
            <Card>
              <CardHeader title="MAPPA INTERVENTI" action="VEDI MAPPA COMPLETA ∨" />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                <ItalyMap width={160} height={220} showDots={true} />
                {/* Legend */}
                <div style={{ width: '100%' }}>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: '#555', marginBottom: 7 }}>LEGENDA PRIORITÀ</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                      { label: 'Urgente', color: '#FF3333' },
                      { label: 'Breve termine', color: '#FF8C00' },
                      { label: 'Programmabile', color: '#00CC66' },
                      { label: 'Da valutare', color: '#0088FF' },
                    ].map((l, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: l.color }} />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555' }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Settore */}
            <Card>
              <CardHeader title="RICHIESTE PER SETTORE — QUESTO MESE ∨" />
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SETTORE_ITEMS.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 10px',
                    background: i < 3 ? 'rgba(255,140,0,0.04)' : 'rgba(255,255,255,0.01)',
                    borderRadius: 4,
                    border: `1px solid ${i < 3 ? 'rgba(255,140,0,0.1)' : '#1A1A1A'}`,
                  }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: i < 3 ? '#9A9A9A' : '#555', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{s.label}</span>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: i < 2 ? '#FFA500' : '#fff' }}>{s.value}</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', minWidth: 36, textAlign: 'right' }}>{s.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity feed */}
            <Card>
              <CardHeader title="ATTIVITÀ RECENTI" action="VEDI TUTTE ∨" />
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {ACTIVITIES.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 10,
                    padding: '9px 0',
                    borderBottom: i < ACTIVITIES.length - 1 ? '1px solid #141414' : 'none',
                  }}>
                    <div style={{
                      width: 26, height: 26,
                      background: `rgba(${a.color === '#00CC66' ? '0,204,102' : a.color === '#0088FF' ? '0,136,255' : a.color === '#FF8C00' ? '255,140,0' : '100,100,100'},0.1)`,
                      border: `1px solid rgba(${a.color === '#00CC66' ? '0,204,102' : a.color === '#0088FF' ? '0,136,255' : a.color === '#FF8C00' ? '255,140,0' : '100,100,100'},0.25)`,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12,
                      color: a.color,
                      flexShrink: 0,
                    }}>{a.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9A9A', lineHeight: 1.3 }}>
                        {a.text}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 11, color: '#FF8C00' }}>{a.id}</span>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555' }}>— {a.subtext}</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#444', flexShrink: 0, whiteSpace: 'nowrap' }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* BOTTOM STATS BAR */}
          <Card>
            <div style={{
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 0,
            }}>
              <span style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.1em',
                color: '#FF8C00',
                flexShrink: 0,
                paddingRight: 20,
                borderRight: '1px solid #1E1E1E',
                marginRight: 20,
              }}>PANORAMICA GENERALE</span>
              <div style={{ flex: 1, display: 'flex', gap: 0 }}>
                {BOTTOM_STATS.map((s, i) => (
                  <React.Fragment key={i}>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '4px 16px',
                    }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                      <div>
                        <div style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontWeight: 700,
                          fontSize: 20,
                          color: '#fff',
                          lineHeight: 1,
                        }}>{s.value}</div>
                        <div style={{
                          fontFamily: "'Rajdhani',sans-serif",
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          color: '#555',
                        }}>{s.label}</div>
                      </div>
                    </div>
                    {i < BOTTOM_STATS.length - 1 && (
                      <div style={{ width: 1, background: '#1E1E1E', margin: '4px 0', alignSelf: 'stretch' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
