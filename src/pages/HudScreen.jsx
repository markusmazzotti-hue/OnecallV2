import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

const W = 1800
const H = 1000

function pos([x1, y1, x2, y2]) {
  return {
    position: 'absolute',
    left: `${(x1 / W) * 100}%`,
    top: `${(y1 / H) * 100}%`,
    width: `${((x2 - x1) / W) * 100}%`,
    height: `${((y2 - y1) / H) * 100}%`,
  }
}

const A = '/assets/palmisano-ui/'

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

/* ── Radial selector ─────────────────────────────────────────────── */
function RadialSelector({ items, activeIndex, onChange, theme = 'orange', stepNum, centerLabel }) {
  const n = items.length
  const SZ = 440
  const CX = SZ / 2
  const CY = SZ / 2
  const R_ITEM = 152
  const R_CENTER = 96
  const ORANGE = '#ffb000'
  const GREEN = '#9cff00'
  const color = theme === 'green' ? GREEN : ORANGE
  const filterGreen = theme === 'green' ? 'hue-rotate(88deg) saturate(1.15)' : 'none'

  const angles = items.map((_, i) => (i * 360) / n - 90)
  const activeAngle = angles[activeIndex]

  return (
    <div style={{ position: 'relative', width: SZ, height: SZ }}>
      {/* OFF layer — always shown */}
      <img
        src={`${A}selector-off.png`}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
      {/* ON layer — rotates to active item */}
      <img
        src={`${A}selector-on.png`}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none',
          transform: `rotate(${activeAngle + 90}deg)`,
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          filter: filterGreen,
          transformOrigin: 'center center',
        }}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
      {/* Item labels */}
      {items.map((label, i) => {
        const angleDeg = angles[i]
        const rad = (angleDeg * Math.PI) / 180
        const lx = CX + R_ITEM * Math.cos(rad)
        const ly = CY + R_ITEM * Math.sin(rad)
        const isActive = i === activeIndex
        return (
          <div
            key={i}
            onClick={() => onChange(i)}
            style={{
              position: 'absolute',
              left: lx,
              top: ly,
              transform: 'translate(-50%, -50%)',
              width: 80,
              textAlign: 'center',
              cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 9.5,
              letterSpacing: '0.05em',
              lineHeight: 1.2,
              textTransform: 'uppercase',
              color: isActive ? color : 'rgba(245,245,245,0.45)',
              textShadow: isActive ? `0 0 8px ${color}` : 'none',
              transition: 'color 0.25s, text-shadow 0.25s',
              userSelect: 'none',
              zIndex: 10,
            }}
          >
            {label}
          </div>
        )
      })}
      {/* Center */}
      <div
        style={{
          position: 'absolute',
          left: CX - R_CENTER,
          top: CY - R_CENTER,
          width: R_CENTER * 2,
          height: R_CENTER * 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 900,
          fontSize: 44,
          color,
          textShadow: `0 0 20px ${color}`,
          lineHeight: 1,
        }}>{stepNum}</div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 9,
          letterSpacing: '0.1em',
          color: 'rgba(245,245,245,0.5)',
          textTransform: 'uppercase',
          marginTop: 2,
        }}>{centerLabel}</div>
      </div>
      {/* Prev / Next arrows — invisible hitboxes over arrow PNG positions */}
      <div
        onClick={() => onChange((activeIndex - 1 + n) % n)}
        style={{ position: 'absolute', left: 16, top: CY - 38, width: 60, height: 76, cursor: 'pointer', zIndex: 20 }}
      />
      <div
        onClick={() => onChange((activeIndex + 1) % n)}
        style={{ position: 'absolute', right: 16, top: CY - 38, width: 60, height: 76, cursor: 'pointer', zIndex: 20 }}
      />
    </div>
  )
}

/* ── Italy map (Leaflet) ──────────────────────────────────────────── */
function ItalyMap({ localita, setLocalita }) {
  const mapRef = useRef(null)
  const leafletRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (leafletRef.current || !mapRef.current) return
    import('leaflet').then(L => {
      import('leaflet/dist/leaflet.css').catch(() => {})
      const map = L.map(mapRef.current, {
        center: [42.5, 12.5], zoom: 5,
        zoomControl: false, attributionControl: false,
      })
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)
      map.on('click', e => {
        const { lat, lng } = e.latlng
        if (markerRef.current) markerRef.current.remove()
        const icon = L.divIcon({
          html: '<div style="width:12px;height:12px;background:#ffb000;border-radius:50%;box-shadow:0 0 10px #ffb000;border:2px solid #fff"></div>',
          className: '', iconAnchor: [6, 6],
        })
        markerRef.current = L.marker([lat, lng], { icon }).addTo(map)
        setLocalita(`${lat.toFixed(4)}, ${lng.toFixed(4)}`)
      })
      leafletRef.current = map
    })
    return () => { if (leafletRef.current) { leafletRef.current.remove(); leafletRef.current = null } }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden' }} />
      {localita && (
        <div style={{
          position: 'absolute', bottom: 4, left: 4, right: 4,
          background: 'rgba(5,8,13,0.85)',
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
          fontSize: 9, color: '#ffb000', letterSpacing: '0.06em',
          padding: '2px 5px', borderRadius: 2, textAlign: 'center',
        }}>{localita}</div>
      )}
    </div>
  )
}

/* ── HUD input overlay ───────────────────────────────────────────── */
function HudInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', height: '100%',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#f5f5f5',
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        fontSize: '1.1em',
        letterSpacing: '0.06em',
        caretColor: '#ffb000',
        padding: '0 12px',
      }}
    />
  )
}

function HudSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', height: '100%',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#f5f5f5',
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        fontSize: '1em',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        padding: '0 12px',
        appearance: 'none',
        WebkitAppearance: 'none',
      }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value} style={{ background: '#071017', color: '#f5f5f5' }}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

/* ── Main component ──────────────────────────────────────────────── */
export default function HudScreen() {
  const [step1, setStep1] = useState(0)
  const [step2, setStep2] = useState(0)
  const [priority, setPriority] = useState('breve')
  const [sopralluogo, setSopralluogo] = useState(true)
  const [localita, setLocalita] = useState('')
  const [indirizzo, setIndirizzo] = useState('')
  const [descrizione, setDescrizione] = useState('')
  const [condizioni, setCondizioni] = useState('')
  const [nome, setNome] = useState('')
  const [azienda, setAzienda] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFileChange = e => {
    setFiles(prev => [...prev, ...Array.from(e.target.files || [])])
    e.target.value = ''
  }

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { error } = await supabase.from('richieste').insert({
        tipo_intervento: STEP1_ITEMS[step1],
        settore:         STEP2_ITEMS[step2],
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
      setSubmitError(err.message || "Errore durante l'invio. Riprova.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh', background: '#05080d',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 24,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg,#005a2b,#9cff00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(156,255,0,0.5)', fontSize: 36,
        }}>✓</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 32, color: '#9cff00', letterSpacing: '0.1em' }}>
            RICHIESTA INVIATA
          </div>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 14, color: '#9A9A9A', marginTop: 8 }}>
            Il team Palmisano ti risponderà in pochi minuti.
          </div>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            setLocalita(''); setIndirizzo(''); setDescrizione(''); setCondizioni('')
            setNome(''); setAzienda(''); setTelefono(''); setEmail(''); setFiles([])
          }}
          style={{
            background: 'linear-gradient(135deg,#a07000,#ffb000)',
            border: 'none', borderRadius: 6, padding: '12px 32px',
            fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14,
            color: '#fff', letterSpacing: '0.08em', cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255,176,0,0.4)',
          }}
        >NUOVA RICHIESTA</button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#05080d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 16:9 canvas */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1536,
        aspectRatio: '16 / 9',
        background: '#05080d',
        overflow: 'hidden',
      }}>

        {/* ── STATIC PNG LAYERS ─────────────────────────────────── */}

        {/* Navigation tabs top */}
        <img src={`${A}navigation_tabs_top.png`} alt="" draggable={false}
          style={{ ...pos([15, 35, 1305, 125]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Badge top right */}
        <img src={`${A}badge_top_right.png`} alt="" draggable={false}
          style={{ ...pos([1330, 35, 1770, 135]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Active tab orange (Step 1) */}
        <img src={`${A}tab_active_orange.png`} alt="" draggable={false}
          style={{ ...pos([20, 145, 260, 210]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Active tab green (Step 2) */}
        <img src={`${A}tab_active_green.png`} alt="" draggable={false}
          style={{ ...pos([20, 225, 260, 290]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Inactive tab (Step 3+) */}
        <img src={`${A}tab_inactive.png`} alt="" draggable={false}
          style={{ ...pos([20, 335, 260, 400]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Arrow left */}
        <img src={`${A}arrow_left.png`} alt="" draggable={false}
          style={{ ...pos([50, 430, 110, 505]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Arrow right */}
        <img src={`${A}arrow_right.png`} alt="" draggable={false}
          style={{ ...pos([130, 430, 190, 505]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Radial menu orange background */}
        <img src={`${A}radial_menu_orange.png`} alt="" draggable={false}
          style={{ ...pos([315, 150, 690, 455]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Radial menu green background */}
        <img src={`${A}radial_menu_green.png`} alt="" draggable={false}
          style={{ ...pos([700, 150, 1030, 455]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Map panel */}
        <img src={`${A}map_panel_italy.png`} alt="" draggable={false}
          style={{ ...pos([1045, 160, 1385, 455]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Status indicators */}
        <img src={`${A}status_red.png`} alt="" draggable={false}
          style={{ ...pos([1410, 205, 1495, 310]), objectFit: 'fill', pointerEvents: 'none',
            opacity: priority === 'urgente' ? 1 : 0.35,
            filter: priority === 'urgente' ? 'drop-shadow(0 0 8px #ff1a00)' : 'none',
            transition: 'opacity 0.2s, filter 0.2s',
          }} />
        <img src={`${A}status_orange.png`} alt="" draggable={false}
          style={{ ...pos([1510, 205, 1595, 310]), objectFit: 'fill', pointerEvents: 'none',
            opacity: priority === 'breve' ? 1 : 0.35,
            filter: priority === 'breve' ? 'drop-shadow(0 0 8px #ffb000)' : 'none',
            transition: 'opacity 0.2s, filter 0.2s',
          }} />
        <img src={`${A}status_green.png`} alt="" draggable={false}
          style={{ ...pos([1615, 205, 1705, 310]), objectFit: 'fill', pointerEvents: 'none',
            opacity: priority === 'programmabile' ? 1 : 0.35,
            filter: priority === 'programmabile' ? 'drop-shadow(0 0 8px #9cff00)' : 'none',
            transition: 'opacity 0.2s, filter 0.2s',
          }} />

        {/* Toggle switch */}
        <img src={`${A}toggle_switch.png`} alt="" draggable={false}
          style={{ ...pos([1410, 390, 1530, 445]), objectFit: 'fill', pointerEvents: 'none',
            filter: sopralluogo ? 'hue-rotate(88deg) saturate(1.2)' : 'none',
            transition: 'filter 0.2s',
          }} />

        {/* Panels */}
        <img src={`${A}panel_large.png`} alt="" draggable={false}
          style={{ ...pos([520, 495, 800, 625]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}panel_hex_texture.png`} alt="" draggable={false}
          style={{ ...pos([810, 500, 1015, 695]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}panel_small_left.png`} alt="" draggable={false}
          style={{ ...pos([520, 635, 665, 720]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}panel_small_right.png`} alt="" draggable={false}
          style={{ ...pos([670, 635, 800, 720]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Input frames */}
        <img src={`${A}input_select_1.png`} alt="" draggable={false}
          style={{ ...pos([1065, 520, 1350, 570]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}input_select_2.png`} alt="" draggable={false}
          style={{ ...pos([1065, 580, 1350, 630]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}input_select_3.png`} alt="" draggable={false}
          style={{ ...pos([1065, 640, 1350, 690]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}input_icon_user.png`} alt="" draggable={false}
          style={{ ...pos([1415, 510, 1755, 560]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}input_icon_company.png`} alt="" draggable={false}
          style={{ ...pos([1415, 560, 1755, 610]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}input_icon_phone.png`} alt="" draggable={false}
          style={{ ...pos([1415, 610, 1755, 660]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}input_icon_email.png`} alt="" draggable={false}
          style={{ ...pos([1415, 660, 1755, 710]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Circle buttons */}
        <img src={`${A}button_circle_blue.png`} alt="" draggable={false}
          style={{ ...pos([25, 560, 95, 635]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}button_circle_dark.png`} alt="" draggable={false}
          style={{ ...pos([135, 560, 205, 635]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}button_circle_orange.png`} alt="" draggable={false}
          style={{ ...pos([235, 560, 305, 635]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}button_circle_green.png`} alt="" draggable={false}
          style={{ ...pos([335, 560, 405, 635]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}button_circle_red.png`} alt="" draggable={false}
          style={{ ...pos([440, 560, 510, 635]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Icon rows */}
        <img src={`${A}icon_buttons_row.png`} alt="" draggable={false}
          style={{ ...pos([25, 700, 475, 780]), objectFit: 'fill', pointerEvents: 'none' }} />
        <img src={`${A}icon_set_bottom.png`} alt="" draggable={false}
          style={{ ...pos([20, 815, 700, 910]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* CTA button */}
        <img src={`${A}cta_button_main.png`} alt="" draggable={false}
          style={{ ...pos([860, 735, 1395, 890]), objectFit: 'fill', pointerEvents: 'none',
            filter: submitting ? 'brightness(0.6)' : 'none',
            transition: 'filter 0.2s',
          }} />

        {/* Color swatches */}
        <img src={`${A}color_swatches.png`} alt="" draggable={false}
          style={{ ...pos([1410, 755, 1755, 900]), objectFit: 'fill', pointerEvents: 'none' }} />

        {/* Textures */}
        <img src={`${A}texture_metal.png`} alt="" draggable={false}
          style={{ ...pos([180, 930, 360, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.5 }} />
        <img src={`${A}texture_hex.png`} alt="" draggable={false}
          style={{ ...pos([370, 930, 640, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.5 }} />
        <img src={`${A}texture_panel.png`} alt="" draggable={false}
          style={{ ...pos([650, 930, 900, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.5 }} />
        <img src={`${A}texture_warning.png`} alt="" draggable={false}
          style={{ ...pos([915, 930, 1170, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.5 }} />

        {/* Glows */}
        <img src={`${A}glow_orange.png`} alt="" draggable={false}
          style={{ ...pos([1190, 950, 1365, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.7 }} />
        <img src={`${A}glow_green.png`} alt="" draggable={false}
          style={{ ...pos([1400, 950, 1565, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.7 }} />
        <img src={`${A}glow_blue.png`} alt="" draggable={false}
          style={{ ...pos([1600, 950, 1770, 980]), objectFit: 'fill', pointerEvents: 'none', opacity: 0.7 }} />

        {/* ── INTERACTIVE OVERLAYS ──────────────────────────────── */}

        {/* Step 1 tab label */}
        <div style={{ ...pos([20, 145, 260, 210]), display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 800, fontSize: '1em', color: '#ffb000', letterSpacing: '0.12em', textTransform: 'uppercase', textShadow: '0 0 10px #ffb000' }}>
            TIPO INTERVENTO
          </span>
        </div>

        {/* Step 2 tab label */}
        <div style={{ ...pos([20, 225, 260, 290]), display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 800, fontSize: '1em', color: '#9cff00', letterSpacing: '0.12em', textTransform: 'uppercase', textShadow: '0 0 10px #9cff00' }}>
            SETTORE
          </span>
        </div>

        {/* Step 3 tab label */}
        <div style={{ ...pos([20, 335, 260, 400]), display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.9em', color: 'rgba(245,245,245,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            DATI & CONTATTI
          </span>
        </div>

        {/* Radial selector — Step 1 (orange) */}
        <div style={{
          ...pos([315, 150, 690, 455]),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 6,
        }}>
          <div style={{
            transform: `scale(${(690 - 315) / W * (H / (455 - 150)) * 0.88})`,
            transformOrigin: 'center center',
          }}>
            <RadialSelector
              items={STEP1_ITEMS}
              activeIndex={step1}
              onChange={setStep1}
              theme="orange"
              stepNum="1"
              centerLabel="INTERVENTO"
            />
          </div>
        </div>

        {/* Radial selector — Step 2 (green) */}
        <div style={{
          ...pos([700, 150, 1030, 455]),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 6,
        }}>
          <div style={{
            transform: `scale(${(1030 - 700) / W * (H / (455 - 150)) * 0.88})`,
            transformOrigin: 'center center',
          }}>
            <RadialSelector
              items={STEP2_ITEMS}
              activeIndex={step2}
              onChange={setStep2}
              theme="green"
              stepNum="2"
              centerLabel="SETTORE"
            />
          </div>
        </div>

        {/* Italy map */}
        <div style={{ ...pos([1050, 165, 1380, 450]), zIndex: 6, overflow: 'hidden', borderRadius: 4 }}>
          <ItalyMap localita={localita} setLocalita={setLocalita} />
        </div>

        {/* Priority buttons — red, orange, green status */}
        <div
          onClick={() => setPriority('urgente')}
          style={{ ...pos([1410, 205, 1495, 310]), cursor: 'pointer', zIndex: 10 }}
        />
        <div
          onClick={() => setPriority('breve')}
          style={{ ...pos([1510, 205, 1595, 310]), cursor: 'pointer', zIndex: 10 }}
        />
        <div
          onClick={() => setPriority('programmabile')}
          style={{ ...pos([1615, 205, 1705, 310]), cursor: 'pointer', zIndex: 10 }}
        />

        {/* Priority labels */}
        <div style={{ ...pos([1405, 310, 1500, 355]), display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.65em', color: priority === 'urgente' ? '#ff1a00' : 'rgba(245,245,245,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>URGENTE</span>
        </div>
        <div style={{ ...pos([1505, 310, 1600, 355]), display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.65em', color: priority === 'breve' ? '#ffb000' : 'rgba(245,245,245,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>BREVE<br/>TERMINE</span>
        </div>
        <div style={{ ...pos([1610, 310, 1710, 355]), display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.65em', color: priority === 'programmabile' ? '#9cff00' : 'rgba(245,245,245,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>PROGRAM-<br/>MABILE</span>
        </div>

        {/* Sopralluogo toggle hit area + label */}
        <div
          onClick={() => setSopralluogo(v => !v)}
          style={{ ...pos([1410, 388, 1540, 448]), cursor: 'pointer', zIndex: 10 }}
        />
        <div style={{ ...pos([1545, 388, 1760, 448]), display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 5 }}>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.8em', color: sopralluogo ? '#9cff00' : 'rgba(245,245,245,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', textShadow: sopralluogo ? '0 0 8px #9cff00' : 'none', transition: 'color 0.2s' }}>
            SOPRALLUOGO: {sopralluogo ? 'SÌ' : 'NO'}
          </span>
        </div>

        {/* Input overlays — location row */}
        <div style={{ ...pos([1065, 520, 1350, 570]), zIndex: 8 }}>
          <HudInput value={localita} onChange={setLocalita} placeholder="Località" />
        </div>
        <div style={{ ...pos([1065, 580, 1350, 630]), zIndex: 8 }}>
          <HudInput value={indirizzo} onChange={setIndirizzo} placeholder="Indirizzo / Sito" />
        </div>
        <div style={{ ...pos([1065, 640, 1350, 690]), zIndex: 8 }}>
          <HudSelect
            value={priority}
            onChange={setPriority}
            options={[
              { value: 'urgente', label: 'URGENTE' },
              { value: 'breve', label: 'BREVE TERMINE' },
              { value: 'programmabile', label: 'PROGRAMMABILE' },
            ]}
          />
        </div>

        {/* Input overlays — contacts */}
        <div style={{ ...pos([1560, 510, 1755, 560]), zIndex: 8 }}>
          <HudInput value={nome} onChange={setNome} placeholder="Nome Cognome" />
        </div>
        <div style={{ ...pos([1560, 560, 1755, 610]), zIndex: 8 }}>
          <HudInput value={azienda} onChange={setAzienda} placeholder="Azienda" />
        </div>
        <div style={{ ...pos([1560, 610, 1755, 660]), zIndex: 8 }}>
          <HudInput value={telefono} onChange={setTelefono} placeholder="Telefono" type="tel" />
        </div>
        <div style={{ ...pos([1560, 660, 1755, 710]), zIndex: 8 }}>
          <HudInput value={email} onChange={setEmail} placeholder="Email" type="email" />
        </div>

        {/* Descrizione textarea (panel_large area) */}
        <div style={{ ...pos([522, 497, 798, 623]), zIndex: 8 }}>
          <textarea
            value={descrizione}
            onChange={e => setDescrizione(e.target.value.slice(0, 400))}
            placeholder="Descrizione intervento..."
            style={{
              width: '100%', height: '100%',
              background: 'transparent',
              border: 'none', outline: 'none', resize: 'none',
              color: '#f5f5f5',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: '0.85em',
              letterSpacing: '0.04em',
              caretColor: '#ffb000',
              padding: '8px 12px',
            }}
          />
        </div>

        {/* Condizioni / note (panel_hex area) */}
        <div style={{ ...pos([812, 502, 1013, 693]), zIndex: 8 }}>
          <textarea
            value={condizioni}
            onChange={e => setCondizioni(e.target.value.slice(0, 400))}
            placeholder="Condizioni operative..."
            style={{
              width: '100%', height: '100%',
              background: 'transparent',
              border: 'none', outline: 'none', resize: 'none',
              color: '#f5f5f5',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: '0.85em',
              letterSpacing: '0.04em',
              caretColor: '#9cff00',
              padding: '8px 12px',
            }}
          />
        </div>

        {/* File upload buttons (circle area row) */}
        <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileChange} style={{ display: 'none' }} />
        {[
          { box: [25, 560, 95, 635] },
          { box: [135, 560, 205, 635] },
          { box: [235, 560, 305, 635] },
          { box: [335, 560, 405, 635] },
          { box: [440, 560, 510, 635] },
        ].map(({ box }, i) => (
          <div
            key={i}
            onClick={() => fileInputRef.current?.click()}
            style={{ ...pos(box), cursor: 'pointer', zIndex: 10 }}
          />
        ))}

        {/* Files count indicator */}
        {files.length > 0 && (
          <div style={{ ...pos([25, 635, 510, 700]), display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.85em', color: '#00cfff', letterSpacing: '0.08em', textShadow: '0 0 8px #00cfff' }}>
              {files.length} FILE ALLEGATI
            </span>
          </div>
        )}

        {/* CTA button hit area */}
        <div
          onClick={handleSubmit}
          style={{
            ...pos([860, 735, 1395, 890]),
            cursor: submitting ? 'wait' : 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: "'Rajdhani',sans-serif",
            fontWeight: 900,
            fontSize: '2em',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: submitting ? 'rgba(255,176,0,0.5)' : '#ffb000',
            textShadow: submitting ? 'none' : '0 0 20px #ffb000, 0 0 40px rgba(255,176,0,0.4)',
            transition: 'color 0.2s, text-shadow 0.2s',
            userSelect: 'none',
          }}>
            {submitting ? 'INVIO IN CORSO...' : 'ATTIVA ONE CALL'}
          </span>
        </div>

        {/* Error message */}
        {submitError && (
          <div style={{
            ...pos([860, 895, 1395, 940]),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 15, pointerEvents: 'none',
          }}>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: '0.85em', color: '#ff1a00', letterSpacing: '0.06em' }}>
              {submitError}
            </span>
          </div>
        )}

        {/* Dashboard link */}
        <div
          onClick={() => navigate('/dashboard')}
          style={{ ...pos([1330, 35, 1770, 135]), cursor: 'pointer', zIndex: 10 }}
        />

        {/* Navigation to instructions */}
        <div
          onClick={() => navigate('/istruzioni')}
          style={{ ...pos([15, 35, 200, 125]), cursor: 'pointer', zIndex: 10 }}
        />

      </div>
    </div>
  )
}
