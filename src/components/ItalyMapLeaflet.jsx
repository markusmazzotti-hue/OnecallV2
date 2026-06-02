import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

/* Blinking orange location pin (pulse animation defined in index.css) */
const PIN = L.divIcon({
  className: '',
  html: `<div class="oc-pin">
    <span class="oc-pin-ring"></span>
    <span class="oc-pin-ring oc-pin-ring2"></span>
    <span class="oc-pin-core"></span>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const ROME = [41.9028, 12.4964]

export default function ItalyMapLeaflet({ localita, onLocationChange, height = 210 }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return

    // Static, non-interactive map (no scroll / drag / zoom controls)
    const map = L.map(mapRef.current, {
      center: ROME,
      zoom: 5,
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
      // empty -> back to Rome
      instanceRef.current.setView(ROME, 5, { animate: true })
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
