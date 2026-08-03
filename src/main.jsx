import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './output.css'
import './i18n/index'  // ← ЭТА СТРОКА ДОЛЖНА БЫТЬ!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)