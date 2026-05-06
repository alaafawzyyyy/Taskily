import { getCookie } from '../cookies';
import { searchItems } from './search';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessToken = getCookie('access_token');

// Add task
export type TaskData = {
  id: string;
  task_id: string;
  project_id: string;
  epic_id?: string | null;
  title: string;
  description?: string | null;
  assignee_id?: string | null;
  due_date?: string | null;
  status: string;
  assignee: {
    name: string;
  };
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

export async function GetTasks({
  projectId,
  epicId,
  status,
  search,
  limit,
  offset,
}: {
  projectId: string;
  epicId?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    const res = await searchItems({
      table: 'project_tasks',
      projectId,
      search,
      limit,
      offset,
      field: 'title',
    });

    let data: TaskData[] = (res.data as TaskData[]) || [];

    if (epicId) {
      data = data.filter((t) => t.epic_id === epicId);
    }

    if (status) {
      data = data.filter((t) => t.status === status);
    }
    return {
      ok: res.ok,
      status: res.status,
      data,
      error: res.error,
      res: res.res,
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

type GetTaskDetailsProp = {
  projectId: string;
  taskId: string;
};
// get task details
export async function GetTaskDetails({
  projectId,
  taskId,
}: GetTaskDetailsProp) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`,
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

// update tasks

export async function updateTaskStatus({
  taskId,
  status,
}: {
  taskId: string;
  status: string;
}) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/tasks?id=eq.${taskId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const error = await res.text();
      return { ok: false, error };
    }

    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false, error: 'Network error' };
  }
}
