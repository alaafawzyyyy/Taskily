import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessToken = getCookie('access_token');

// Add task
type TaskData = {
  project_id: string;
  epic_id?: string;
  title: string;
  description?: string;
  assignee_id?: string;
  due_date?: string;
  status?: string;
};
export async function addTask(data: TaskData) {
  let result = null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
