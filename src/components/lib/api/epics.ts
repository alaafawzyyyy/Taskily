import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessToken = getCookie('access_token');

type epicData = {
  title: string;
  description?: string;
  assignee_id: string;
  project_id: string;
  deadline: string;
};

// Create Epic API
export async function CreateEbic(data: epicData) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/epics`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        assignee_id: data.assignee_id,
        project_id: data.project_id,
        deadline: data.deadline,
      }),
    });

    if (!res.ok) {
      let message = '';

      try {
        const errData = await res.json();
        message = errData?.error || errData?.message;
      } catch {}

      return { ok: false, error: message, res };
    }

    return { ok: true, error: null, res };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'No internet connection',
    };
  }
}

// Get Epics
type prop = {
  limit: number;
  offset: number;
  projectId: string;
};

export async function GetEpics({ projectId, limit, offset }: prop) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
          Prefer: 'count=exact',
        },
      },
    );
    let data = null;
    try {
      data = await res.json();
    } catch {}
    return {
      ok: res.ok,
      status: res.status,
      data,
      error: res.ok ? null : data?.message || 'Request failed',
      res,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}
