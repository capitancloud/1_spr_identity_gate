import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessCodeProvider } from "@/contexts/AccessCodeContext";
import AccessCodeGate from "@/components/AccessCodeGate";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

/**
 * =====================================
 * APP COMPONENT - ROOT DELL'APPLICAZIONE
 * =====================================
 * 
 * DOPPIO LIVELLO DI SICUREZZA:
 * 
 * 1° LIVELLO: AccessCodeGate
 *    - Prima barriera: richiede il codice segreto
 *    - Protegge TUTTA l'app
 * 
 * 2° LIVELLO: AuthProvider + ProtectedRoute
 *    - Seconda barriera: richiede login utente
 *    - Protegge solo le aree riservate (es: Dashboard)
 * 
 * Struttura dell'app:
 * - AccessCodeProvider: gestisce il codice di accesso
 * - AccessCodeGate: blocca l'app se il codice non è inserito
 * - AuthProvider: fornisce lo stato auth a tutta l'app
 * - Header: navigazione che cambia in base allo stato auth
 * - Routes: gestione delle pagine
 */

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 1° LIVELLO: Codice di accesso */}
      <AccessCodeProvider>
        {/* Gate che blocca l'app se il codice non è inserito */}
        <AccessCodeGate>
          {/* 2° LIVELLO: Autenticazione utente */}
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <Routes>
                {/* Route pubbliche (ma protette dal codice) */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Route protette - richiedono autenticazione */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* Catch-all per 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </AccessCodeGate>
      </AccessCodeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
