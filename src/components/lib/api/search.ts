import { getCookie } from '../cookies';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const accessToken = getCookie('access_token');

type SearchProps = {
  table: string;
  projectId?: string;
  limit?: number;
  offset?: number;
  search?: string;
  field?: string;
};

export async function searchItems<T>({
  table,
  projectId,
  limit,
  offset,
  search,
  field = 'title',
}: SearchProps): Promise<{
  ok: boolean;
  status: number;
  data: T[];
  error: string | null;
  res: Response;
}> {
  let url = `${SUPABASE_URL}/rest/v1/${table}?`;

  const params = [];

  if (projectId) {
    params.push(`project_id=eq.${projectId}`);
  }

  if (search) {
    params.push(`${field}=ilike.*${search.trim()}*`);
  }

  if (limit !== undefined) {
    params.push(`limit=${limit}`);
  }

  if (offset !== undefined) {
    params.push(`offset=${offset}`);
  }

  url += params.join('&');

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
      Prefer: 'count=exact',
    },
  });

const data: T[] = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
    error: res.ok ? null : 'Request failed',
    res,
  };
}
