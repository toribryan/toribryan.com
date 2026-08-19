import type { APIRoute } from 'astro';
import { SITE_AUTH_COOKIE, hashPassword } from '../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password')?.toString() ?? '';
  const redirectTo = formData.get('redirect')?.toString() || '/';

  const expected = import.meta.env.SITE_PASSWORD as string | undefined;

  if (expected && password === expected) {
    cookies.set(SITE_AUTH_COOKIE, await hashPassword(expected), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return redirect(redirectTo);
  }

  return redirect(`/login?error=1&redirect=${encodeURIComponent(redirectTo)}`);
};
