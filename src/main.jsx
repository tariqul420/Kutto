import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';
import { RouterProvider } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss';
import 'swiper/swiper-bundle.css';
import './index.css';
import AuthProvider from './Provider/AuthProvider';
import ThemeProvider from './Provider/ThemeProvider';
import router from './Router/Router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
