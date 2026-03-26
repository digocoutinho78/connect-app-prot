import { Outlet } from 'react-router';
import { RouteLoading } from '../components/RouteLoading';
import { BrandProvider } from '../contexts/BrandContext';
import { Toaster } from 'sonner';

export function RootLayout() {
  return (
    <BrandProvider>
      <RouteLoading>
        <Outlet />
      </RouteLoading>
      <Toaster position="top-center" richColors />
    </BrandProvider>
  );
}