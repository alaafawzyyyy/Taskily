import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type ProjectData = {
  name: string;
  description?: string;
};
export async function AddProjectAPI(data: ProjectData) {
  const accessToken = getCookie('access_token');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    });

    if (!res.ok) {
      let message = '';

      try {
        const errData = await res.json();
        message = errData?.error || errData?.message;
      } catch {}

      return { ok: false, error: message };
    }

    return { ok: true, error: null };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'No internet connection',
    };
  }
}
