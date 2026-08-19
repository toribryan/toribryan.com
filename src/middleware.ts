import { defineMiddleware } from 'astro:middleware';
import { SITE_AUTH_COOKIE, hashPassword } from './lib/auth';

const PUBLIC_PATHS = new Set(['/login', '/api/login', '/favicon.svg', '/favicon.ico']);

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith('/_astro/') || pathname.startsWith('/_image')) {
    return next();
  }

  const password = import.meta.env.SITE_PASSWORD as string | undefined;

  // No password configured — leave the site open rather than lock everyone out.
  if (!password) {
    return next();
  }

  const expectedHash = await hashPassword(password);
  const cookieValue = context.cookies.get(SITE_AUTH_COOKIE)?.value;

  if (cookieValue === expectedHash) {
    return next();
  }

  return context.redirect('/login');
});
