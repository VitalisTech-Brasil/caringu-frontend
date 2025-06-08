import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes.jsx';
import './styles/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="186536025328-cgkr8nqmcbmp7kjkgqm70polq891qipi.apps.googleusercontent.com">
      <AppRoutes />
    </GoogleOAuthProvider>
  </StrictMode>
);
