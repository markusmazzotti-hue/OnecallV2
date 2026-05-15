import React from 'react'

export default function ItalyMap({ width = 160, height = 220, showDots = false, dots = [] }) {
  return (
    <svg
      viewBox="0 0 160 220"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main peninsula */}
      <path
        d="M68 8 L72 6 L78 9 L84 8 L88 12 L86 18 L90 24 L93 30 L95 38 L97 46 L99 54 L101 62 L104 70 L108 78 L112 86 L115 94 L117 102 L118 110 L116 118 L113 124 L110 130 L106 136 L102 142 L97 148 L92 153 L86 156 L80 158 L74 157 L68 153 L63 148 L59 142 L57 136 L55 128 L57 120 L60 113 L63 106 L65 98 L65 90 L63 82 L61 74 L60 66 L60 58 L62 50 L65 42 L66 34 L67 26 L67 17 Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        fill="#141414"
      />
      {/* Heel (Puglia heel) */}
      <path
        d="M118 110 L122 114 L127 120 L131 127 L133 134 L130 140 L125 144 L120 140 L117 134 L116 127 L116 120 Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        fill="#141414"
      />
      {/* Toe (Calabria toe) */}
      <path
        d="M64 158 L68 163 L70 170 L68 178 L62 182 L56 178 L54 170 L57 163 Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        fill="#141414"
      />
      {/* Sicily */}
      <path
        d="M30 190 L40 186 L52 184 L64 186 L72 192 L70 200 L60 204 L48 204 L36 200 L28 196 Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        fill="#141414"
      />
      {/* Sardinia */}
      <path
        d="M14 90 L20 86 L26 88 L28 96 L26 106 L22 114 L16 112 L12 104 L12 96 Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        fill="#141414"
      />

      {/* City dots when showDots is true */}
      {showDots && (
        <>
          {/* Milano */}
          <circle cx="76" cy="22" r={3.5} fill="#FF8C00" opacity="0.9">
            <title>Milano</title>
          </circle>
          {/* Torino */}
          <circle cx="64" cy="20" r={3} fill="#00CC66" opacity="0.85">
            <title>Torino</title>
          </circle>
          {/* Venezia */}
          <circle cx="94" cy="26" r={3} fill="#FF8C00" opacity="0.85">
            <title>Venezia</title>
          </circle>
          {/* Genova */}
          <circle cx="66" cy="40" r={2.5} fill="#00CC66" opacity="0.8">
            <title>Genova</title>
          </circle>
          {/* Bologna */}
          <circle cx="84" cy="48" r={2.5} fill="#FF8C00" opacity="0.8">
            <title>Bologna</title>
          </circle>
          {/* Firenze */}
          <circle cx="82" cy="70" r={2.5} fill="#00CC66" opacity="0.75">
            <title>Firenze</title>
          </circle>
          {/* Roma */}
          <circle cx="80" cy="100" r={3} fill="#FF3333" opacity="0.9">
            <title>Roma</title>
          </circle>
          {/* Napoli */}
          <circle cx="88" cy="126" r={3} fill="#FF8C00" opacity="0.85">
            <title>Napoli</title>
          </circle>
          {/* Bari */}
          <circle cx="110" cy="120" r={4} fill="#FF3333" opacity="0.95">
            <title>Bari (18)</title>
          </circle>
          {/* Taranto */}
          <circle cx="108" cy="132" r={4.5} fill="#FF3333" opacity="1">
            <title>Taranto (21)</title>
          </circle>
          {/* Lecce */}
          <circle cx="116" cy="140" r={2.5} fill="#FF8C00" opacity="0.8">
            <title>Lecce</title>
          </circle>
          {/* Cagliari */}
          <circle cx="18" cy="108" r={3.5} fill="#0088FF" opacity="0.85">
            <title>Cagliari (7)</title>
          </circle>
          {/* Palermo */}
          <circle cx="38" cy="191" r={3} fill="#00CC66" opacity="0.8">
            <title>Palermo</title>
          </circle>
        </>
      )}

      {/* Static decorative dots for ClientForm */}
      {!showDots && (
        <>
          <circle cx="76" cy="22" r="2.5" fill="#FF8C00" opacity="0.7" />
          <circle cx="84" cy="48" r="2" fill="#FF8C00" opacity="0.5" />
          <circle cx="80" cy="100" r="2.5" fill="#FF3333" opacity="0.7" />
          <circle cx="108" cy="132" r="3" fill="#FF3333" opacity="0.8" />
          <circle cx="110" cy="120" r="2.5" fill="#FF8C00" opacity="0.6" />
          <circle cx="82" cy="70" r="2" fill="#00CC66" opacity="0.5" />
        </>
      )}
    </svg>
  )
}
