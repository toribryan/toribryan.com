import type { APIRoute } from 'astro';
import { SITE_AUTH_COOKIE, hashPassword } from '../../lib/auth';

export const prerender = false;

const ERROR_COOKIE = 'site_auth_error';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password')?.toString() ?? '';

  const expected = import.meta.env.SITE_PASSWORD as string | undefined;

  if (expected && password === expected) {
    cookies.set(SITE_AUTH_COOKIE, await hashPassword(expected), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return redirect('/');
  }

  cookies.set(ERROR_COOKIE, '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 10,
  });
  return redirect('/login');
};
