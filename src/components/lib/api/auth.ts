'use client';
import { getCookie, setCookie, deleteCookie } from '../cookies';

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

// get new access token
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

// authorization
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

// sending email

export async function sendResetLink(email: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${SUPABASE_ANON_KEY!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  return { ok: res.ok, data };
}

// reset password

export async function resetPassword(password: string, accessToken: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to reset password');
  }
  return data;
}

// get user data
export async function getUser() {
  const token = getCookie('access_token');
  if (!token) throw new Error('No token');
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch user');

  return res.json();
}

// log out
export async function logout() {
  const accessToken = getCookie('access_token');
  if (!accessToken) {
    throw new Error('No token found');
  }

  const res = await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }

  deleteCookie('access_token');
  deleteCookie('refresh_token');
  return true;
}
