import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./i18n.tsx";
import { BrowserRouter } from "react-router";
// @ts-ignore
import "milligram";
import {AuthProvider} from "./AuthContext.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
