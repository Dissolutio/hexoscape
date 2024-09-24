import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { CssBaseline } from '@mui/material'
import './app/theme.css'
import { UIContextProvider } from './hexopolis-ui/contexts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <UIContextProvider>
        <App />
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
