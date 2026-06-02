import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

/* Blinking orange sniper-scope crosshair (animations in index.css) */
const PIN = L.divIcon({
  className: '',
  html: `<div class="oc-pin">
    <span class="oc-pin-ring"></span>
    <span class="oc-pin-ring oc-pin-ring2"></span>
    <svg class="oc-sniper" width="44" height="44" viewBox="0 0 44 44" fill="none"
      stroke="#FF8C00" stroke-width="1.6" stroke-linecap="round">
      <circle cx="22" cy="22" r="13"/>
      <circle cx="22" cy="22" r="8" stroke-opacity="0.5"/>
      <line x1="22" y1="2"  x2="22" y2="11"/>
      <line x1="22" y1="33" x2="22" y2="42"/>
      <line x1="2"  y1="22" x2="11" y2="22"/>
      <line x1="33" y1="22" x2="42" y2="22"/>
      <circle cx="22" cy="22" r="1.6" fill="#FFB000" stroke="none"/>
    </svg>
  </div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
})

const ROME = [41.9028, 12.4964]
// Bounds covering the whole Italian peninsula + islands
const ITALY_BOUNDS = [[36.5, 6.5], [47.2, 18.6]]

export default function ItalyMapLeaflet({ localita, onLocationChange, height = 250 }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return

    // Static, non-interactive map (no scroll / drag / zoom controls)
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      tap: false,
    })

    // Dark CartoDB tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
    }).addTo(map)

    // Fit the whole of Italy in view
    map.fitBounds(ITALY_BOUNDS, { padding: [6, 6] })

    // Default blinking pin on Rome
    markerRef.current = L.marker(ROME, { icon: PIN, interactive: false }).addTo(map)

    // Click still places the pin + reverse-geocodes (optional)
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng
      markerRef.current.setLatLng(e.latlng)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=it`
        )
        const data = await res.json()
        const city =
          data.address?.city || data.address?.town || data.address?.village ||
          data.address?.municipality || data.address?.county || ''
        if (city && onLocationChange) onLocationChange(city)
      } catch {}
    })

    instanceRef.current = map
    return () => { map.remove(); instanceRef.current = null; markerRef.current = null }
  }, [])

  // When the city is selected/typed, move the pin there and recenter
  useEffect(() => {
    if (!instanceRef.current) return
    if (!localita) {
      // empty -> show all of Italy, pin back on Rome
      instanceRef.current.fitBounds(ITALY_BOUNDS, { padding: [6, 6], animate: true })
      if (markerRef.current) markerRef.current.setLatLng(ROME)
      return
    }
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(localita + ', Italia')}&format=json&limit=1`
    )
      .then(r => r.json())
      .then(data => {
        if (data[0] && instanceRef.current) {
          const lat = parseFloat(data[0].lat)
          const lng = parseFloat(data[0].lon)
          instanceRef.current.setView([lat, lng], 8, { animate: true })
          if (markerRef.current) markerRef.current.setLatLng([lat, lng])
          else markerRef.current = L.marker([lat, lng], { icon: PIN, interactive: false }).addTo(instanceRef.current)
        }
      })
      .catch(() => {})
  }, [localita])

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height,
        borderRadius: 6,
        overflow: 'hidden',
        border: 'none',
        background: 'transparent',
        filter: 'brightness(0.92) contrast(1.05)',
      }}
    />
  )
}
