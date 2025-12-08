import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes.jsx';
import './styles/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { FotoPerfilProvider } from "./context/FotoPerfilContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="186536025328-cgkr8nqmcbmp7kjkgqm70polq891qipi.apps.googleusercontent.com">
      <FotoPerfilProvider>
        <AppRoutes />
      </FotoPerfilProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
