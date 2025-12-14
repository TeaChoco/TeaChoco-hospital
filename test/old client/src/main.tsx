//-Path: "TeaChoco-Hospital/client/src/main.tsx"
import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId="your-google-client-id-here">
                <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
