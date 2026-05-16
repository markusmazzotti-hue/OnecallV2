import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

// Fix default marker icons (webpack/vite asset issue)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const CUSTOM_ICON = L.divIcon({
  className: '',
  html: `<div style="
    width: 28px; height: 28px;
    background: radial-gradient(circle at 40% 35%, #FFB800, #CC6600);
    border: 2px solid rgba(255,180,0,0.8);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 0 12px rgba(255,140,0,0.7), 0 0 24px rgba(255,140,0,0.3);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
})

export default function ItalyMapLeaflet({ localita, onLocationChange }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [41.9, 12.5],
      zoom: 5,
      zoomControl: true,
      attributionControl: false,
    })

    // Dark tile layer from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
    }).addTo(map)

    // Attribution minimal
    L.control.attribution({ prefix: false }).addTo(map)

    // Click to place marker + reverse geocode
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng

      if (markerRef.current) {
        markerRef.current.setLatLng(e.latlng)
      } else {
        markerRef.current = L.marker(e.latlng, { icon: CUSTOM_ICON }).addTo(map)
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=it`
        )
        const data = await res.json()
        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.municipality ||
          data.address?.county ||
          ''
        if (city && onLocationChange) onLocationChange(city)
      } catch {}
    })

    instanceRef.current = map

    return () => {
      map.remove()
      instanceRef.current = null
      markerRef.current = null
    }
  }, [])

  // Geocode when localita changes externally (typed input)
  useEffect(() => {
    if (!localita || !instanceRef.current) return
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(localita + ', Italia')}&format=json&limit=1`
    )
      .then(r => r.json())
      .then(data => {
        if (data[0] && instanceRef.current) {
          const lat = parseFloat(data[0].lat)
          const lng = parseFloat(data[0].lon)
          instanceRef.current.setView([lat, lng], 9)
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng])
          } else {
            markerRef.current = L.marker([lat, lng], { icon: CUSTOM_ICON }).addTo(instanceRef.current)
          }
        }
      })
      .catch(() => {})
  }, [localita])

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: 220,
        borderRadius: 6,
        overflow: 'hidden',
        border: '1px solid #2A2A2A',
        filter: 'brightness(0.85) contrast(1.1)',
      }}
    />
  )
}
