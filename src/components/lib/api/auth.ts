type AuthRequest = {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
};

type LoginRequest={
    email: string;
  password: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function auth(type: 'signup' | 'login', data: AuthRequest| LoginRequest ) {
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

  return res.json();
}
