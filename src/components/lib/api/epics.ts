import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessToken = getCookie('access_token');

type epicData = {
  title: string;
  description?: string;
  assignee_id: string | null;
  project_id: string;
  deadline: string | null;
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
  limit?: number;
  offset?: number;
  projectId: string;
};

export async function GetEpics({ projectId, limit, offset }: prop) {
  const query = new URLSearchParams({
    project_id: `eq.${projectId}`,
  });

  if (limit !== undefined) {
    query.append('limit', String(limit));
  }

  if (offset !== undefined) {
    query.append('offset', String(offset));
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/project_epics?${query.toString()}`,
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

type GetEpicDetailsProps = {
  projectId: string;
  selectedEpicId: string;
};
// get epic details
export async function GetEpicDetails({
  projectId,
  selectedEpicId,
}: GetEpicDetailsProps) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${selectedEpicId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.json();

    return data[0];
  } catch (err) {
    console.log(err);
  }
}

// patch epics
export async function UpdateEpic({
  data,
  selectedEpicId,
}: {
  data: Partial<epicData>;
  selectedEpicId: string;
}) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/epics?id=eq.${selectedEpicId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    let d = null;
    try {
      d = await res.json();
    } catch {}
    console.log(res);
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
