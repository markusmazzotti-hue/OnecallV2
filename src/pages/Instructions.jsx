import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RotarySelector from '../components/RotarySelector.jsx'
import StepNav from '../components/StepNav.jsx'

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
  {
    num: 1,
    title: 'TIPO DI INTERVENTO',
    desc: 'Seleziona il tipo di intervento richiesto tra le opzioni disponibili: Demolizione Industriale, Taglio Termico, Smantellamento Impianti e altri.',
    color: '#FF8C00',
  },
  {
    num: 2,
    title: 'SETTORE DI RIFERIMENTO',
    desc: 'Indica il settore industriale di pertinenza. Questa informazione ci aiuta ad assegnare il team più competente per la tua richiesta.',
    color: '#00E676',
  },
  {
    num: 3,
    title: 'DOVE E QUANDO',
    desc: 'Inserisci la località dell\'intervento e la tempistica prevista (Urgente, Breve Termine, Programmabile). Puoi anche richiedere un sopralluogo.',
    color: '#9A9A9A',
  },
  {
    num: 4,
    title: 'FOTO, VIDEO E AUDIO',
    desc: 'Carica materiale visivo del sito: foto, video o descrizione audio. Il materiale aiuta il nostro team tecnico a valutare l\'intervento più velocemente.',
    color: '#9A9A9A',
  },
  {
    num: 5,
    title: 'DESCRIZIONE',
    desc: 'Descrivi in dettaglio cosa vuoi ottenere e le eventuali condizioni particolari del sito (vincoli strutturali, ambienti confinati, materiali speciali, ecc.).',
    color: '#9A9A9A',
  },
  {
    num: 6,
    title: 'CONTATTI',
    desc: 'Inserisci i tuoi dati di contatto: nome, azienda, telefono e email. Nessuna registrazione richiesta. I tuoi dati vengono trattati con massima riservatezza.',
    color: '#9A9A9A',
  },
  {
    num: 7,
    title: 'RIEPILOGO E INVIO',
    desc: 'Verifica tutti i dati inseriti nel pannello di riepilogo e premi "ATTIVA ONE CALL™" per inviare la tua richiesta tecnica. Riceverai risposta entro pochi minuti.',
    color: '#FF8C00',
  },
]

const MINI_STEPS = [
  {
    num: 3, title: 'DOVE E QUANDO',
    desc: 'Inserisci la località e seleziona la tempistica: Urgente (rosso), Breve Termine (arancio) o Programmabile (verde). Attiva il sopralluogo se necessario.',
  },
  {
    num: 4, title: 'FOTO, VIDEO E AUDIO',
    desc: 'Scatta o carica foto del sito, video dell\'area e registra una descrizione audio. Più materiale fornisci, più rapida sarà la valutazione.',
  },
  {
    num: 5, title: 'DESCRIZIONE RICHIESTA',
    desc: 'Usa i due campi di testo per descrivere l\'obiettivo dell\'intervento e le condizioni particolari presenti sul sito.',
  },
  {
    num: 6, title: 'I TUOI CONTATTI',
    desc: 'Compila nome, azienda, telefono ed email. Saranno usati esclusivamente per contattarti riguardo la tua richiesta tecnica.',
  },
]

const FOOTER_BADGES = [
  { label: 'ACCESSO IMMEDIATO', sub: 'Nessuna registrazione' },
  { label: 'RISPOSTA TECNICA', sub: 'Entro pochi minuti' },
  { label: 'TEAM OPERATIVO', sub: 'Specialisti al tuo fianco' },
  { label: 'INTERVENTI SU MISURA', sub: 'Soluzioni concrete' },
  { label: 'DISPONIBILITÀ 24/7', sub: 'Sempre operativi' },
]

export default function Instructions() {
  const navigate = useNavigate()
  const [step1Index, setStep1Index] = useState(1)
  const [step2Index, setStep2Index] = useState(0)

  const cardBase = {
    background: '#111111',
    border: '1px solid #1E1E1E',
    borderRadius: 8,
    overflow: 'hidden',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <header style={{
        height: 56,
        background: '#0A0A0A',
        borderBottom: '1px solid #1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg,#CC7000,#FF8C00)',
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(255,140,0,0.5)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l2-8h14l2 8H3z"/>
                <path d="M8 9V7a4 4 0 018 0v2"/>
                <rect x="1" y="17" width="22" height="4" rx="1"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', lineHeight: 1 }}>PALMISANO</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 10, color: '#FF8C00', letterSpacing: '0.15em', lineHeight: 1 }}>DEMOLIZIONI</div>
            </div>
          </div>

          <div style={{ width: 1, height: 28, background: '#2A2A2A' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '0.1em', color: '#FF8C00' }}>ONE CALL™</span>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 12, color: '#555', letterSpacing: '0.08em' }}>DEMOLIZIONI & TAGLIO TERMICO</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,136,255,0.06)',
            border: '1px solid rgba(0,136,255,0.2)',
            borderRadius: 5,
            padding: '5px 12px',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0088FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 11, color: '#0088FF' }}>
              Dati al sicuro. Nessuna registrazione richiesta.
            </span>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg,#CC7000,#FF8C00)',
              border: 'none', borderRadius: 5,
              padding: '8px 16px',
              fontFamily: "'Rajdhani',sans-serif",
              fontWeight: 700, fontSize: 12,
              letterSpacing: '0.06em',
              color: '#fff', cursor: 'pointer',
              boxShadow: '0 0 12px rgba(255,140,0,0.4)',
            }}
          >← TORNA ALLA RICHIESTA</button>
        </div>
      </header>

      {/* STEP NAV */}
      <StepNav activeSteps={[1, 2]} />

      {/* MAIN */}
      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Page title */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '0.1em',
            color: '#fff',
            lineHeight: 1,
          }}>ISTRUZIONI D'USO <span style={{ color: '#FF8C00' }}>— ONE CALL™</span></h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#555', marginTop: 6 }}>
            Segui i 7 passaggi per inviare la tua richiesta tecnica in modo rapido e preciso.
          </p>
        </div>

        {/* TOP SECTION: Steps list + Rotary selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 14 }}>

          {/* Steps list */}
          <div style={{ ...cardBase, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              fontFamily: "'Rajdhani',sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              color: '#FF8C00',
              marginBottom: 12,
            }}>I 7 PASSAGGI PER INVIARE LA RICHIESTA</div>

            {STEP_DESCRIPTIONS.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 10,
                padding: '9px 0',
                borderBottom: i < STEP_DESCRIPTIONS.length - 1 ? '1px solid #1A1A1A' : 'none',
              }}>
                <div style={{
                  width: 22, height: 22,
                  borderRadius: '50%',
                  background: s.color === '#FF8C00'
                    ? 'linear-gradient(135deg,#CC7000,#FF8C00)'
                    : s.color === '#00E676'
                    ? 'linear-gradient(135deg,#008040,#00E676)'
                    : '#1E1E1E',
                  border: s.color === '#9A9A9A' ? '1px solid #2A2A2A' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700, fontSize: 11,
                  color: s.color === '#9A9A9A' ? '#555' : '#fff',
                  flexShrink: 0,
                  marginTop: 1,
                  boxShadow: s.color === '#FF8C00' ? '0 0 6px rgba(255,140,0,0.4)' : s.color === '#00E676' ? '0 0 6px rgba(0,230,118,0.4)' : 'none',
                }}>{s.num}</div>
                <div>
                  <div style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: s.color === '#FF8C00' ? '#FFA500' : s.color === '#00E676' ? '#00E676' : '#9A9A9A',
                    marginBottom: 3,
                  }}>{s.title}</div>
                  <div style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 10,
                    color: '#555',
                    lineHeight: 1.5,
                  }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Rotary selectors preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Steps 1 & 2 side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* Step 1 */}
              <div style={{ ...cardBase, background: 'linear-gradient(160deg,#131008 0%,#111111 60%)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#CC7000,#FF8C00)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: '#fff',
                    boxShadow: '0 0 8px rgba(255,140,0,0.5)',
                  }}>1</div>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', color: '#FFA500' }}>
                    TIPO DI INTERVENTO
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', textAlign: 'center', marginTop: 8 }}>
                  Usa le frecce ‹ › o clicca direttamente sull'elemento desiderato.
                </p>
              </div>

              {/* Step 2 */}
              <div style={{ ...cardBase, background: 'linear-gradient(160deg,#081008 0%,#111111 60%)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#008040,#00E676)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: '#000',
                    boxShadow: '0 0 8px rgba(0,230,118,0.5)',
                  }}>2</div>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', color: '#00E676' }}>
                    SETTORE DI RIFERIMENTO
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', textAlign: 'center', marginTop: 8 }}>
                  Ruota la selezione e clicca sul settore corrispondente.
                </p>
              </div>
            </div>

            {/* Steps 3-6 mini cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
              {MINI_STEPS.map((s, i) => (
                <div key={i} style={{
                  ...cardBase,
                  padding: '12px 14px',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 10, right: 12,
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 700, fontSize: 32,
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}>{s.num}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: '#1E1E1E', border: '1px solid #2A2A2A',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 10, color: '#555',
                      flexShrink: 0,
                    }}>{s.num}</div>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', color: '#9A9A9A' }}>{s.title}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          ...cardBase,
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255,140,0,0.08) 0%, #111111 60%)',
          borderColor: 'rgba(255,140,0,0.2)',
        }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '0.08em' }}>
              PRONTO PER INVIARE LA TUA RICHIESTA?
            </div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#555', marginTop: 4 }}>
              Compila il modulo ONE CALL™ e ricevi una risposta tecnica entro pochi minuti. Nessuna registrazione richiesta.
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg,#CC6600,#FF8C00,#FFA500)',
              border: 'none',
              borderRadius: 6,
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(255,140,0,0.5), 0 0 48px rgba(255,140,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(255,140,0,0.7), 0 0 72px rgba(255,140,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(255,140,0,0.5), 0 0 48px rgba(255,140,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)' }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.06em', lineHeight: 1 }}>
                ATTIVA ONE CALL™
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter',sans-serif", marginTop: 2 }}>
                Vai alla richiesta tecnica →
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        background: '#060606',
        borderTop: '1px solid #111',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        flexShrink: 0,
      }}>
        {FOOTER_BADGES.map((b, i) => (
          <React.Fragment key={i}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '0 24px',
              borderRight: i < FOOTER_BADGES.length - 1 ? '1px solid #1A1A1A' : 'none',
            }}>
              <span style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.1em',
                color: i % 2 === 0 ? '#FF8C00' : '#9A9A9A',
                whiteSpace: 'nowrap',
              }}>{b.label}</span>
              <span style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 10,
                color: '#444',
                whiteSpace: 'nowrap',
              }}>{b.sub}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
