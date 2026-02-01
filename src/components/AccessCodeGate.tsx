import React from 'react';
import { useAccessCode } from '@/contexts/AccessCodeContext';
import AccessCode from '@/pages/AccessCode';

/**
 * =====================================
 * ACCESS CODE GATE - IL CANCELLO PRINCIPALE
 * =====================================
 * 
 * Questo componente avvolge tutta l'app.
 * Se l'utente non ha inserito il codice corretto,
 * mostra la schermata di inserimento codice.
 * 
 * È come un cancello all'ingresso di un parco:
 * - Cancello chiuso → vedi solo la richiesta del codice
 * - Cancello aperto → puoi entrare e vedere tutto il resto
 */

interface AccessCodeGateProps {
  children: React.ReactNode;
}

const AccessCodeGate: React.FC<AccessCodeGateProps> = ({ children }) => {
  const { isUnlocked } = useAccessCode();

  // Se l'app non è sbloccata, mostra la pagina del codice
  if (!isUnlocked) {
    return <AccessCode />;
  }

  // Se sbloccata, mostra il contenuto dell'app
  return <>{children}</>;
};

export default AccessCodeGate;
