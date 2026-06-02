import React from 'react'

/*
 * PALMISANO ONE CALL™ logo — 3D metallic bevel (matches PDF reference)
 *
 * PALMISANO : chrome steel — 7-stop vertical gradient (bright→dark→bright)
 * ONE CALL  : gold/amber  — same bevel in orange-gold
 * ™         : small grey superscript
 * subtitle  : DEMOLIZIONI & TAGLIO TERMICO — silver-grey, wide tracking
 */
export default function Logo({ size = 32, subtitle = true, stacked = false }) {
  // PALMISANO — brushed silver: bright white top, grey sheen band mid, light bottom
  const chrome =
    'linear-gradient(180deg,' +
    '#FFFFFF 0%,#EDEDED 30%,#ACACAC 52%,#D6D6D6 72%,#FFFFFF 100%)'

  const gold =
    'linear-gradient(180deg,' +
    '#FFE070 0%,#FFC030 12%,#C87800 32%,#7A4400 50%,#C87A00 68%,#FFC030 84%,#FFE070 100%)'

  const base = {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontWeight: 900,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: '-0.01em',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    transform: 'scaleY(1.22)',          // stretch glyphs taller
    transformOrigin: 'bottom',
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: size * 0.14, paddingTop: size * 0.14 }}>

      {/* Main lockup — single row or stacked two lines */}
      <div style={{
        display: 'flex',
        flexDirection: stacked ? 'column' : 'row',
        alignItems: 'flex-start',
        gap: stacked ? size * 0.04 : size * 0.22,
      }}>

        {/* PALMISANO — chrome */}
        <span style={{ ...base, backgroundImage: chrome }}>PALMISANO</span>

        {/* ONE CALL™ — gold */}
        <span style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
          <span style={{ ...base, backgroundImage: gold }}>ONE&nbsp;CALL</span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: size * 0.34,
            color: '#D2D2D2',
            lineHeight: 1,
            marginTop: size * 0.04,
            marginLeft: size * 0.04,
            alignSelf: 'flex-start',
          }}>™</span>
        </span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600,
          fontSize: stacked ? size * 0.34 : size * 0.40,
          letterSpacing: '0.02em',
          color: '#9A9A9A',
          textTransform: 'uppercase',
          width: '100%',
          textAlign: 'left',
          lineHeight: 1,
        }}>
          DEMOLIZIONI &amp; TAGLIO TERMICO
        </div>
      )}
    </div>
  )
}
