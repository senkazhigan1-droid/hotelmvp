import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter'
import './output.css'
import './i18n/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)