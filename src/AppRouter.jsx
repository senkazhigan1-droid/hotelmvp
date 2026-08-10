import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AdminPanel from './components/AdminPanel'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}