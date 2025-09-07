import React from 'react';

interface LoadingOverlayProps {
  message?: string;
  subMessage?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Processando...',
  subMessage = 'Por favor, aguarde enquanto os arquivos são processados.'
}) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      background: '#fff',
      padding: '32px 48px',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-2"></div>
      <span style={{ fontWeight: 600, fontSize: 18 }}>{message}</span>
      <span style={{ color: '#666', fontSize: 14 }}>{subMessage}</span>
    </div>
  </div>
);

export default LoadingOverlay;
