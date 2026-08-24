import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './output.css'
import './i18n/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/hotelmvp">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)