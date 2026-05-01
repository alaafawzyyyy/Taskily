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

// get tasks by epic
export async function GetTasksAPI(Epic_Id: string) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/project_tasks?epic_id=eq.${Epic_Id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
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

// get tasks
export async function GetTasks({
  projectId,
  epicId,
  status,
}: {
  projectId: string;
  epicId?: string;
  status?: string;
}) {
  try {
    let url = `${SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}`;

    if (epicId) {
      url += `&epic_id=eq.${epicId}`;
    }

    if (status) {
      url += `&status=eq.${status}`;
    }

    url += `&order=created_at.desc`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
    });

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
