import React from 'react'

/*
 * Official PALMISANO ONE CALL™ logo, recreated as crisp scalable text.
 *  - "PALMISANO"  : brushed-silver vertical gradient
 *  - "ONE CALL"   : amber/orange vertical gradient
 *  - "™"          : small superscript
 *  - subtitle     : "DEMOLIZIONI & TAGLIO TERMICO" (white, wide tracking)
 *
 * `size` scales the whole lockup. Default 22 ≈ header size.
 */
export default function Logo({ size = 22, subtitle = true }) {
  const main = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: '0.01em',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: size * 0.14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: size * 0.34 }}>
        {/* PALMISANO — brushed silver */}
        <span style={{
          ...main,
          backgroundImage:
            'linear-gradient(180deg,#FFFFFF 0%,#F0F0F0 38%,#9A9A9A 62%,#E8E8E8 100%)',
        }}>PALMISANO</span>

        {/* ONE CALL — amber/orange */}
        <span style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
          <span style={{
            ...main,
            backgroundImage:
              'linear-gradient(180deg,#FFB347 0%,#FF9500 45%,#FF8C00 70%,#E07800 100%)',
          }}>ONE&nbsp;CALL</span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: size * 0.34,
            color: '#FFFFFF',
            lineHeight: 1,
            marginLeft: size * 0.04,
            marginTop: size * 0.02,
          }}>™</span>
        </span>
      </div>

      {subtitle && (
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
          fontSize: size * 0.42,
          color: '#FFFFFF',
          letterSpacing: `${size * 0.012}em`,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>DEMOLIZIONI &amp; TAGLIO TERMICO</div>
      )}
    </div>
  )
}
