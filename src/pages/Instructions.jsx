import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RotarySelector from '../components/RotarySelector.jsx'
import StepNav from '../components/StepNav.jsx'
import Logo from '../components/Logo.jsx'

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

const STEP_DESCRIPTIONS = [
  { num: 1, title: 'TIPO INTERVENTO', desc: 'Seleziona uno o più interventi richiesti.', color: '#FF8C00' },
  { num: 2, title: 'SETTORE', desc: 'Scegli il settore di riferimento.', color: '#00E676' },
  { num: 3, title: 'DOVE E QUANDO', desc: "Indica dove si trova l'intervento e quando è previsto.", color: '#9A9A9A' },
  { num: 4, title: 'FOTO, VIDEO E AUDIO', desc: "Carica tutto il materiale utile per valutare l'intervento.", color: '#9A9A9A' },
  { num: 5, title: 'DESCRIZIONE', desc: 'Scrivi cosa vuoi ottenere e le condizioni particolari.', color: '#9A9A9A' },
  { num: 6, title: 'CONTATTI', desc: 'Inserisci i tuoi dati per essere ricontattato.', color: '#9A9A9A' },
  { num: 7, title: 'RIEPILOGO', desc: 'Controlla i dati inseriti e invia la richiesta.', color: '#FF8C00' },
]

const FOOTER_BADGES = [
  { icon: '⚡', label: 'ACCESSO IMMEDIATO', sub: 'Scansiona e attiva' },
  { icon: '🔓', label: 'NESSUNA REGISTRAZIONE', sub: 'Nessun modulo richiesto' },
  { icon: '⚙', label: 'RISPOSTA TECNICA', sub: 'Entro pochi minuti' },
  { icon: '👥', label: 'TEAM OPERATIVO', sub: 'Specialisti al tuo fianco' },
  { icon: '🔧', label: 'INTERVENTI SU MISURA', sub: 'Soluzioni concrete' },
  { icon: '🕐', label: 'DISPONIBILITÀ 24/7', sub: 'Sempre operativi' },
]

const PRIORITIES = [
  { id: 'urgente', label: 'URGENTE', color: '#FF3333' },
  { id: 'breve', label: 'BREVE TERMINE', color: '#FF8C00' },
  { id: 'programmabile', label: 'PROGRAMMABILE', color: '#00CC66' },
]

const SUMMARY_ITEMS = [
  { icon: '⚙', label: 'TIPO INTERVENTO' },
  { icon: '🏭', label: 'SETTORE' },
  { icon: '📍', label: 'DOVE E QUANDO' },
  { icon: '📷', label: 'FOTO / VIDEO' },
  { icon: '📝', label: 'DESCRIZIONE' },
  { icon: '👤', label: 'CONTATTI' },
]

const card = {
  background: '#111111',
  border: '1px solid #1E1E1E',
  borderRadius: 6,
  overflow: 'hidden',
}

const labelStyle = {
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 700,
  fontSize: 10,
  letterSpacing: '0.1em',
  color: '#9A9A9A',
  textTransform: 'uppercase',
}

const inputStyle = {
  background: '#0A0A0A',
  border: '1px solid #2A2A2A',
  borderRadius: 4,
  color: '#777',
  padding: '8px 12px',
  fontFamily: "'Inter', sans-serif",
  fontSize: 12,
  width: '100%',
  outline: 'none',
}

export default function Instructions() {
  const navigate = useNavigate()
  const [step1Index, setStep1Index] = useState(1)
  const [step2Index, setStep2Index] = useState(0)
  const [priority, setPriority] = useState('breve')
  const [sopralluogo, setSopralluogo] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column' }}>

      {/* ── HEADER ── */}
      <header style={{
        background: '#0A0A0A',
        borderBottom: '1px solid #1A1A1A',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        minHeight: 72,
      }}>
        {/* Left: logo */}
        <Logo size={29} />

        {/* Center: big title */}
        <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 46,
            letterSpacing: '0.1em',
            color: '#fff',
            lineHeight: 1,
            margin: 0,
            textTransform: 'uppercase',
          }}>ISTRUZIONI D'USO</h1>
          <div style={{
            width: 280,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #FF8C00, transparent)',
            margin: '5px auto',
          }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#555', margin: 0 }}>
            Invia la tua richiesta tecnica in pochi passaggi, in modo semplice e chiaro.
          </p>
        </div>

        {/* Right: ONE CALL badge + shield */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: '#0E0E0E',
            border: '1px solid rgba(255,140,0,0.3)',
            borderRadius: 6,
            padding: '8px 14px',
            textAlign: 'right',
          }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: '#FF8C00', letterSpacing: '0.1em' }}>ONE CALL™</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#555' }}>Accesso diretto per richieste tecniche</div>
          </div>
          <div style={{
            width: 44, height: 44,
            background: 'rgba(255,140,0,0.06)',
            border: '1px solid rgba(255,140,0,0.3)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>🛡</div>
        </div>
      </header>

      {/* ── STEP NAV ── */}
      <StepNav activeSteps={[1, 2]} />

      {/* ── MAIN LAYOUT ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr', overflow: 'hidden' }}>

        {/* LEFT SIDEBAR */}
        <div style={{
          background: '#0C0C0C',
          borderRight: '1px solid #1A1A1A',
          padding: '14px 14px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.1em',
            color: '#FF8C00',
            marginBottom: 14,
            lineHeight: 1.4,
            textTransform: 'uppercase',
          }}>I 7 PASSAGGI<br />PER INVIARE LA RICHIESTA</div>

          {STEP_DESCRIPTIONS.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 10,
              padding: '9px 0',
              borderBottom: i < STEP_DESCRIPTIONS.length - 1 ? '1px solid #161616' : 'none',
            }}>
              <div style={{
                width: 22, height: 22,
                borderRadius: '50%',
                background: s.color === '#FF8C00'
                  ? 'linear-gradient(135deg,#CC7000,#FF8C00)'
                  : s.color === '#00E676'
                  ? 'linear-gradient(135deg,#008040,#00E676)'
                  : '#1A1A1A',
                border: s.color === '#9A9A9A' ? '1px solid #2A2A2A' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: 11,
                color: s.color === '#9A9A9A' ? '#555' : s.color === '#00E676' ? '#000' : '#fff',
                flexShrink: 0, marginTop: 1,
                boxShadow: s.color === '#FF8C00'
                  ? '0 0 6px rgba(255,140,0,0.4)'
                  : s.color === '#00E676'
                  ? '0 0 6px rgba(0,230,118,0.4)'
                  : 'none',
              }}>{s.num}</div>
              <div>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700, fontSize: 11,
                  letterSpacing: '0.08em',
                  color: s.color === '#FF8C00' ? '#FFA500' : s.color === '#00E676' ? '#00E676' : '#666',
                  marginBottom: 2,
                }}>{s.title}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#3A3A3A', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </div>
          ))}

          {/* Bottom hint */}
          <div style={{ marginTop: 'auto', paddingTop: 14 }}>
            <div style={{
              background: 'rgba(255,140,0,0.04)',
              border: '1px solid rgba(255,140,0,0.15)',
              borderRadius: 6,
              padding: '12px',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 28, height: 28,
                border: '1px solid rgba(255,140,0,0.3)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: '#FF8C00', flexShrink: 0,
              }}>→</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#555', lineHeight: 1.5 }}>
                Se tutto è corretto, clicca su{' '}
                <span style={{ color: '#FF8C00', fontWeight: 600 }}>"ATTIVA ONE CALL™"</span>{' '}
                e invia la richiesta.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>

          {/* ROW 1 – Rotary Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

            {/* Step 1 */}
            <div style={{ ...card, padding: '12px 14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', marginBottom: 8 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#CC7000,#FF8C00)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff',
                  boxShadow: '0 0 8px rgba(255,140,0,0.5)',
                }}>1</div>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#FF8C00' }}>
                  SELEZIONA IL TIPO DI INTERVENTO
                </span>
              </div>
              <RotarySelector
                items={STEP1_ITEMS}
                activeIndex={step1Index}
                onChange={setStep1Index}
                theme="orange"
                stepNum="1"
                centerLabel="TIPO INTERVENTO"
                centerSub="Seleziona il servizio richiesto"
              />
            </div>

            {/* Step 2 */}
            <div style={{ ...card, padding: '12px 14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', marginBottom: 8 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#008040,#00E676)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#000',
                  boxShadow: '0 0 8px rgba(0,230,118,0.5)',
                }}>2</div>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#00E676' }}>
                  SELEZIONA IL SETTORE DI RIFERIMENTO
                </span>
              </div>
              <RotarySelector
                items={STEP2_ITEMS}
                activeIndex={step2Index}
                onChange={setStep2Index}
                theme="green"
                stepNum="2"
                centerLabel="SETTORE"
                centerSub="Seleziona il settore di riferimento"
              />
            </div>
          </div>

          {/* ROW 2 – Steps 3, 4, 5 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>

            {/* Step 3 */}
            <div style={{ ...card, padding: '12px 14px' }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: '#fff', marginBottom: 10 }}>
                <span style={{ color: '#FF8C00' }}>3.</span> DOVE SI TROVA L'INTERVENTO E QUANDO È PREVISTO?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 4 }}>LOCALITÀ</div>
                  <input style={inputStyle} placeholder="Es. Taranto, Genova, ecc." readOnly />
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 4 }}>INDIRIZZO (FACOLTATIVO)</div>
                  <input style={inputStyle} placeholder="Via, n°, stabilimento, ecc." readOnly />
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 6 }}>TEMPISTICA INDICATIVA</div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {PRIORITIES.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setPriority(p.id)}
                        style={{
                          flex: 1, padding: '7px 4px', borderRadius: 5,
                          border: `1px solid ${priority === p.id ? p.color : '#2A2A2A'}`,
                          background: priority === p.id
                            ? `rgba(${p.color === '#FF3333' ? '255,51,51' : p.color === '#FF8C00' ? '255,140,0' : '0,204,102'},0.1)`
                            : '#0A0A0A',
                          cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                          boxShadow: priority === p.id ? `0 0 8px ${p.color}44` : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ fontSize: 14, color: priority === p.id ? p.color : '#333' }}>
                          {p.id === 'urgente' ? '⚠' : p.id === 'breve' ? '⏱' : '📅'}
                        </span>
                        <span style={{
                          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 8,
                          letterSpacing: '0.05em', color: priority === p.id ? p.color : '#3A3A3A',
                          textAlign: 'center', lineHeight: 1.2,
                        }}>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ ...labelStyle, fontSize: 9 }}>RICHIEDO SOPRALLUOGO OPERATIVO <span style={{ color: '#333' }}>(FACOLTATIVO)</span></span>
                  <div
                    onClick={() => setSopralluogo(!sopralluogo)}
                    style={{
                      width: 36, height: 20,
                      background: sopralluogo ? '#00CC66' : '#1E1E1E',
                      borderRadius: 10, position: 'relative',
                      cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
                      boxShadow: sopralluogo ? '0 0 6px rgba(0,204,102,0.4)' : 'none',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 2,
                      left: sopralluogo ? 18 : 2,
                      width: 16, height: 16,
                      background: '#fff', borderRadius: '50%', transition: 'left 0.2s',
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{ ...card, padding: '12px 14px' }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: '#fff', marginBottom: 10 }}>
                <span style={{ color: '#FF8C00' }}>4.</span> CARICA FOTO, VIDEO E DESCRIZIONE AUDIO
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {[
                  { icon: '📷', label: 'SCATTA\nFOTO' },
                  { icon: '🖼', label: 'CARICA\nFOTO' },
                  { icon: '🎥', label: 'CARICA\nVIDEO' },
                  { icon: '🎙', label: 'AUDIO' },
                  { icon: '📎', label: 'ALLEGATI\n(OPZIONALE)' },
                ].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      flex: 1,
                      background: '#0E0E0E',
                      border: '1px solid #2A2A2A',
                      borderRadius: 5,
                      padding: '10px 4px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C00'; e.currentTarget.style.background = '#181818' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.background = '#0E0E0E' }}
                  >
                    <span style={{ fontSize: 18, color: '#555' }}>{btn.icon}</span>
                    <span style={{
                      fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9,
                      letterSpacing: '0.05em', color: '#555', textAlign: 'center', lineHeight: 1.2,
                      whiteSpace: 'pre-line',
                    }}>{btn.label}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 10, color: '#3A3A3A', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                Puoi caricare più file alla volta.<br />
                Formati supportati: JPG, PNG, MP4, MP3, PDF (max 100MB)
              </div>
            </div>

            {/* Step 5 */}
            <div style={{ ...card, padding: '12px 14px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: '#fff', marginBottom: 10 }}>
                <span style={{ color: '#FF8C00' }}>5.</span> DESCRIVI LA RICHIESTA
              </div>
              <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ ...labelStyle, marginBottom: 4 }}>COSA VUOI OTTENERE?</div>
                  <textarea
                    readOnly
                    placeholder="Descrivi brevemente l'intervento, l'obiettivo e le criticità principali..."
                    style={{ ...inputStyle, resize: 'none', flex: 1, minHeight: 80 }}
                  />
                  <div style={{ textAlign: 'right', fontSize: 9, color: '#333', marginTop: 2 }}>0 / 2000</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ ...labelStyle, marginBottom: 4 }}>CONDIZIONI PARTICOLARI <span style={{ color: '#333' }}>(SE PRESENTI)</span></div>
                  <textarea
                    readOnly
                    placeholder="Descrivi eventuali condizioni particolari, vincoli, esigenze..."
                    style={{ ...inputStyle, resize: 'none', flex: 1, minHeight: 80 }}
                  />
                  <div style={{ textAlign: 'right', fontSize: 9, color: '#333', marginTop: 2 }}>0 / 1000</div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3 – Steps 6, 7, CTA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>

            {/* Step 6 */}
            <div style={{ ...card, padding: '12px 14px' }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: '#fff', marginBottom: 10 }}>
                <span style={{ color: '#FF8C00' }}>6.</span> I TUOI CONTATTI
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'NOME E COGNOME', placeholder: 'Es. Mario Rossi' },
                  { label: 'AZIENDA', placeholder: 'Nome azienda' },
                  { label: 'TELEFONO', placeholder: 'Es. +39 333 1234567' },
                  { label: 'EMAIL', placeholder: 'Es. mario.rossi@azienda.it' },
                ].map((f, i) => (
                  <div key={i}>
                    <div style={{ ...labelStyle, marginBottom: 3, fontSize: 9 }}>{f.label}</div>
                    <input style={{ ...inputStyle, fontSize: 11 }} placeholder={f.placeholder} readOnly />
                  </div>
                ))}
              </div>
            </div>

            {/* Step 7 */}
            <div style={{ ...card, padding: '12px 14px' }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: '#fff', marginBottom: 10 }}>
                <span style={{ color: '#FF8C00' }}>7.</span> RIEPILOGO RICHIESTA
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {SUMMARY_ITEMS.map((item, i) => (
                  <div key={i} style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '8px 4px',
                    background: '#0E0E0E',
                    border: '1px solid #1A1A1A',
                    borderRadius: 4,
                  }}>
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span style={{
                      fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 8,
                      letterSpacing: '0.06em', color: '#555', textAlign: 'center', lineHeight: 1.2,
                    }}>{item.label}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#2A2A2A', textAlign: 'center' }}>
                      Da definire
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg,#CC6600,#FF8C00,#FFA500)',
                border: 'none',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 22px',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(255,140,0,0.5), 0 0 48px rgba(255,140,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
                minHeight: 90,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(255,140,0,0.7), 0 0 72px rgba(255,140,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(255,140,0,0.5), 0 0 48px rgba(255,140,0,0.2)' }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 28,
                  color: '#fff', letterSpacing: '0.06em', lineHeight: 1,
                }}>ATTIVA ONE CALL™</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 5, lineHeight: 1.4 }}>
                  Invia richiesta tecnica a<br />Palmisano Demolizioni &amp; Taglio Termico
                </div>
              </div>
              <div style={{
                width: 52, height: 52,
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, color: '#fff',
                border: '2px solid rgba(255,255,255,0.25)',
                flexShrink: 0,
              }}>→</div>
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: '#060606',
        borderTop: '1px solid #111',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {FOOTER_BADGES.map((b, i) => (
            <React.Fragment key={i}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0 14px',
              }}>
                <span style={{ fontSize: 16, opacity: 0.6 }}>{b.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: '#9A9A9A', whiteSpace: 'nowrap' }}>{b.label}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#3A3A3A', whiteSpace: 'nowrap' }}>{b.sub}</div>
                </div>
              </div>
              {i < FOOTER_BADGES.length - 1 && (
                <div style={{ width: 1, height: 24, background: '#1A1A1A', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{ flexShrink: 0, paddingLeft: 16, borderLeft: '1px solid #1A1A1A', textAlign: 'right' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#FF8C00', letterSpacing: '0.1em' }}>ONE CALL™</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#3A3A3A', lineHeight: 1.4 }}>
            IL TUO ACCESSO DIRETTO<br />ALLE SOLUZIONI INDUSTRIALI
          </div>
        </div>
      </div>
    </div>
  )
}
