import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router'
import AuthProvider from './Provider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-quill/dist/quill.snow.css';
import 'swiper/swiper-bundle.css';
import "react-datepicker/dist/react-datepicker.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './Provider/ThemeProvider'
import 'sweetalert2/src/sweetalert2.scss'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position='top-right' reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
