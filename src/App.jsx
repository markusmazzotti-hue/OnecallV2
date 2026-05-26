import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HudScreen from './pages/HudScreen.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Instructions from './pages/Instructions.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HudScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/istruzioni" element={<Instructions />} />
      </Routes>
    </BrowserRouter>
  )
}
