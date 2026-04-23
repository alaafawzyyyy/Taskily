import { getCookie } from '../cookies';

type ProjectData = {
  name: string;
  description?: string;
};
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessToken = getCookie('access_token');

// Add Project API
export async function AddProjectAPI(data: ProjectData) {
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

// Get projects API
type prop = {
  limit: number;
  offset: number;
};

export async function ShowProjectAPI({ limit, offset }: prop) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
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

// patch project Api
export async function PatchProject({
  data,
  projectId,
}: {
  data: ProjectData;
  projectId: string;
}) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      },
    );
    let d = null;
    try {
      d = await res.json();
    } catch {}
    return {
      ok: res.ok,
      status: res.status,
      d,
      error: res.ok ? null : d?.message || 'Request failed',
      res,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 0,
      d: null,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

// get project Api
export async function getProjectById({ projectId }: { projectId: string }) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
        },
      },
    );
    let d = null;
    try {
      d = await res.json();
    } catch {}
    return {
      ok: res.ok,
      status: res.status,
      data:d,
      error: res.ok ? null : d?.message || 'Request failed',
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
