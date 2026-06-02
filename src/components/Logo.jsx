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
  const chrome =
    'linear-gradient(180deg,' +
    '#FFFFFF 0%,#DEDEDE 12%,#A8A8A8 32%,#686868 50%,#ABABAB 68%,#D8D8D8 84%,#F2F2F2 100%)'

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
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: size * 0.09 }}>

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
            fontSize: size * 0.30,
            color: '#BBBBBB',
            lineHeight: 1,
            marginTop: size * 0.03,
            marginLeft: size * 0.04,
          }}>™</span>
        </span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 500,
          fontSize: stacked ? size * 0.285 : size * 0.34,
          letterSpacing: '0.04em',
          color: '#868686',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          paddingLeft: 1,
        }}>
          DEMOLIZIONI &amp; TAGLIO TERMICO
        </div>
      )}
    </div>
  )
}
