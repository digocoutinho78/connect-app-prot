export const AUTH_SESSION_KEY = 'connect_auth_unlocked';

const PUBLIC_ROUTES = new Set([
  '/',
  '/login',
  '/activation-expired',
  '/activation-success',
]);

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.has(pathname);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
}

export function setAuthenticated(): void {
  sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
}
