import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import './app/theme.css'
import { UIContextProvider } from './hooks/ui-context'
import { EventProvider } from './hooks/useEvent'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UIContextProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </UIContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
