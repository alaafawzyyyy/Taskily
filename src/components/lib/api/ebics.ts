import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessToken = getCookie('access_token');


type ebicData = {
  title: string;
  description?: string;
  assignee_id:string;
  project_id:string,
  deadline:string
};

// Create Ebic API
export async function CreateEbic(data: ebicData) {
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
        assignee_id:data.assignee_id,
        project_id:data.project_id,
        deadline:data.deadline
      }),
    });

    if (!res.ok) {
      let message = '';

      try {
        const errData = await res.json();
        message = errData?.error || errData?.message;
      } catch {}

      return { ok: false, error: message , res };
    }

    return { ok: true, error: null,res };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'No internet connection',
    };
  }
}
