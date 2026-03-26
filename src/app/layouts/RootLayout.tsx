import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { RouteLoading } from '../components/RouteLoading';
import { BrandProvider } from '../contexts/BrandContext';
import { Toaster } from 'sonner';
import { isAuthenticated, isPublicRoute } from '../auth';

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const authenticated = isAuthenticated();
    const onPublicRoute = isPublicRoute(location.pathname);

    if (!authenticated && !onPublicRoute) {
      navigate('/login', { replace: true });
      return;
    }

    if (authenticated && location.pathname === '/login') {
      navigate('/brand-selection', { replace: true });
      return;
    }

    setReady(true);
  }, [location.pathname, navigate]);

  if (!ready) {
    return null;
  }

  return (
    <BrandProvider>
      <RouteLoading>
        <Outlet />
      </RouteLoading>
      <Toaster position="top-center" richColors />
    </BrandProvider>
  );
}