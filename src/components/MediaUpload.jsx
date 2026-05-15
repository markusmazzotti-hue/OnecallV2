import React, { useState, useRef } from 'react'

const UPLOAD_BTNS = [
  {
    id: 'photo-camera',
    label: 'SCATTA FOTO',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    accept: 'image/*',
    capture: 'environment',
  },
  {
    id: 'photo-upload',
    label: 'CARICA FOTO',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21,15 16,10 5,21"/>
      </svg>
    ),
    accept: 'image/*',
  },
  {
    id: 'video-upload',
    label: 'CARICA VIDEO',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23,7 16,12 23,17 23,7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    accept: 'video/*',
  },
  {
    id: 'audio-upload',
    label: 'AUDIO',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    accept: 'audio/*',
  },
  {
    id: 'attachments',
    label: 'ALLEGATI',
    optional: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
      </svg>
    ),
    accept: '*/*',
  },
]

export default function MediaUpload() {
  const [files, setFiles] = useState([])
  const fileInputs = useRef({})

  const handleFileChange = (e, btnId) => {
    const newFiles = Array.from(e.target.files).map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      type: f.type,
      size: f.size,
      source: btnId,
    }))
    setFiles(prev => [...prev, ...newFiles])
    e.target.value = ''
  }

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + 'B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB'
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Upload buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        {UPLOAD_BTNS.map(btn => (
          <React.Fragment key={btn.id}>
            <input
              ref={el => fileInputs.current[btn.id] = el}
              type="file"
              accept={btn.accept}
              capture={btn.capture}
              multiple={btn.id !== 'audio-upload'}
              style={{ display: 'none' }}
              onChange={e => handleFileChange(e, btn.id)}
            />
            <UploadButton
              label={btn.label}
              icon={btn.icon}
              optional={btn.optional}
              onClick={() => fileInputs.current[btn.id]?.click()}
            />
          </React.Fragment>
        ))}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {files.map(f => (
            <div key={f.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255,140,0,0.05)',
              border: '1px solid rgba(255,140,0,0.15)',
              borderRadius: 4,
              padding: '5px 10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ color: '#FF8C00', fontSize: 12 }}>
                  {f.type.startsWith('image') ? '🖼' : f.type.startsWith('video') ? '🎥' : f.type.startsWith('audio') ? '🎙' : '📎'}
                </div>
                <span style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9A9A9A',
                  maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{f.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555' }}>{formatSize(f.size)}</span>
                <button
                  onClick={() => removeFile(f.id)}
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#555', fontSize: 14, lineHeight: 1, padding: '0 2px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF3333'}
                  onMouseLeave={e => e.currentTarget.style.color = '#555'}
                >×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info text */}
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#555', lineHeight: 1.5 }}>
        Puoi caricare più file alla volta. Formati supportati: JPG, PNG, MP4, MP3 (max 100MB)
      </p>
    </div>
  )
}

function UploadButton({ label, icon, optional, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: 1,
        background: hover ? 'rgba(255,140,0,0.07)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hover ? '#FF8C00' : '#2A2A2A'}`,
        borderRadius: 6,
        padding: '12px 4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: hover ? '0 0 12px rgba(255,140,0,0.2)' : 'none',
      }}
    >
      <span style={{
        color: hover ? '#FF8C00' : '#555',
        transition: 'color 0.2s',
        filter: hover ? 'drop-shadow(0 0 4px rgba(255,140,0,0.6))' : 'none',
      }}>{icon}</span>
      <span style={{
        fontFamily: "'Rajdhani',sans-serif",
        fontWeight: 700,
        fontSize: 9,
        letterSpacing: '0.06em',
        color: hover ? '#FF8C00' : '#666',
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.2s',
      }}>{label}</span>
      {optional && (
        <span style={{ fontSize: 9, color: '#444', fontFamily: "'Inter',sans-serif" }}>opzionale</span>
      )}
    </button>
  )
}
