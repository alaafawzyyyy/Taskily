import { getCookie, setCookie } from '../cookies';

type AuthRequest = {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
};

type LoginRequest = {
  email: string;
  password: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function refreshAccessToken() {
  const refreshToken = getCookie('refresh_token');
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) return null;

  setCookie('access_token', data.access_token);

  return data.access_token;
}

export async function auth(
  type: 'signup' | 'login',
  data: AuthRequest | LoginRequest,
) {
  const endpoint = type === 'login' ? 'token?grant_type=password' : 'signup';
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${SUPABASE_ANON_KEY!}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error_description || 'Invalid email or password');
  }

  if (type === 'login') {
    const { access_token, refresh_token, user } = result;

    setCookie('access_token', access_token);
    setCookie('refresh_token', refresh_token);

    return user;
  }
  return result;
}
