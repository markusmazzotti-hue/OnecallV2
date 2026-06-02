import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import Logo from '../components/Logo.jsx'
import DonutChart from '../components/DonutChart.jsx'
import DashboardMap from '../components/DashboardMap.jsx'

/* ════════════════════════════════════════════════════════════════
   ICONS
   ════════════════════════════════════════════════════════════════ */
const sv = (children, w = 18) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)
const ICON = {
  dashboard: sv(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>),
  richieste: sv(<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></>),
  calendario: sv(<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>),
  mappa: sv(<><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></>),
  partner: sv(<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 20v-1.5A4.5 4.5 0 017.5 14h3A4.5 4.5 0 0115 18.5V20"/><path d="M16 14.5a3.5 3.5 0 015 3.2V20"/></>),
  cantieri: sv(<><path d="M3 17l2-8h14l2 8H3z"/><path d="M8 9V7a4 4 0 018 0v2"/><rect x="1" y="17" width="22" height="4" rx="1"/></>),
  statistiche: sv(<><line x1="4" y1="20" x2="4" y2="11"/><line x1="10" y1="20" x2="10" y2="4"/><line x1="16" y1="20" x2="16" y2="9"/><line x1="20" y1="20" x2="20" y2="14"/></>),
  archivio: sv(<><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 001 1h12a1 1 0 001-1V8"/><line x1="10" y1="12" x2="14" y2="12"/></>),
  impostazioni: sv(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-2.7-1.1l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.6 1.6 0 004 15H3.9a2 2 0 110-4H4a1.6 1.6 0 001.1-2.7l-.1-.1a2 2 0 112.8-2.8l.1.1A1.6 1.6 0 009 4.6V4a2 2 0 114 0v.1a1.6 1.6 0 002.7 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1A1.6 1.6 0 0020 11h.1a2 2 0 110 4H20z"/></>),
  notifiche: sv(<><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></>),
  // kpi
  clipboardCheck: sv(<><rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="3.2" rx="1"/><path d="M8.5 13l2 2 4-4.5"/></>),
  clock: sv(<><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></>),
  hardhat: sv(<><path d="M3 17l2-8h14l2 8H3z"/><path d="M8 9V7a4 4 0 018 0v2"/><rect x="1" y="17" width="22" height="4" rx="1"/></>),
  checkCircle: sv(<><circle cx="12" cy="12" r="9"/><path d="M8.5 12l2.5 2.5 4.5-5"/></>),
  warning: sv(<><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h16.9a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>),
  // bottom stats
  people: sv(<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></>),
  calCheck: sv(<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><path d="M9 15l2 2 4-4"/></>),
  clip: sv(<><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></>),
  // activity
  plus: sv(<><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>, 16),
  eye: sv(<><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></>, 16),
  pencil: sv(<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></>, 16),
  doc: sv(<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>, 16),
  phone: sv(<><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.5c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/></>, 16),
  mail: sv(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></>, 16),
}

/* tipo intervento / settore row icons (compact) */
const ti = (children) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
const TIPO_ICON = {
  taglio: ti(<><path d="M3 17l2-8h14l2 8H3z"/><path d="M8 9V7a4 4 0 018 0v2"/></>),
  demo: ti(<><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h16.9a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>),
  smant: ti(<><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 102.1-9.4L1 10"/></>),
  strip: ti(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>),
  amb: ti(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18"/></>),
  caso: ti(<><rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="3" rx="1"/><line x1="8.5" y1="11" x2="15.5" y2="11"/><line x1="8.5" y1="15" x2="13" y2="15"/></>),
}
const SET_ICON = {
  industria: ti(<><path d="M2 20V10l5-5v5l5-5v5l5-5v15H2z"/><line x1="2" y1="20" x2="22" y2="20"/></>),
  riciclo: ti(<><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 102.1-9.4L1 10"/></>),
  trader: ti(<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></>),
  fonderia: ti(<><path d="M10 4h4v3l3 4a4 4 0 01-3 6h-4a4 4 0 01-3-6l3-4z"/><path d="M7.5 14a4.5 4.5 0 009 0"/></>),
  general: ti(<><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M8 8V5a2 2 0 012-2h4a2 2 0 012 2v3"/></>),
  impianto: ti(<><rect x="4" y="9" width="5" height="11" rx="0.4"/><path d="M13 20l1-7h3l1 7z"/></>),
}

/* ════════════════════════════════════════════════════════════════
   STATIC DATA (matches mockup)
   ════════════════════════════════════════════════════════════════ */
const NAV = [
  { id: 'DASHBOARD', label: 'DASHBOARD', icon: 'dashboard' },
  { id: 'RICHIESTE', label: 'RICHIESTE', icon: 'richieste' },
  { id: 'CALENDARIO', label: 'CALENDARIO', icon: 'calendario' },
  { id: 'MAPPA', label: 'MAPPA INTERVENTI', icon: 'mappa' },
  { id: 'PARTNER', label: 'PARTNER & NETWORK', icon: 'partner' },
  { id: 'CANTIERI', label: 'CANTIERI ATTIVI', icon: 'cantieri' },
  { id: 'STATISTICHE', label: 'STATISTICHE', icon: 'statistiche' },
  { id: 'ARCHIVIO', label: 'ARCHIVIO', icon: 'archivio' },
  { id: 'IMPOSTAZIONI', label: 'IMPOSTAZIONI', icon: 'impostazioni' },
  { id: 'NOTIFICHE', label: 'NOTIFICHE', icon: 'notifiche', badge: 12 },
]

const RECENT = [
  { id: '#OC-2024-0128', type: 'Taglio Termico Rottami', city: 'Taranto (TA)', status: 'In valutazione', sc: '#0088FF', prio: 'Urgente', pc: '#FF3333', date: '22/05/2024' },
  { id: '#OC-2024-0127', type: 'Demolizione Industriale', city: 'Genova (GE)', status: 'Sopralluogo', sc: '#FF8C00', prio: 'Breve termine', pc: '#FF8C00', date: '21/05/2024' },
  { id: '#OC-2024-0126', type: 'Smantellamento Impianti', city: 'Brescia (BS)', status: 'In esecuzione', sc: '#00CC66', prio: 'Programmabile', pc: '#00CC66', date: '21/05/2024' },
  { id: '#OC-2024-0125', type: 'Strip-out', city: 'Milano (MI)', status: 'In valutazione', sc: '#0088FF', prio: 'Breve termine', pc: '#FF8C00', date: '20/05/2024' },
  { id: '#OC-2024-0124', type: 'Caso Complesso', city: 'Venezia (VE)', status: 'In attesa info', sc: '#B388FF', prio: 'Urgente', pc: '#FF3333', date: '20/05/2024' },
]

const TIPO = [
  { k: 'taglio', label: 'Taglio Termico Rottami', n: 34, pct: 26.6 },
  { k: 'demo', label: 'Demolizione Industriale', n: 28, pct: 21.9 },
  { k: 'smant', label: 'Smantellamento Impianti', n: 23, pct: 18.0 },
  { k: 'strip', label: 'Strip-out', n: 17, pct: 13.3 },
  { k: 'amb', label: 'Intervento in Ambiente Produttivo', n: 14, pct: 10.9 },
  { k: 'caso', label: 'Caso Complesso', n: 12, pct: 9.4 },
]

const SETTORE = [
  { k: 'industria', label: 'Industria', n: 52, pct: 40.6 },
  { k: 'riciclo', label: 'Centro Riciclo Rottami', n: 23, pct: 18.0 },
  { k: 'trader', label: 'Trader & Mandatari Acciaierie', n: 18, pct: 14.1 },
  { k: 'fonderia', label: 'Acciaieria & Fonderia', n: 15, pct: 11.7 },
  { k: 'general', label: 'General Contractor Industriale', n: 12, pct: 9.4 },
  { k: 'impianto', label: 'Impianto Industriale e Sito Produttivo', n: 8, pct: 6.2 },
]

const ATTIVITA = [
  { icon: 'plus', color: '#00CC66', t: 'Nuova richiesta ricevuta', s: '#OC-2024-0128 - Taglio Termico Rottami', time: '10:24' },
  { icon: 'eye', color: '#0088FF', t: 'Richiesta visualizzata', s: '#OC-2024-0127 - Demolizione Industriale', time: '09:48' },
  { icon: 'pencil', color: '#FF8C00', t: 'Richiesta assegnata a partner', s: '#OC-2024-0126 - Smantellamento Impianti', time: '09:15' },
  { icon: 'checkCircle', color: '#00CC66', t: 'Richiesta completata', s: '#OC-2024-0123 - Strip-out', time: 'Ieri 17:32' },
  { icon: 'doc', color: '#B388FF', t: 'Scheda partner inviata', s: '#OC-2024-0125 - Caso Complesso', time: 'Ieri 15:20' },
]

const BOTTOM = [
  { icon: 'people', label: 'PARTNER ATTIVI', value: '27' },
  { icon: 'hardhat', label: 'CANTIERI ATTIVI', value: '15' },
  { icon: 'calCheck', label: 'SOPRALLUOGHI PIANIFICATI', value: '9' },
  { icon: 'clip', label: 'DOCUMENTI ALLEGATI', value: '312' },
  { icon: 'clock', label: 'MEDIA RISPOSTA', value: '2h 15m' },
]

/* Italy map city pins (viewBox 0..300 x 0..400) */
const CITY_PINS = [
  { name: 'Milano', x: 92, y: 78, num: 6 },
  { name: 'Venezia', x: 150, y: 80, num: 5 },
  { name: 'Bologna', x: 120, y: 118, num: 12 },
  { name: 'Roma', x: 132, y: 200, num: 15 },
  { name: 'Napoli', x: 168, y: 232, num: 18 },
  { name: 'Taranto', x: 210, y: 250, num: 21 },
  { name: 'Cagliari', x: 92, y: 268, num: 7 },
]
const CITY_DOTS = [
  { name: 'Torino', x: 64, y: 92 }, { name: 'Genova', x: 86, y: 110 },
  { name: 'Firenze', x: 116, y: 140 }, { name: 'Bari', x: 205, y: 222 },
  { name: 'Lecce', x: 228, y: 258 }, { name: 'Palermo', x: 150, y: 320 },
]
const ITALY_PATH = "M104 36 L112 30 L120 38 L132 34 L140 44 L150 40 L156 50 L150 60 L158 68 L150 78 L160 86 L156 96 L168 104 L162 116 L150 124 L160 134 L156 146 L150 156 L160 166 L156 178 L150 188 L160 198 L156 210 L146 220 L150 232 L142 242 L150 254 L140 262 L128 256 L120 248 L112 240 L106 230 L100 220 L96 208 L92 196 L88 184 L84 172 L82 160 L86 150 L80 142 L72 134 L78 124 L74 114 L80 104 L76 94 L82 84 L78 74 L86 64 L84 54 L92 46 L98 42 Z"

/* ════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════════════════════════ */
function NavItem({ icon, label, active, badge, onClick }) {
  const [h, setH] = useState(false)
  const lit = active || h
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 11, width: '100%',
        padding: '9px 12px', borderRadius: 6, cursor: 'pointer',
        background: active ? 'rgba(255,140,0,0.12)' : 'transparent',
        border: active ? '1px solid rgba(255,140,0,0.5)' : '1px solid transparent',
        boxShadow: active ? '0 0 12px rgba(255,140,0,0.2)' : 'none',
        transition: 'all 0.2s',
      }}>
      <span style={{ color: lit ? '#FF8C00' : '#6A6A72', display: 'flex' }}>{ICON[icon]}</span>
      <span style={{
        flex: 1, textAlign: 'left',
        fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12.5,
        letterSpacing: '0.05em', color: lit ? '#FFA500' : '#8A8A92',
      }}>{label}</span>
      {badge != null && (
        <span style={{
          background: '#FF8C00', color: '#000', borderRadius: 10, minWidth: 20,
          height: 18, padding: '0 6px', fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
    </button>
  )
}

const PANEL = {
  background: 'linear-gradient(180deg,#121214,#0C0C0E)',
  border: '1px solid #1F2024', borderRadius: 10, padding: 16,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
}
function Panel({ title, action, children, style }) {
  return (
    <div style={{ ...PANEL, ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', color: '#fff', margin: 0 }}>{title}</h3>
          {action && <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.06em', color: '#FF8C00', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>{action} <span style={{ fontSize: 8 }}>▾</span></span>}
        </div>
      )}
      {children}
    </div>
  )
}

/* Semicircular gauge KPI */
function Gauge({ label, value, sub, color, rgb, icon }) {
  const TICKS = 28
  return (
    <div style={{
      position: 'relative', flex: 1, minWidth: 0,
      background: 'linear-gradient(180deg,#1A1B1F,#0B0B0D)',
      border: '1px solid #25262B', borderRadius: 14, padding: '10px 8px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: '0.08em', color: '#9A9AA2', marginBottom: 4 }}>{label}</div>
      <div style={{ position: 'relative', width: 130, height: 78 }}>
        <svg width="130" height="78" viewBox="0 0 130 78" style={{ overflow: 'visible' }}>
          {Array.from({ length: TICKS }).map((_, k) => {
            const a = (180 + (k / (TICKS - 1)) * 180) * Math.PI / 180
            const r1 = 60, r2 = k % 3 === 0 ? 50 : 54
            const cx = 65, cy = 70
            const litFrac = k / (TICKS - 1)
            return <line key={k}
              x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
              x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
              stroke={color} strokeOpacity={litFrac < 0.92 ? 0.85 : 0.4}
              strokeWidth={k % 3 === 0 ? 2 : 1.2} />
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 2 }}>
          <span style={{ color, display: 'flex', marginBottom: 2, filter: `drop-shadow(0 0 6px rgba(${rgb},0.7))` }}>{ICON[icon]}</span>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 38, lineHeight: 0.9, color, textShadow: `0 0 16px rgba(${rgb},0.6)` }}>{value}</span>
        </div>
      </div>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9.5, color: sub.bold ? color : '#777', marginTop: 4, textAlign: 'center', lineHeight: 1.3 }}>
        {sub.bold && <span style={{ fontWeight: 700 }}>{sub.bold} </span>}{sub.text}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('DASHBOARD')
  const [richieste, setRichieste] = useState([])

  useEffect(() => {
    supabase.from('richieste').select('*').order('created_at', { ascending: false }).limit(200)
      .then(({ data }) => { if (data && data.length) setRichieste(data) })
      .catch(() => {})
  }, [])

  const has = richieste.length > 0
  const total     = has ? richieste.length : 128
  const inVal     = has ? richieste.filter(r => r.stato === 'in_valutazione').length : 24
  const inExec    = has ? richieste.filter(r => r.stato === 'in_esecuzione').length : 15
  const completed = has ? richieste.filter(r => r.stato === 'completata').length : 89
  const urgent    = has ? richieste.filter(r => r.tempistica === 'urgente').length : 8
  const pct = (n) => total ? ((n / total) * 100).toFixed(1) : '0'

  const donutData = [
    { label: 'Urgenti',       value: 8,  color: '#FF3333' },
    { label: 'Breve termine', value: 46, color: '#FF8C00' },
    { label: 'Programmabili', value: 61, color: '#00CC66' },
    { label: 'Da valutare',   value: 13, color: '#0088FF' },
  ]
  const donutTotal = donutData.reduce((s, d) => s + d.value, 0)
  const donutPct = (v) => ((v / donutTotal) * 100).toFixed(1)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#070708', color: '#fff' }}>

      {/* ══ SIDEBAR ══ */}
      <aside style={{ width: 234, background: '#0A0A0C', borderRight: '1px solid #1A1A1E', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px 16px' }}>
          <Logo size={34} stacked />
        </div>
        <div style={{ height: 1, background: '#1A1A1E', margin: '0 12px' }} />

        <nav style={{ padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(n => (
            <NavItem key={n.id} icon={n.icon} label={n.label} badge={n.badge}
              active={activeNav === n.id}
              onClick={() => { setActiveNav(n.id); if (n.id === 'DASHBOARD') {} }} />
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ color: '#FF8C00', display: 'flex' }}>{ICON.phone}</span>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', color: '#FF8C00' }}>ASSISTENZA RAPIDA</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: '#9A9AA2' }}>
            <span style={{ color: '#6A6A72', display: 'flex' }}>{ICON.phone}</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12 }}>+39 099 1234567</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9A9AA2' }}>
            <span style={{ color: '#6A6A72', display: 'flex' }}>{ICON.mail}</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12 }}>operativo@palmisano.it</span>
          </div>
        </div>

        <div style={{
          margin: 12, padding: '14px 16px', borderRadius: 8,
          background: 'linear-gradient(135deg,rgba(255,140,0,0.12),rgba(255,140,0,0.04))',
          border: '1px solid rgba(255,140,0,0.4)', boxShadow: '0 0 16px rgba(255,140,0,0.12)',
        }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1, color: '#fff' }}>PANORAMICA</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1, color: '#FF8C00' }}>GENERALE</div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <main style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>

        {/* Top header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 44, lineHeight: 0.9, margin: 0, letterSpacing: '0.01em', color: '#E8E8EC' }}>DASHBOARD</h1>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', color: '#FF8C00', marginTop: 4 }}>PANORAMICA RICHIESTE TECNICHE</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#777', marginTop: 4 }}>Gestisci, assegna e monitora tutte le richieste in modo semplice e veloce.</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* ONE CALL box */}
            <div style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,140,0,0.5)', background: 'linear-gradient(180deg,#161617,#0E0E10)', boxShadow: '0 0 16px rgba(255,140,0,0.15)', textAlign: 'left', minWidth: 200 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 17, color: '#FF8C00', lineHeight: 1 }}>ONE CALL™</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: '0.06em', color: '#8A8A92', marginTop: 2 }}>ACCESSO DIRETTO PER<br/>RICHIESTE TECNICHE</div>
              <button onClick={() => navigate('/')} style={{ marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'linear-gradient(135deg,#CC6600,#FF8C00)', border: 'none', borderRadius: 5, padding: '7px 10px', cursor: 'pointer', fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', color: '#000', boxShadow: '0 0 12px rgba(255,140,0,0.4)' }}>
                NUOVA RICHIESTA <span style={{ fontSize: 14 }}>＋</span>
              </button>
            </div>
            {/* Admin */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, border: '1px solid #2A2A30', background: '#0E0E10' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #FF8C00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: '#FF8C00', boxShadow: '0 0 10px rgba(255,140,0,0.4)' }}>P</div>
              <div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 13, color: '#fff' }}>ADMIN PALMISANO</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#FF8C00' }}>Amministratore</div>
              </div>
              <span style={{ color: '#777', fontSize: 11 }}>▾</span>
            </div>
          </div>
        </div>

        {/* KPI Gauges */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Gauge label="RICHIESTE TOTALI" value={total} color="#F2C200" rgb="242,194,0" icon="clipboardCheck" sub={{ bold: '+18%', text: 'rispetto al mese scorso' }} />
          <Gauge label="IN VALUTAZIONE" value={inVal} color="#0099FF" rgb="0,153,255" icon="clock" sub={{ text: `${pct(inVal)}% del totale` }} />
          <Gauge label="IN ESECUZIONE" value={inExec} color="#FF8C00" rgb="255,140,0" icon="hardhat" sub={{ text: `${pct(inExec)}% del totale` }} />
          <Gauge label="COMPLETATE" value={completed} color="#00CC66" rgb="0,204,102" icon="checkCircle" sub={{ text: `${pct(completed)}% del totale` }} />
          <Gauge label="URGENTI" value={urgent} color="#FF3333" rgb="255,51,51" icon="warning" sub={{ text: `${pct(urgent)}% del totale` }} />
        </div>

        {/* Middle row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr', gap: 14 }}>
          {/* Recent table */}
          <Panel title="RICHIESTE RECENTI" action="VEDI TUTTE">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  {['ID RICHIESTA', 'TIPO INTERVENTO', 'LOCALITÀ', 'STATO', 'PRIORITÀ', 'DATA'].map(h => (
                    <th key={h} style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 8.5, letterSpacing: '0.06em', color: '#666', padding: '0 6px 8px 0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #18181C' }}>
                    <td style={{ padding: '8px 6px 8px 0', fontFamily: "'Inter',sans-serif", fontSize: 10.5, color: '#FF8C00', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.id}</td>
                    <td style={{ padding: '8px 6px', fontFamily: "'Inter',sans-serif", fontSize: 10.5, color: '#CFCFD4' }}>{r.type}</td>
                    <td style={{ padding: '8px 6px', fontFamily: "'Inter',sans-serif", fontSize: 10.5, color: '#9A9AA2', whiteSpace: 'nowrap' }}>{r.city}</td>
                    <td style={{ padding: '8px 6px' }}><Badge color={r.sc}>{r.status}</Badge></td>
                    <td style={{ padding: '8px 6px' }}><Badge color={r.pc}>{r.prio}</Badge></td>
                    <td style={{ padding: '8px 0 8px 6px', fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#777', whiteSpace: 'nowrap' }}>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          {/* Donut */}
          <Panel title="RICHIESTE PER PRIORITÀ" action="QUESTO MESE">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <DonutChart data={donutData} total={donutTotal} size={150} thickness={26} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                {donutData.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: d.color, flexShrink: 0, boxShadow: `0 0 6px ${d.color}` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#CFCFD4' }}>{d.label}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#777' }}>{d.value} ({donutPct(d.value)}%)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          {/* Tipo intervento bars */}
          <Panel title="RICHIESTE PER TIPO INTERVENTO" action="QUESTO MESE">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {TIPO.map((t, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#FF8C00', display: 'flex', flexShrink: 0 }}>{TIPO_ICON[t.k]}</span>
                    <span style={{ flex: 1, fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#CFCFD4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9AA2', whiteSpace: 'nowrap' }}>{t.n} ({t.pct}%)</span>
                  </div>
                  <div style={{ height: 3, background: '#1A1A1E', borderRadius: 2, marginTop: 4, marginLeft: 25 }}>
                    <div style={{ height: '100%', width: `${t.pct * 2.4}%`, background: 'linear-gradient(90deg,#CC6600,#FF8C00)', borderRadius: 2, boxShadow: '0 0 6px rgba(255,140,0,0.5)' }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.1fr', gap: 14 }}>
          {/* Map */}
          <Panel title="MAPPA INTERVENTI" action="VEDI MAPPA COMPLETA">
            <div style={{ position: 'relative' }}>
              <DashboardMap height={280} />
              {/* legend */}
              <div style={{ position: 'absolute', left: 8, bottom: 6, background: 'rgba(8,8,10,0.85)', border: '1px solid #222', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 8.5, letterSpacing: '0.06em', color: '#888', marginBottom: 6 }}>LEGENDA PRIORITÀ</div>
                {[['#FF3333', 'Urgente'], ['#FF8C00', 'Breve termine'], ['#00CC66', 'Programmabile'], ['#0088FF', 'Da valutare']].map(([c, l]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: '#AAA' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          {/* Settore */}
          <Panel title="RICHIESTE PER SETTORE" action="QUESTO MESE">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SETTORE.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ color: '#FF8C00', display: 'flex', flexShrink: 0 }}>{SET_ICON[s.k]}</span>
                  <span style={{ flex: 1, fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#CFCFD4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9AA2', whiteSpace: 'nowrap' }}>{s.n}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#777', whiteSpace: 'nowrap', width: 46, textAlign: 'right' }}>({s.pct}%)</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Attività */}
          <Panel title="ATTIVITÀ RECENTI" action="VEDI TUTTE">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {ATTIVITA.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: a.color, display: 'flex', flexShrink: 0, marginTop: 1, filter: `drop-shadow(0 0 4px ${a.color}88)` }}>{ICON[a.icon]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11.5, color: '#E0E0E4' }}>{a.t}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#FF8C00', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.s}</div>
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9.5, color: '#777', whiteSpace: 'nowrap', flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Bottom stat bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...PANEL, padding: '14px 18px' }}>
          <div style={{ paddingRight: 18, borderRight: '1px solid #222', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: '#E8E8EC', lineHeight: 1 }}>PANORAMICA</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: '#FF8C00', lineHeight: 1 }}>GENERALE</div>
          </div>
          {BOTTOM.map((b, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 11, borderRight: i < BOTTOM.length - 1 ? '1px solid #1A1A1E' : 'none' }}>
              <span style={{ color: '#FF8C00', display: 'flex', filter: 'drop-shadow(0 0 5px rgba(255,140,0,0.5))' }}>{ICON[b.icon]}</span>
              <div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 9.5, letterSpacing: '0.06em', color: '#888' }}>{b.label}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 26, color: '#fff', lineHeight: 1 }}>{b.value}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function Badge({ color, children }) {
  const rgb = color === '#FF3333' ? '255,51,51' : color === '#FF8C00' ? '255,140,0' : color === '#00CC66' ? '0,204,102' : color === '#B388FF' ? '179,136,255' : '0,136,255'
  return (
    <span style={{
      display: 'inline-block', whiteSpace: 'nowrap',
      fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 9.5, letterSpacing: '0.03em',
      color, background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.5)`,
      borderRadius: 4, padding: '2px 7px',
    }}>{children}</span>
  )
}
