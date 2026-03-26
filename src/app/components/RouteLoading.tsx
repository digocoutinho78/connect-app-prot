import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { LoadingScreen } from './LoadingScreen';

export function RouteLoading({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Inicia o loading na mudança de rota
    setIsLoading(true);
    
    // Simula carregamento mínimo para suavizar transição
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {children}
    </>
  );
}