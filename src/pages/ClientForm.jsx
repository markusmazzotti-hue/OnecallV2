import React, { useState, useRef } from 'react'
import StepNav from '../components/StepNav.jsx'
import RotarySelector from '../components/RotarySelector.jsx'
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
  background: '#111111',
  border: '1px solid #1E1E1E',
  borderRadius: 6,
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const inputStyle = {
  background: '#0A0A0A',
  border: '1px solid #2A2A2A',
  borderRadius: 4,
  color: '#fff',
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
  color: '#9A9A9A',
  textTransform: 'uppercase',
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
            color: focused ? '#FF8C00' : '#555', fontSize: 14, transition: 'color 0.2s',
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
      <div style={{ textAlign: 'right', fontSize: 10, color: '#555', marginTop: 3 }}>
        {value.length} / {max}
      </div>
    </div>
  )
}

function UploadBtn({ icon, label, optional, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        background: hover ? '#1A1A1A' : '#0E0E0E',
        border: `1px solid ${hover ? '#FF8C00' : '#2A2A2A'}`,
        borderRadius: 6,
        padding: '12px 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: hover ? '0 0 10px rgba(255,140,0,0.2)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ fontSize: 20, color: hover ? '#FF8C00' : '#555' }}>{icon}</span>
      <span style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: '0.06em',
        color: hover ? '#FF8C00' : '#777',
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>{label}</span>
      {optional && (
        <span style={{ fontSize: 9, color: '#555', fontFamily: "'Inter', sans-serif" }}>(opzionale)</span>
      )}
    </button>
  )
}

export default function ClientForm() {
  const [step1, setStep1] = useState(1)
  const [step2, setStep2] = useState(0)
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

  const navigate = useNavigate()

  const priorities = [
    { id: 'urgente', label: 'URGENTE', color: '#FF3333', icon: '⚠' },
    { id: 'breve', label: 'BREVE TERMINE', color: '#FF8C00', icon: '⏱' },
    { id: 'programmabile', label: 'PROGRAMMABILE', color: '#00CC66', icon: '📅' },
  ]

  const summaryItems = [
    { icon: '⚙', label: 'TIPO INTERVENTO', value: STEP1_ITEMS[step1] },
    { icon: '🏭', label: 'SETTORE', value: STEP2_ITEMS[step2] },
    { icon: '📍', label: 'DOVE E QUANDO', value: localita || 'Da definire' },
    { icon: '📷', label: 'FOTO / VIDEO', value: files.length > 0 ? `${files.length} file` : 'Da caricare' },
    { icon: '📝', label: 'DESCRIZIONE', value: descrizione || 'Da definire' },
    { icon: '👤', label: 'CONTATTI', value: nome || 'Da definire' },
  ]

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
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#9A9A9A', marginTop: 8 }}>
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
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: '#0A0A0A',
        borderBottom: '1px solid #1A1A1A',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: '#fff',
              letterSpacing: '0.04em',
            }}>PALMISANO</span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: '#FF8C00',
              letterSpacing: '0.04em',
            }}>ONE CALL™</span>
          </div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            color: '#555',
            letterSpacing: '0.12em',
          }}>DEMOLIZIONI & TAGLIO TERMICO</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/istruzioni')}
            style={{
              background: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: 4,
              color: '#9A9A9A',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.08em',
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C00'; e.currentTarget.style.color = '#FF8C00' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9A9A9A' }}
          >ISTRUZIONI D'USO</button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: 4,
              color: '#9A9A9A',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.08em',
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C00'; e.currentTarget.style.color = '#FF8C00' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9A9A9A' }}
          >DASHBOARD ADMIN</button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#0E0E0E',
            border: '1px solid #1E1E1E',
            borderRadius: 4,
            padding: '8px 12px',
          }}>
            <span style={{ fontSize: 18 }}>🛡</span>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9A9A9A', lineHeight: 1.4 }}>
              I tuoi dati sono al sicuro.<br />
              Le richieste vengono gestite con priorità tecnica.
            </div>
          </div>
        </div>
      </header>

      <StepNav activeSteps={[1, 2]} />

      {/* Main grid */}
      <main style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 380px', gap: 10 }}>

          {/* Step 1 */}
          <div style={{ ...card, alignItems: 'center' }}>
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: 'linear-gradient(135deg, #CC7000, #FF8C00)',
                borderRadius: '50%',
                width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff',
                boxShadow: '0 0 8px rgba(255,140,0,0.5)',
              }}>1</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13,
                letterSpacing: '0.1em', color: '#FF8C00', textTransform: 'uppercase',
              }}>SELEZIONA IL TIPO DI INTERVENTO</span>
            </div>
            <RotarySelector
              items={STEP1_ITEMS}
              activeIndex={step1}
              onChange={setStep1}
              theme="orange"
              stepNum="1"
              centerLabel="TIPO INTERVENTO"
              centerSub="Seleziona il servizio richiesto"
            />
            <p style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
              Ruota la selezione e clicca sulla voce desiderata.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ ...card, alignItems: 'center' }}>
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: 'linear-gradient(135deg, #008040, #00E676)',
                borderRadius: '50%',
                width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#000',
                boxShadow: '0 0 8px rgba(0,230,118,0.5)',
              }}>2</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13,
                letterSpacing: '0.1em', color: '#00E676', textTransform: 'uppercase',
              }}>SELEZIONA IL SETTORE DI RIFERIMENTO</span>
            </div>
            <RotarySelector
              items={STEP2_ITEMS}
              activeIndex={step2}
              onChange={setStep2}
              theme="green"
              stepNum="2"
              centerLabel="SETTORE"
              centerSub="Seleziona il settore di riferimento"
            />
            <p style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
              Ruota la selezione e clicca sul settore corrispondente.
            </p>
          </div>

          {/* Step 3 */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#fff' }}>
                STEP <span style={{ color: '#FF8C00' }}>3</span> — DOVE SI TROVA L'INTERVENTO E QUANDO È PREVISTO?
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                          padding: '8px 4px',
                          borderRadius: 6,
                          border: `1px solid ${priority === p.id ? p.color : '#2A2A2A'}`,
                          background: priority === p.id ? `rgba(${p.color === '#FF3333' ? '255,51,51' : p.color === '#FF8C00' ? '255,140,0' : '0,204,102'},0.12)` : '#0A0A0A',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                          transition: 'all 0.2s',
                          boxShadow: priority === p.id ? `0 0 8px ${p.color}44` : 'none',
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{p.icon}</span>
                        <span style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: '0.06em',
                          color: priority === p.id ? p.color : '#555',
                          textAlign: 'center',
                          lineHeight: 1.2,
                        }}>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ ...labelStyle, fontSize: 10 }}>RICHIEDO SOPRALLUOGO OPERATIVO <span style={{ color: '#555' }}>(FACOLTATIVO)</span></span>
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

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ItalyMapSVG />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 380px', gap: 10 }}>

          {/* Step 4 */}
          <div style={card}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#fff' }}>
              STEP <span style={{ color: '#FF8C00' }}>4</span> — CARICA FOTO, VIDEO E DESCRIZIONE AUDIO
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div style={{ display: 'flex', gap: 6 }}>
              <UploadBtn icon="📷" label="SCATTA FOTO" onClick={() => fileInputRef.current?.click()} />
              <UploadBtn icon="🖼" label="CARICA FOTO" onClick={() => fileInputRef.current?.click()} />
              <UploadBtn icon="🎥" label="CARICA VIDEO" onClick={() => fileInputRef.current?.click()} />
              <UploadBtn icon="🎙" label="AUDIO" onClick={() => fileInputRef.current?.click()} />
              <UploadBtn icon="📎" label="ALLEGATI" optional onClick={() => fileInputRef.current?.click()} />
            </div>
            {files.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {files.map((f, i) => (
                  <span key={i} style={{
                    background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3,
                    padding: '2px 8px', fontSize: 10, color: '#9A9A9A', fontFamily: "'Inter', sans-serif",
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    {f.name.length > 20 ? f.name.slice(0, 18) + '…' : f.name}
                    <span
                      style={{ cursor: 'pointer', color: '#555', marginLeft: 2 }}
                      onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                    >×</span>
                  </span>
                ))}
              </div>
            )}
            <p style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", margin: 0 }}>
              Puoi caricare più file alla volta. Formati supportati: JPG, PNG, MP4, MP3 (max 100MB)
            </p>
          </div>

          {/* Step 5 */}
          <div style={{ ...card }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#fff' }}>
              STEP <span style={{ color: '#FF8C00' }}>5</span> — DESCRIVI LA RICHIESTA
            </div>
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
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#fff' }}>
              STEP <span style={{ color: '#FF8C00' }}>6</span> — I TUOI CONTATTI
            </div>
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
        background: '#0A0A0A',
        borderTop: '1px solid #1A1A1A',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
      }}>
        <div style={{ minWidth: 180 }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: '#FF8C00', letterSpacing: '0.08em' }}>
            STEP 7 — RIEPILOGO RICHIESTA
          </div>
          <div style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
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
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.08em', color: '#555', textAlign: 'center' }}>{s.label}</span>
              <span style={{ fontSize: 10, color: '#9A9A9A', fontFamily: "'Inter', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>{s.value.length > 20 ? s.value.slice(0, 18) + '…' : s.value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          {submitError && (
            <div style={{ fontSize: 10, color: '#FF3333', fontFamily: "'Inter',sans-serif", maxWidth: 220, textAlign: 'right' }}>
              {submitError}
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              background: submitting ? '#333' : 'linear-gradient(135deg, #CC6600, #FF8C00, #FFA500)',
              border: 'none',
              borderRadius: 6,
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: submitting ? 'not-allowed' : 'pointer',
              boxShadow: submitting ? 'none' : '0 0 24px rgba(255,140,0,0.5), 0 0 48px rgba(255,140,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
              opacity: submitting ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (!submitting) { e.currentTarget.style.boxShadow = '0 0 36px rgba(255,140,0,0.7), 0 0 72px rgba(255,140,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1.02)' } }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(255,140,0,0.5), 0 0 48px rgba(255,140,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.06em', lineHeight: 1 }}>
                {submitting ? 'INVIO IN CORSO...' : 'ATTIVA ONE CALL™'}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                Invia richiesta tecnica a Palmisano Demolizioni & Taglio Termico
              </div>
            </div>
            <div style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff', flexShrink: 0 }}>
              {submitting ? '⏳' : '→'}
            </div>
          </button>
        </div>
      </footer>

      {/* Security footer */}
      <div style={{
        background: '#050505',
        borderTop: '1px solid #141414',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 12 }}>🛡</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#555' }}>
          I tuoi dati sono al sicuro. Le richieste vengono gestite con priorità tecnica.
        </span>
      </div>
    </div>
  )
}
