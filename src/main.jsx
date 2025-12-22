import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './context/LoadingProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <ThemeProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </ThemeProvider>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>

)
