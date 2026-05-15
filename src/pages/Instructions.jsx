import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepNav from '../components/StepNav.jsx'
import RotarySelector from '../components/RotarySelector.jsx'

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

const STEPS_LIST = [
  { num: 1, label: 'TIPO INTERVENTO', desc: 'Seleziona uno o più interventi richiesti.', color: '#FF8C00' },
  { num: 2, label: 'SETTORE', desc: 'Scegli il settore di riferimento.', color: '#FF8C00' },
  { num: 3, label: 'DOVE E QUANDO', desc: "Indica dove si trova l'intervento e quando è previsto.", color: '#FF8C00' },
  { num: 4, label: 'FOTO, VIDEO E AUDIO', desc: "Carica tutto il materiale utile per valutare l'intervento.", color: '#FF8C00' },
  { num: 5, label: 'DESCRIZIONE', desc: 'Scrivi cosa vuoi ottenere e le condizioni particolari.', color: '#FF8C00' },
  { num: 6, label: 'CONTATTI', desc: 'Inserisci i tuoi dati per essere ricontattato.', color: '#FF8C00' },
  { num: 7, label: 'RIEPILOGO', desc: 'Controlla i dati inseriti e invia la richiesta.', color: '#FF8C00' },
]

const FOOTER_ITEMS = [
  { icon: '⚡', label: 'ACCESSO IMMEDIATO', sub: 'Scansiona e attiva' },
  { icon: '🔓', label: 'NESSUNA REGISTRAZIONE', sub: 'Nessun modulo richiesto' },
  { icon: '⏱', label: 'RISPOSTA TECNICA', sub: 'Entro pochi minuti' },
  { icon: '👥', label: 'TEAM OPERATIVO', sub: 'Specialisti al tuo fianco' },
  { icon: '🔧', label: 'INTERVENTI SU MISURA', sub: 'Soluzioni concrete' },
  { icon: '🕐', label: 'DISPONIBILITÀ 24/7', sub: 'Sempre operativi' },
]

export default function Instructions() {
  const [step1, setStep1] = useState(1)
  const [step2, setStep2] = useState(0)
  const navigate = useNavigate()

  const cardStyle = {
    background: '#111111',
    border: '1px solid #1E1E1E',
    borderRadius: 6,
    padding: '12px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '0.04em' }}>PALMISANO</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: '#FF8C00', letterSpacing: '0.04em' }}>ONE CALL™</span>
            </div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: 10, color: '#555', letterSpacing: '0.12em' }}>DEMOLIZIONI & TAGLIO TERMICO</div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 32,
              color: '#fff',
              letterSpacing: '0.06em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>ISTRUZIONI D'USO</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9A9A9A', marginTop: 2 }}>
              Invia la tua richiesta tecnica in pochi passaggi, in modo semplice e chiaro.
              <span style={{
                display: 'inline-block',
                marginLeft: 8,
                height: 1,
                width: 120,
                background: 'linear-gradient(90deg, #FF8C00, transparent)',
                verticalAlign: 'middle',
              }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #CC6600, #FF8C00)',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.08em',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 0 16px rgba(255,140,0,0.4)',
            }}
          >ACCESSO ONE CALL™ →</button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#0E0E0E',
            border: '1px solid #1E1E1E',
            borderRadius: 4,
            padding: '6px 10px',
          }}>
            <span style={{ fontSize: 16 }}>🛡</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 10, color: '#9A9A9A' }}>ONE CALL™<br />Accesso diretto per richieste tecniche</div>
          </div>
        </div>
      </header>

      <StepNav activeSteps={[1, 2]} />

      <main style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>

        {/* Main instruction area */}
        <div style={{ display: 'flex', gap: 14 }}>

          {/* Left steps list */}
          <div style={{
            ...cardStyle,
            width: 200,
            flexShrink: 0,
          }}>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.1em',
              color: '#FF8C00',
              marginBottom: 16,
              lineHeight: 1.3,
            }}>I 7 PASSAGGI<br />PER INVIARE LA RICHIESTA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STEPS_LIST.map(s => (
                <div key={s.num} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 22, height: 22,
                    background: 'linear-gradient(135deg, #CC7000, #FF8C00)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    color: '#fff',
                    flexShrink: 0,
                    boxShadow: '0 0 6px rgba(255,140,0,0.4)',
                  }}>{s.num}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      color: s.color,
                    }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20,
              paddingTop: 14,
              borderTop: '1px solid #1A1A1A',
              fontSize: 11,
              color: '#777',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.5,
            }}>
              Se tutto è corretto, clicca su <span style={{ color: '#FF8C00', fontWeight: 600 }}>"ATTIVA ONE CALL™"</span> e invia la richiesta.
            </div>
          </div>

          {/* Center: two rotary selectors */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: '#FF8C00',
                  marginBottom: 10,
                  alignSelf: 'flex-start',
                }}>1. TIPO INTERVENTO</div>
                <RotarySelector
                  items={STEP1_ITEMS}
                  activeIndex={step1}
                  onChange={setStep1}
                  theme="orange"
                  stepNum="1"
                  centerLabel="TIPO INTERVENTO"
                  centerSub="Seleziona il servizio richiesto"
                />
              </div>
              <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: '#00E676',
                  marginBottom: 10,
                  alignSelf: 'flex-start',
                }}>2. SETTORE</div>
                <RotarySelector
                  items={STEP2_ITEMS}
                  activeIndex={step2}
                  onChange={setStep2}
                  theme="green"
                  stepNum="2"
                  centerLabel="SETTORE"
                  centerSub="Seleziona il settore di riferimento"
                />
              </div>
            </div>

            {/* Steps 3-5 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div style={cardStyle}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, color: '#9A9A9A', letterSpacing: '0.08em', marginBottom: 8 }}>
                  3. DOVE SI TROVA L'INTERVENTO E QUANDO È PREVISTO?
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 3, padding: '6px 10px', fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif" }}>
                    📍 Es. Taranto, Genova, ecc.
                  </div>
                  <div style={{ background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 3, padding: '6px 10px', fontSize: 10, color: '#555', fontFamily: "'Inter', sans-serif" }}>
                    + Via, n°, stabilimento, ecc.
                  </div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', color: '#555', marginTop: 4 }}>TEMPISTICA INDICATIVA</div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[{ c: '#FF3333', l: 'URGENTE' }, { c: '#FF8C00', l: 'BREVE TERMINE', sel: true }, { c: '#00CC66', l: 'PROGRAMMABILE' }].map((p, i) => (
                      <div key={i} style={{
                        flex: 1,
                        padding: '5px 3px',
                        border: `1px solid ${p.sel ? p.c : '#2A2A2A'}`,
                        borderRadius: 4,
                        background: p.sel ? `${p.c}15` : '#0A0A0A',
                        textAlign: 'center',
                        fontSize: 8,
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        color: p.sel ? p.c : '#555',
                      }}>{p.l}</div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                    <span style={{ fontSize: 9, color: '#555', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.06em' }}>RICHIEDO SOPRALLUOGO</span>
                    <div style={{ width: 32, height: 16, background: '#00CC66', borderRadius: 8, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 2, left: 16, width: 12, height: 12, background: '#fff', borderRadius: '50%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, color: '#9A9A9A', letterSpacing: '0.08em', marginBottom: 8 }}>
                  4. CARICA FOTO, VIDEO E DESCRIZIONE AUDIO
                </div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                  {['📷 SCATTA', '🖼 FOTO', '🎥 VIDEO', '🎙 AUDIO', '📎 ALL.'].map((b, i) => (
                    <div key={i} style={{
                      flex: 1,
                      padding: '8px 3px',
                      border: '1px solid #2A2A2A',
                      borderRadius: 4,
                      background: '#0A0A0A',
                      textAlign: 'center',
                      fontSize: 8,
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                      color: '#555',
                    }}>{b}</div>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: '#555', fontFamily: "'Inter', sans-serif" }}>
                  Formati supportati: JPG, PNG, MP4, MP3, PDF (max 100MB)
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, color: '#9A9A9A', letterSpacing: '0.08em', marginBottom: 8 }}>
                  5. DESCRIVI LA RICHIESTA
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ flex: 1, background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 3, padding: '6px 8px', minHeight: 70 }}>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.06em', color: '#555', marginBottom: 4 }}>COSA VUOI OTTENERE?</div>
                    <div style={{ fontSize: 9, color: '#333', fontFamily: "'Inter', sans-serif" }}>Descrivi brevemente l'intervento...</div>
                    <div style={{ fontSize: 8, color: '#333', textAlign: 'right', marginTop: 4 }}>0 / 2000</div>
                  </div>
                  <div style={{ flex: 1, background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 3, padding: '6px 8px', minHeight: 70 }}>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.06em', color: '#555', marginBottom: 4 }}>CONDIZIONI PARTICOLARI</div>
                    <div style={{ fontSize: 9, color: '#333', fontFamily: "'Inter', sans-serif" }}>Eventuali vincoli, esigenze...</div>
                    <div style={{ fontSize: 8, color: '#333', textAlign: 'right', marginTop: 4 }}>0 / 1000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps 6-7 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              <div style={cardStyle}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, color: '#9A9A9A', letterSpacing: '0.08em', marginBottom: 8 }}>
                  6. I TUOI CONTATTI
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
                  {[
                    { l: 'NOME E COGNOME', ph: 'Es. Mario Rossi', icon: '👤' },
                    { l: 'AZIENDA', ph: 'Nome azienda', icon: '🏢' },
                    { l: 'TELEFONO', ph: 'Es. +39 333 1234567', icon: '📞' },
                    { l: 'EMAIL', ph: 'Es. mario.rossi@azienda.it', icon: '✉' },
                  ].map((f, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: '0.1em', color: '#555', marginBottom: 3 }}>{f.l}</div>
                      <div style={{ background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 3, padding: '5px 8px', fontSize: 9, color: '#333', fontFamily: "'Inter', sans-serif" }}>
                        {f.icon} {f.ph}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, color: '#9A9A9A', letterSpacing: '0.08em', marginBottom: 8 }}>7. RIEPILOGO RICHIESTA</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['⚙ TIPO', '🏭 SETTORE', '📍 DOVE', '📷 FOTO', '📝 DESC.', '👤 CONT.'].map((s, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 12 }}>{s.split(' ')[0]}</div>
                        <div style={{ fontSize: 8, color: '#555', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{s.split(' ')[1]}</div>
                        <div style={{ fontSize: 7, color: '#333', fontFamily: "'Inter', sans-serif" }}>Da definire</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: 'linear-gradient(135deg, #CC6600, #FF8C00, #FFA500)',
                    border: 'none',
                    borderRadius: 5,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(255,140,0,0.5)',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '0.06em' }}>ATTIVA ONE CALL™</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif" }}>Invia richiesta tecnica a Palmisano</div>
                  </div>
                  <span style={{ fontSize: 16, color: '#fff' }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <div style={{
        background: '#050505',
        borderTop: '1px solid #141414',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        overflow: 'hidden',
      }}>
        {FOOTER_ITEMS.map((f, i, arr) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flex: 1,
            borderRight: i < arr.length - 1 ? '1px solid #1A1A1A' : 'none',
            paddingRight: i < arr.length - 1 ? 16 : 0,
            marginRight: i < arr.length - 1 ? 16 : 0,
          }}>
            <span style={{ fontSize: 18 }}>{f.icon}</span>
            <div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', color: '#9A9A9A' }}>{f.label}</div>
              <div style={{ fontSize: 9, color: '#555', fontFamily: "'Inter', sans-serif" }}>{f.sub}</div>
            </div>
          </div>
        ))}
        <div style={{ borderLeft: '1px solid #1A1A1A', paddingLeft: 16, marginLeft: 8 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#FF8C00', letterSpacing: '0.06em', lineHeight: 1.2 }}>
            ONE CALL™<br />
            <span style={{ fontSize: 8, color: '#555', letterSpacing: '0.1em', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>IL TUO ACCESSO DIRETTO<br />ALLE SOLUZIONI INDUSTRIALI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
