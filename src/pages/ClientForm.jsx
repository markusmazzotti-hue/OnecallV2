import React, { useState, useRef } from 'react'
import HeaderStepper from '../components/HeaderStepper.jsx'
import RotarySelector from '../components/RotarySelector.jsx'
import ItalyMapLeaflet from '../components/ItalyMapLeaflet.jsx'
import Logo from '../components/Logo.jsx'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

const STEP1_ITEMS = [
  'Demolizione Industriale',
  'Taglio Termico Rottami',
  'Smantellamento Impianti',
  'Intervento in Ambiente Produttivo',
  'Strip-out',
  'Caso Complesso da Valutare',
]

const STEP2_ITEMS = [
  'Industria',
  'Trader & Mandatari Acciaierie',
  'Acciaieria & Fonderia',
  'Altro Settore',
  'Settore Commerciale',
  'Impianto Industriale e Sito Produttivo',
  'Centro Riciclo Rottami',
]

const ItalyMapSVG = () => (
  <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 120, opacity: 0.7 }} fill="none">
    <path
      d="M85 10 L90 8 L98 12 L105 10 L110 15 L108 22 L112 28 L115 35 L118 42 L120 50 L122 58 L124 65 L128 72 L132 80 L138 88 L142 95 L145 102 L148 110 L150 118 L148 126 L145 132 L142 138 L138 142 L134 148 L130 154 L126 160 L120 165 L114 168 L108 170 L102 172 L96 170 L90 166 L85 162 L80 156 L76 150 L74 144 L72 138 L70 130 L72 122 L75 115 L78 108 L80 100 L80 92 L78 85 L76 78 L75 70 L74 62 L75 55 L78 48 L80 40 L82 32 L83 22 Z"
      stroke="#2A2A2A"
      strokeWidth="1.5"
      fill="#161616"
    />
    <path
      d="M150 118 L155 122 L160 128 L165 135 L168 142 L165 148 L160 152 L155 148 L152 142 L150 136 L150 128 Z"
      stroke="#2A2A2A"
      strokeWidth="1.5"
      fill="#161616"
    />
    <path
      d="M80 175 L85 180 L88 188 L86 196 L80 200 L74 196 L72 188 L75 180 Z"
      stroke="#2A2A2A"
      strokeWidth="1.5"
      fill="#161616"
    />
    {/* City dots */}
    <circle cx="96" cy="48" r="3" fill="#FF8C00" opacity="0.9"/>
    <circle cx="82" cy="55" r="2.5" fill="#FF8C00" opacity="0.7"/>
    <circle cx="104" cy="62" r="2" fill="#00E676" opacity="0.8"/>
    <circle cx="90" cy="80" r="3.5" fill="#FF3333" opacity="0.9"/>
    <circle cx="98" cy="95" r="2" fill="#FF8C00" opacity="0.7"/>
    <circle cx="110" cy="110" r="2.5" fill="#00E676" opacity="0.7"/>
    <circle cx="120" cy="135" r="2" fill="#FF8C00" opacity="0.8"/>
    <circle cx="130" cy="148" r="3" fill="#FF3333" opacity="0.9"/>
  </svg>
)

const card = {
  background: 'var(--oc-card)',
  border: '1px solid var(--oc-card-border)',
  borderRadius: 6,
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const inputStyle = {
  background: 'var(--oc-input-bg)',
  border: '1px solid var(--oc-input-border)',
  borderRadius: 4,
  color: 'var(--oc-text)',
  padding: '9px 12px',
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const labelStyle = {
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: '0.1em',
  color: 'var(--oc-text-2)',
  textTransform: 'uppercase',
}

const boltStyle = (left, top) => ({
  position: 'absolute', left, top,
  width: 6, height: 6, borderRadius: '50%',
  background: 'radial-gradient(circle at 35% 30%, #6A6A6A, #0E0E0E)',
  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.55), 0 1px 1px rgba(0,0,0,0.5)',
  zIndex: 3,
})

/* Chamfered (cut-corner) clip-path — industrial HUD look */
const chamfer = (c) =>
  `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), ` +
  `calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`

/* Unified step header: "STEP N" badge (tab color, chamfered) + uppercase title */
function StepHeader({ n, color, rgb, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
      {/* Outer = border layer (chamfered) */}
      <div style={{
        background: `rgba(${rgb},0.5)`,
        clipPath: chamfer(6),
        boxShadow: `0 0 10px rgba(${rgb},0.25)`,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {/* Inner = fill + text (chamfered, 1px inset reveals border) */}
        <div style={{
          margin: 1,
          background: 'linear-gradient(180deg, #141414, #0C0C0C)',
          clipPath: chamfer(5.3),
          padding: '2px 11px',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '0.1em',
          color,
        }}>STEP {n}</div>
      </div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.08em',
        color: '#CCCCCC',
        textTransform: 'uppercase',
      }}>{children}</div>
    </div>
  )
}

function InputField({ label, placeholder, icon, value, onChange, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <div style={{ ...labelStyle, marginBottom: 5 }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          style={{
            ...inputStyle,
            paddingLeft: icon ? 36 : 12,
            borderColor: focused ? '#FF8C00' : '#2A2A2A',
            boxShadow: focused ? '0 0 0 1px rgba(255,140,0,0.3), inset 0 0 0 1px rgba(255,140,0,0.1)' : 'none',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {icon && (
          <span style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: focused ? '#FF8C00' : 'var(--oc-text-muted)', fontSize: 14, transition: 'color 0.2s',
          }}>{icon}</span>
        )}
      </div>
    </div>
  )
}

function TextArea({ label, placeholder, max, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ ...labelStyle, marginBottom: 5 }}>{label}</div>
      <textarea
        value={value}
        onChange={e => onChange && onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          resize: 'none',
          flex: 1,
          minHeight: 90,
          borderColor: focused ? '#FF8C00' : '#2A2A2A',
          boxShadow: focused ? '0 0 0 1px rgba(255,140,0,0.3)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div style={{ textAlign: 'right', fontSize: 10, color: 'var(--oc-text-muted)', marginTop: 3 }}>
        {value.length} / {max}
      </div>
    </div>
  )
}

/* SVG icons for Step 4 upload buttons */
const UPLOAD_ICONS = {
  camera: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  image: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  video: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  mic: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
      <path d="M19 10v2a7 7 0 01-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  clip: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
}

/* Step 7 summary icons (colored line-art, matching reference) */
const SUMMARY = {
  tipo:        { color: '#FF9500', rgb: '255,149,0', icon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l5 2-2 5"/><path d="M14 4l-3 6"/>
      <path d="M9.5 14a2 2 0 11-4 0 2 2 0 014 0z"/><path d="M11 10l-3.5 3"/>
      <rect x="13" y="15" width="8" height="3" rx="0.5"/><path d="M15 15v-2h4v2"/>
    </svg>
  )},
  settore:     { color: '#7CFF1A', rgb: '124,255,26', icon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.4 9.6V3.6h3.2V9.6"/><path d="M10.9 3.6V2.2M13.1 3.6V2.2"/>
      <path d="M3.6 19v-7l2 1.3v-1.3l2 1.3v-1.3l2 1.3v-1.3l2 1.3v-1.3l2 1.3v-1.3l2 1.3V19z"/>
      <circle cx="6.7" cy="15" r="0.9"/><circle cx="10" cy="15" r="0.9"/><circle cx="13.3" cy="15" r="0.9"/><circle cx="16.6" cy="15" r="0.9"/>
    </svg>
  )},
  dove:        { color: '#29B6FF', rgb: '41,182,255', icon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/>
      <circle cx="12" cy="10" r="2.6"/>
    </svg>
  )},
  foto:        { color: '#22D3EE', rgb: '34,211,238', icon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )},
  descrizione: { color: '#E040FB', rgb: '224,64,251', icon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="3.2" rx="1"/>
      <circle cx="9" cy="10" r="1"/><line x1="11.5" y1="10" x2="16" y2="10"/>
      <circle cx="9" cy="13.5" r="1"/><line x1="11.5" y1="13.5" x2="16" y2="13.5"/>
      <circle cx="9" cy="17" r="1"/><line x1="11.5" y1="17" x2="16" y2="17"/>
    </svg>
  )},
  contatti:    { color: '#B388FF', rgb: '179,136,255', icon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )},
}

function UploadBtn({ iconKey, label, optional, onClick }) {
  const [hover, setHover] = useState(false)
  const BLUE = '#0088FF'
  const RGB  = '0,136,255'
  const SZ   = 86
  const CX   = SZ / 2
  const TICKS = 28
  const R_OUTER = SZ / 2 - 2
  const R_INNER = SZ / 2 - 9
  const R_DISC  = SZ / 2 - 11

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer', flex: 1 }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'relative', width: SZ, height: SZ }}>
        <svg width={SZ} height={SZ} viewBox={`0 0 ${SZ} ${SZ}`} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
          <defs>
            <filter id={`ub-glow-${iconKey}`} x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="3" result="b1" />
              <feGaussianBlur stdDeviation="6" result="b2" />
              <feMerge>
                <feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Outer glow ring on hover */}
          {hover && (
            <circle cx={CX} cy={CX} r={R_OUTER - 1}
              fill="none"
              stroke={`rgba(${RGB},0.18)`}
              strokeWidth="8"
            />
          )}
          {/* Tick marks — dim blue idle, bright blue on hover */}
          {Array.from({ length: TICKS }).map((_, i) => {
            const angle = (i / TICKS) * 360
            const rad   = ((angle - 90) * Math.PI) / 180
            const long  = i % 4 === 0
            const r1 = R_OUTER
            const r2 = long ? R_OUTER - 7 : R_OUTER - 4
            return (
              <line
                key={i}
                x1={CX + r1 * Math.cos(rad)} y1={CX + r1 * Math.sin(rad)}
                x2={CX + r2 * Math.cos(rad)} y2={CX + r2 * Math.sin(rad)}
                stroke={`rgba(${RGB},${hover ? 0.85 : 0.22})`}
                strokeWidth={long ? 1.5 : 1}
                style={{ transition: 'stroke 0.25s' }}
              />
            )
          })}
          {/* Inner border circle — dim blue idle, bright on hover */}
          <circle cx={CX} cy={CX} r={R_INNER}
            fill="#080808"
            stroke={`rgba(${RGB},${hover ? 0.6 : 0.28})`}
            strokeWidth="1.5"
            style={{ transition: 'stroke 0.25s' }}
          />
          {/* Center disc */}
          <circle cx={CX} cy={CX} r={R_DISC}
            fill="radial-gradient(#111,#060606)"
            style={{ transition: 'all 0.25s' }}
          />
          {/* Always-on rotating runner comet — dim/thin idle, bright/thick on hover */}
          <g className="oc-runner-slow" style={{ transformOrigin: `${CX}px ${CX}px` }}>
            <circle cx={CX} cy={CX} r={R_OUTER - 1}
              fill="none"
              stroke={BLUE}
              strokeWidth={hover ? 3.4 : 1.8}
              strokeLinecap="round"
              strokeDasharray="46 218"
              opacity={hover ? 1 : 0.3}
              filter={`url(#ub-glow-${iconKey})`}
              style={{ transition: 'stroke-width 0.25s, opacity 0.25s' }}
            />
          </g>
        </svg>

        {/* Icon centered over SVG — dim blue idle, bright blue on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: hover ? BLUE : `rgba(${RGB},0.42)`,
          filter: hover ? `drop-shadow(0 0 8px rgba(${RGB},0.85))` : 'none',
          transition: 'color 0.25s, filter 0.25s',
        }}>
          {UPLOAD_ICONS[iconKey]}
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center', lineHeight: 1.25 }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '0.07em',
          color: hover ? '#FFFFFF' : 'var(--oc-text-muted)',
          textTransform: 'uppercase',
          transition: 'color 0.25s',
        }}>{label}</div>
        {optional && (
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: 8.5,
            letterSpacing: '0.04em',
            color: '#0066CC',
            textTransform: 'uppercase',
          }}>(OPZIONALE)</div>
        )}
      </div>
    </div>
  )
}

export default function ClientForm() {
  const [step1, setStep1] = useState([])     // multi-select: array of indices
  const [step2, setStep2] = useState(null)   // single-select: index or null
  const [priority, setPriority] = useState('breve')
  const [sopralluogo, setSopralluogo] = useState(true)

  // Step 3
  const [localita, setLocalita] = useState('')
  const [indirizzo, setIndirizzo] = useState('')

  // Step 5
  const [descrizione, setDescrizione] = useState('')
  const [condizioni, setCondizioni] = useState('')

  // Step 6
  const [nome, setNome] = useState('')
  const [azienda, setAzienda] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')

  // Step 4 — file upload
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  // Submit state
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [ctaHover, setCtaHover] = useState(false)

  const navigate = useNavigate()

  const priorities = [
    { id: 'urgente',       label: 'URGENTE',       color: '#FF3333', rgb: '255,51,51',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
    { id: 'breve',         label: 'BREVE\nTERMINE', color: '#FF8C00', rgb: '255,140,0',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { id: 'programmabile', label: 'PROGRAMMABILE', color: '#00CC66', rgb: '0,204,102',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  ]

  const summaryItems = [
    { key: 'tipo',        label: 'TIPO INTERVENTO', value: step1.length ? (step1.length === 1 ? STEP1_ITEMS[step1[0]] : `${step1.length} selezionati`) : 'Da definire' },
    { key: 'settore',     label: 'SETTORE', value: step2 != null ? STEP2_ITEMS[step2] : 'Da definire' },
    { key: 'dove',        label: 'DOVE E QUANDO', value: localita || 'Da definire' },
    { key: 'foto',        label: 'FOTO / VIDEO', value: files.length > 0 ? `${files.length} file` : 'Da caricare' },
    { key: 'descrizione', label: 'DESCRIZIONE', value: descrizione || 'Da definire' },
    { key: 'contatti',    label: 'CONTATTI', value: nome || 'Da definire' },
  ]

  const themeVars = {
    '--oc-bg': '#080808',
    '--oc-surface': '#0A0A0A',
    '--oc-card': '#111111',
    '--oc-card-border': '#1E1E1E',
    '--oc-input-bg': '#0A0A0A',
    '--oc-input-border': '#2A2A2A',
    '--oc-text': '#FFFFFF',
    '--oc-text-2': '#9A9A9A',
    '--oc-text-muted': '#555555',
  }

  const completedSteps = [
    step1.length > 0 && 1,
    step2 != null && 2,
    localita.trim() && 3,
    files.length > 0 && 4,
    descrizione.trim() && 5,
    (nome.trim() || email.trim() || telefono.trim()) && 6,
    submitted && 7,
  ].filter(Boolean)

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...selected])
    e.target.value = ''
  }

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { error } = await supabase.from('richieste').insert({
        tipo_intervento: step1.map(i => STEP1_ITEMS[i]).join(', ') || null,
        settore:         step2 != null ? STEP2_ITEMS[step2] : null,
        localita:        localita || null,
        indirizzo:       indirizzo || null,
        tempistica:      priority === 'breve' ? 'breve_termine' : priority,
        sopralluogo,
        descrizione:     descrizione || null,
        condizioni:      condizioni || null,
        nome_cognome:    nome || null,
        azienda:         azienda || null,
        telefono:        telefono || null,
        email:           email || null,
        stato:           'in_valutazione',
      })
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message || 'Errore durante l\'invio. Riprova.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh', background: '#080808', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg,#008040,#00E676)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(0,230,118,0.5)',
          fontSize: 36,
        }}>✓</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 32, color: '#00E676', letterSpacing: '0.06em' }}>
            RICHIESTA INVIATA
          </div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'var(--oc-text-2)', marginTop: 8 }}>
            Il team Palmisano riceverà la tua richiesta e ti risponderà in pochi minuti.
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setLocalita(''); setIndirizzo(''); setDescrizione(''); setCondizioni(''); setNome(''); setAzienda(''); setTelefono(''); setEmail(''); setFiles([]) }}
          style={{
            background: 'linear-gradient(135deg,#CC6600,#FF8C00)',
            border: 'none', borderRadius: 6, padding: '12px 32px',
            fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14,
            color: '#fff', letterSpacing: '0.08em', cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255,140,0,0.4)',
          }}
        >NUOVA RICHIESTA</button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--oc-bg)', color: 'var(--oc-text)', display: 'flex', flexDirection: 'column', ...themeVars }}>
      {/* Header */}
      <header style={{
        background: 'var(--oc-surface)',
        borderBottom: '1px solid var(--oc-card-border)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <Logo size={40} />

        {/* Accordion step tracker — centered */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 16px', overflow: 'hidden' }}>
          <HeaderStepper completed={completedSteps} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate('/istruzioni')}
            style={{
              background: 'transparent',
              border: '1px solid #222',
              borderRadius: 4,
              color: '#444',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.08em',
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C00'; e.currentTarget.style.color = '#FF8C00' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#444' }}
          >ISTRUZIONI</button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'transparent',
              border: '1px solid #222',
              borderRadius: 4,
              color: '#444',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.08em',
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C00'; e.currentTarget.style.color = '#FF8C00' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#444' }}
          >ADMIN</button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'linear-gradient(135deg, #1A1A1A 0%, #111111 50%, #1C1C1C 100%)',
            border: '1px solid rgba(255,140,0,0.55)',
            borderRadius: 8,
            padding: '10px 16px',
            boxShadow: '0 0 14px rgba(255,140,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            {/* Shield with star icon — heraldic pointed-bottom shape */}
            <div className="oc-shield" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 6px rgba(255,140,0,0.7))' }}>
              <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
                {/* Outer shield — pointed bottom via quadratic bezier */}
                <path d="M17 1L2 6.5V19C2 28 8 35 17 39C26 35 32 28 32 19V6.5L17 1Z"
                  fill="rgba(255,140,0,0.15)" stroke="#FF8C00" strokeWidth="1.5" strokeLinejoin="round"/>
                {/* Inner shield fill */}
                <path d="M17 4L4.5 8.5V19C4.5 27 9.5 33 17 36.5C24.5 33 29.5 27 29.5 19V8.5L17 4Z"
                  fill="rgba(255,140,0,0.08)"/>
                {/* Star */}
                <polygon
                  points="17,11 18.9,16 24,16 19.9,19.1 21.5,24.2 17,21.2 12.5,24.2 14.1,19.1 10,16 15.1,16"
                  fill="#FF8C00" opacity="0.95"/>
              </svg>
            </div>
            {/* Text */}
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11.5,
              color: '#D0D0D0',
              lineHeight: 1.5,
              letterSpacing: '0.01em',
            }}>
              I tuoi dati sono al sicuro.<br />
              Le richieste vengono gestite<br />con priorità tecnica.
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

          {/* Step 1 */}
          <div style={{ ...card, alignItems: 'center' }}>
            <div style={{ alignSelf: 'flex-start' }}>
              <StepHeader n="1" color="#FF8C00" rgb="255,140,0">SELEZIONA IL TIPO DI INTERVENTO</StepHeader>
            </div>
            <RotarySelector
              items={STEP1_ITEMS}
              selected={step1}
              onChange={setStep1}
              multiple
              theme="orange"
              stepNum="1"
              centerLabel="TIPO INTERVENTO"
              centerSub="Selezione multipla"
            />
            <p style={{ fontSize: 10, color: 'var(--oc-text-muted)', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
              Clicca per accendere uno o più tipi di intervento.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ ...card, alignItems: 'center' }}>
            <div style={{ alignSelf: 'flex-start' }}>
              <StepHeader n="2" color="#00E676" rgb="0,230,118">SELEZIONA IL SETTORE DI RIFERIMENTO</StepHeader>
            </div>
            <RotarySelector
              items={STEP2_ITEMS}
              selected={step2}
              onChange={setStep2}
              theme="green"
              stepNum="2"
              centerLabel="SETTORE"
              centerSub="Selezione singola"
            />
            <p style={{ fontSize: 10, color: 'var(--oc-text-muted)', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
              Clicca per selezionare il settore di riferimento.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ ...card }}>
            <StepHeader n="3" color="#FF8C00" rgb="255,140,0">DOVE SI TROVA L'INTERVENTO E QUANDO È PREVISTO?</StepHeader>

            {/* Content row: form fields left, map right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {/* Form fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <InputField label="LOCALITÀ" placeholder="Es. Taranto, Genova, ecc." icon="📍" value={localita} onChange={setLocalita} />
                <InputField label="INDIRIZZO (FACOLTATIVO)" placeholder="Via, n°, stabilimento, ecc." icon="+" value={indirizzo} onChange={setIndirizzo} />

                <div>
                  <div style={{ ...labelStyle, marginBottom: 8 }}>TEMPISTICA INDICATIVA</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {priorities.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setPriority(p.id)}
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 7,
                          padding: '4px 2px',
                          transition: 'all 0.2s',
                        }}
                      >
                        {/* Animated dial — tick ring + always-on runner */}
                        <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}>
                          <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                            <defs>
                              <filter id={`dial-${p.id}`} x="-60%" y="-60%" width="220%" height="220%">
                                <feGaussianBlur stdDeviation="2.6" result="b" />
                                <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                              </filter>
                            </defs>
                            {Array.from({ length: 24 }).map((_, k) => {
                              const a = ((k / 24) * 360 - 90) * Math.PI / 180
                              const long = k % 3 === 0
                              const r1 = 28, r2 = long ? 22 : 24.5
                              const sel = priority === p.id
                              return (
                                <line key={k}
                                  x1={30 + r1 * Math.cos(a)} y1={30 + r1 * Math.sin(a)}
                                  x2={30 + r2 * Math.cos(a)} y2={30 + r2 * Math.sin(a)}
                                  stroke={`rgba(${p.rgb},${sel ? 1 : 0.22})`}
                                  strokeWidth={long ? 1.6 : 1} />
                              )
                            })}
                            <circle cx="30" cy="30" r="21" fill="#0C0C0C"
                              stroke={`rgba(${p.rgb},${priority === p.id ? 0.95 : 0.22})`} strokeWidth="1.5" />
                            <g className="oc-runner-slow" style={{ transformOrigin: '30px 30px' }}>
                              <circle cx="30" cy="30" r="28" fill="none"
                                stroke={p.color} strokeWidth={priority === p.id ? 3.2 : 1.6}
                                strokeLinecap="round" strokeDasharray="30 146"
                                opacity={priority === p.id ? 1 : 0.22}
                                filter={`url(#dial-${p.id})`} />
                            </g>
                          </svg>
                          <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: priority === p.id ? p.color : '#555',
                            filter: priority === p.id ? `drop-shadow(0 0 8px rgba(${p.rgb},1)) drop-shadow(0 0 16px rgba(${p.rgb},0.6))` : 'none',
                            transition: 'color 0.25s, filter 0.25s',
                          }}>
                            {p.icon}
                          </div>
                        </div>
                        {/* Label */}
                        <span style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 9.5,
                          letterSpacing: '0.06em',
                          color: priority === p.id ? p.color : '#6A6A6A',
                          textShadow: priority === p.id ? `0 0 10px rgba(${p.rgb},0.9)` : 'none',
                          textAlign: 'center',
                          lineHeight: 1.25,
                          whiteSpace: 'pre-line',
                          transition: 'color 0.25s',
                        }}>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ ...labelStyle, fontSize: 10 }}>RICHIEDO SOPRALLUOGO OPERATIVO <span style={{ color: 'var(--oc-text-muted)' }}>(FACOLTATIVO)</span></span>
                  <div
                    onClick={() => setSopralluogo(!sopralluogo)}
                    style={{
                      width: 40, height: 22,
                      background: sopralluogo ? '#00CC66' : '#2A2A2A',
                      borderRadius: 11,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      flexShrink: 0,
                      boxShadow: sopralluogo ? '0 0 8px rgba(0,204,102,0.4)' : 'none',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 2,
                      left: sopralluogo ? 20 : 2,
                      width: 18, height: 18,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'left 0.2s',
                    }} />
                  </div>
                </div>
              </div>

              {/* Italy map — full width, integrated, no frame */}
              <div style={{ width: '100%' }}>
                <ItalyMapLeaflet localita={localita} indirizzo={indirizzo} onLocationChange={setLocalita} height={250} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

          {/* Step 4 */}
          <div style={card}>
            <StepHeader n="4" color="#0088FF" rgb="0,136,255">CARICA FOTO, VIDEO E DESCRIZIONE AUDIO</StepHeader>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', padding: '6px 0' }}>
              <UploadBtn iconKey="camera" label="SCATTA FOTO"  onClick={() => fileInputRef.current?.click()} />
              <UploadBtn iconKey="image"  label="CARICA FOTO"  onClick={() => fileInputRef.current?.click()} />
              <UploadBtn iconKey="video"  label="CARICA VIDEO" onClick={() => fileInputRef.current?.click()} />
              <UploadBtn iconKey="mic"    label="AUDIO"        onClick={() => fileInputRef.current?.click()} />
              <UploadBtn iconKey="clip"   label="ALLEGATI" optional onClick={() => fileInputRef.current?.click()} />
            </div>
            {files.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {files.map((f, i) => (
                  <span key={i} style={{
                    background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3,
                    padding: '2px 8px', fontSize: 10, color: 'var(--oc-text-2)', fontFamily: "'Inter', sans-serif",
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    {f.name.length > 20 ? f.name.slice(0, 18) + '…' : f.name}
                    <span
                      style={{ cursor: 'pointer', color: 'var(--oc-text-muted)', marginLeft: 2 }}
                      onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                    >×</span>
                  </span>
                ))}
              </div>
            )}
            <p style={{ fontSize: 10, color: 'var(--oc-text-muted)', fontFamily: "'Inter', sans-serif", margin: 0, lineHeight: 1.6 }}>
              Puoi caricare più file alla volta.<br/>
              Formati supportati: JPG, PNG, MP4, MP3 (max 100MB)
            </p>
          </div>

          {/* Step 5 */}
          <div style={{ ...card }}>
            <StepHeader n="5" color="#9CFF00" rgb="156,255,0">DESCRIVI LA RICHIESTA</StepHeader>
            <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 140 }}>
              <TextArea
                label="COSA VUOI OTTENERE?"
                placeholder="Descrivi brevemente l'intervento, l'obiettivo e le criticità principali..."
                max={2000}
                value={descrizione}
                onChange={setDescrizione}
              />
              <TextArea
                label="CONDIZIONI PARTICOLARI (SE PRESENTI)"
                placeholder="Descrivi eventuali condizioni particolari, vincoli, esigenze..."
                max={1000}
                value={condizioni}
                onChange={setCondizioni}
              />
            </div>
          </div>

          {/* Step 6 */}
          <div style={card}>
            <StepHeader n="6" color="#00E5C8" rgb="0,229,200">I TUOI CONTATTI</StepHeader>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <InputField label="NOME E COGNOME" placeholder="Es. Mario Rossi" icon="👤" value={nome} onChange={setNome} />
              <InputField label="AZIENDA" placeholder="Nome azienda" icon="🏢" value={azienda} onChange={setAzienda} />
              <InputField label="TELEFONO" placeholder="Es. +39 333 1234567" icon="📞" value={telefono} onChange={setTelefono} type="tel" />
              <InputField label="EMAIL" placeholder="Es. nome@azienda.it" icon="✉" value={email} onChange={setEmail} type="email" />
            </div>
          </div>
        </div>
      </main>

      {/* Summary bar */}
      <footer style={{
        background: 'var(--oc-surface)',
        borderTop: '1px solid var(--oc-card-border)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
      }}>
        <div style={{ minWidth: 230, flexShrink: 0 }}>
          <StepHeader n="7" color="#FF8C00" rgb="255,140,0">RIEPILOGO RICHIESTA</StepHeader>
          <div style={{ fontSize: 10, color: 'var(--oc-text-muted)', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
            Verifica i dati inseriti e invia la tua richiesta.
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', gap: 12, overflow: 'hidden' }}>
          {summaryItems.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              minWidth: 80,
              flex: 1,
              borderRight: i < summaryItems.length - 1 ? '1px solid #1A1A1A' : 'none',
              paddingRight: i < summaryItems.length - 1 ? 12 : 0,
            }}>
              <div style={{
                color: SUMMARY[s.key].color,
                filter: `drop-shadow(0 0 6px rgba(${SUMMARY[s.key].rgb},0.85))`,
                lineHeight: 0, marginBottom: 3,
              }}>{SUMMARY[s.key].icon}</div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.08em', color: '#FFFFFF', textAlign: 'center' }}>{s.label}</span>
              <span style={{ fontSize: 10, color: 'var(--oc-text-2)', fontFamily: "'Inter', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>{s.value.length > 20 ? s.value.slice(0, 18) + '…' : s.value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          {submitError && (
            <div style={{ fontSize: 10, color: '#FF3333', fontFamily: "'Inter',sans-serif", maxWidth: 220, textAlign: 'right' }}>
              {submitError}
            </div>
          )}
          {/* ATTIVA ONE CALL — industrial metal CTA with glowing runner ring */}
          <button
            className="oc-cta"
            onClick={handleSubmit}
            disabled={submitting}
            onMouseEnter={() => !submitting && setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'stretch',
              height: 112,
              minWidth: 520,
              padding: 0,
              border: 'none',
              background: 'linear-gradient(180deg,#3A3A3E 0%,#1C1C1F 48%,#0E0E10 100%)',
              borderRadius: 8,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              overflow: 'hidden',
              clipPath: 'polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%)',
              boxShadow: ctaHover
                ? '0 0 48px rgba(255,150,0,0.65), 0 0 96px rgba(255,150,0,0.28)'
                : '0 0 26px rgba(255,150,0,0.35), 0 5px 16px rgba(0,0,0,0.6)',
              transition: 'box-shadow 0.3s',
            }}
          >
            {/* Left hazard chevron edge */}
            <div style={{
              width: 70, flexShrink: 0, position: 'relative',
              background: 'repeating-linear-gradient(-45deg,#F2B505 0 13px,#141414 13px 26px)',
              clipPath: 'polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%)',
            }}>
              <span style={boltStyle(10, 10)} />
              <span style={boltStyle(10, 'calc(100% - 16px)')} />
            </div>

            {/* Main amber panel */}
            <div style={{
              flex: 1, position: 'relative',
              background: 'linear-gradient(180deg,#FFC21A 0%,#F2A410 42%,#C9820A 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '0 28px',
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.32), inset 0 -3px 10px rgba(120,70,0,0.4)',
            }}>
              {/* top + bottom hazard trims */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6,
                background: 'repeating-linear-gradient(-45deg,#1A1A1A 0 9px,#F2B505 9px 18px)', opacity: 0.9 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
                background: 'repeating-linear-gradient(-45deg,#1A1A1A 0 9px,#F2B505 9px 18px)', opacity: 0.9 }} />

              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                fontSize: 42, letterSpacing: '0.02em', color: '#141414',
                lineHeight: 1, textTransform: 'uppercase',
                textShadow: '0 1px 0 rgba(255,255,255,0.28)',
              }}>
                {submitting ? 'INVIO IN CORSO…' : <>ATTIVA ONE CALL<sup style={{ fontSize: 18, verticalAlign: 'super' }}>™</sup></>}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 13,
                color: 'rgba(20,20,20,0.78)', marginTop: 6, lineHeight: 1.35, fontWeight: 500,
              }}>
                Invia richiesta tecnica a<br/>Palmisano Demolizioni &amp; Taglio Termico
              </div>
            </div>

            {/* Right circular runner button */}
            <div style={{
              width: 128, flexShrink: 0,
              background: 'linear-gradient(180deg,#2C2C30 0%,#141416 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.6)',
            }}>
              <span style={boltStyle(10, 10)} />
              <span style={boltStyle(10, 'calc(100% - 16px)')} />

              <div style={{ position: 'relative', width: 96, height: 96 }}>
                <svg width="96" height="96" viewBox="0 0 96 96" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                  <defs>
                    <filter id="ctaGlow" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="3.5" result="b1" />
                      <feGaussianBlur stdDeviation="8" result="b2" />
                      <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {/* dark inner disc */}
                  <circle cx="48" cy="48" r="30" fill="#070707" stroke="rgba(255,150,0,0.4)" strokeWidth="1" />
                  {/* bright glowing ring (always on) */}
                  <circle cx="48" cy="48" r="38" fill="none"
                    stroke="#FF8C00" strokeWidth={ctaHover ? 4 : 3.2}
                    opacity={ctaHover ? 1 : 0.9} filter="url(#ctaGlow)" />
                  {/* always-running bright comet highlight */}
                  <g className="oc-runner" style={{ transformOrigin: '48px 48px' }}>
                    <circle cx="48" cy="48" r="38" fill="none"
                      stroke="#FFD27A" strokeWidth="4.2" strokeLinecap="round"
                      strokeDasharray="40 200" filter="url(#ctaGlow)" />
                  </g>
                </svg>
                {/* arrow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFA500',
                  filter: ctaHover
                    ? 'drop-shadow(0 0 10px rgba(255,165,0,1)) drop-shadow(0 0 20px rgba(255,165,0,0.6))'
                    : 'drop-shadow(0 0 7px rgba(255,165,0,0.8))',
                  transition: 'filter 0.25s',
                }}>
                  <svg className="oc-cta-arrow" width="34" height="34" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    {submitting
                      ? <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>
                      : <><line x1="4" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>
                    }
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </footer>

      {/* Security footer */}
      <div style={{
        background: 'var(--oc-surface)',
        borderTop: '1px solid var(--oc-card-border)',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 12 }}>🛡</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--oc-text-muted)' }}>
          I tuoi dati sono al sicuro. Le richieste vengono gestite con priorità tecnica.
        </span>
      </div>
    </div>
  )
}
