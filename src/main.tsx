import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import './app/theme.css'
import { UIContextProvider } from './hexopolis-ui/contexts'

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
          <App />
        </UIContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
