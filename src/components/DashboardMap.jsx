import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

const ITALY_BOUNDS = [[36.5, 6.5], [47.2, 18.6]]

/* Numbered orange pin + city label */
function numberedPin(num, name) {
  return L.divIcon({
    className: '',
    html: `<div style="display:flex;align-items:center;gap:5px;transform:translate(-13px,-13px);white-space:nowrap;">
      <div style="width:26px;height:26px;border-radius:50%;background:#0E0E10;
        border:2px solid #FF8C00;box-shadow:0 0 10px rgba(255,140,0,0.65);
        display:flex;align-items:center;justify-content:center;
        color:#FF8C00;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;">${num}</div>
      <span style="color:#CFCFD4;font-family:'Inter',sans-serif;font-size:10px;
        text-shadow:0 1px 3px #000;">${name}</span>
    </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

/* Small dot + city label (no number) */
function dotPin(name) {
  return L.divIcon({
    className: '',
    html: `<div style="display:flex;align-items:center;gap:4px;transform:translate(-4px,-4px);white-space:nowrap;">
      <div style="width:7px;height:7px;border-radius:50%;background:#FF8C00;opacity:0.7;
        box-shadow:0 0 6px rgba(255,140,0,0.6);"></div>
      <span style="color:#9A9AA2;font-family:'Inter',sans-serif;font-size:9.5px;
        text-shadow:0 1px 3px #000;">${name}</span>
    </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

const PINS = [
  { name: 'Milano',  lat: 45.464, lng: 9.190,  num: 6 },
  { name: 'Venezia', lat: 45.440, lng: 12.316, num: 5 },
  { name: 'Bologna', lat: 44.494, lng: 11.342, num: 12 },
  { name: 'Roma',    lat: 41.903, lng: 12.496, num: 15 },
  { name: 'Napoli',  lat: 40.852, lng: 14.268, num: 18 },
  { name: 'Taranto', lat: 40.464, lng: 17.247, num: 21 },
  { name: 'Cagliari',lat: 39.224, lng: 9.121,  num: 7 },
]
const DOTS = [
  { name: 'Torino',  lat: 45.070, lng: 7.687 },
  { name: 'Genova',  lat: 44.406, lng: 8.933 },
  { name: 'Firenze', lat: 43.770, lng: 11.255 },
  { name: 'Bari',    lat: 41.117, lng: 16.871 },
  { name: 'Lecce',   lat: 40.352, lng: 18.174 },
  { name: 'Palermo', lat: 38.116, lng: 13.361 },
]

export default function DashboardMap({ height = 280 }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return

    const map = L.map(mapRef.current, {
      zoomControl: false, attributionControl: false,
      scrollWheelZoom: false, dragging: false, doubleClickZoom: false,
      boxZoom: false, keyboard: false, touchZoom: false, tap: false,
    })
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map)
    map.fitBounds(ITALY_BOUNDS, { padding: [8, 8] })

    DOTS.forEach(d => L.marker([d.lat, d.lng], { icon: dotPin(d.name), interactive: false }).addTo(map))
    PINS.forEach(p => L.marker([p.lat, p.lng], { icon: numberedPin(p.num, p.name), interactive: false }).addTo(map))

    instanceRef.current = map
    return () => { map.remove(); instanceRef.current = null }
  }, [])

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%', height,
        borderRadius: 8, overflow: 'hidden',
        border: '1px solid #1F2024',
        filter: 'brightness(0.95) contrast(1.05)',
      }}
    />
  )
}
