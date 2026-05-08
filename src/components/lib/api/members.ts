import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const accessToken = getCookie('access_token');

// Add Member
export type AddMemberType = {
  email: string;
  projectId: string;
};

export async function AddMemberAPI(finalData: AddMemberType) {
  let result = null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/invite_member`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_email: finalData.email,
        p_project_id: finalData.projectId,
        p_app_url: window.location.origin,
        p_base_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      }),
    });

    try {
      result = await res.json();
    } catch {}

    if (!res.ok) {
      const message =
        result?.error || result?.message || 'Something went wrong';

      return { ok: false, error: message };
    }

    return { ok: true, data: result, error: null };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'No internet connection',
    };
  }
}
