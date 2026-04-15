import { getCookie } from '../cookies';
import { refreshAccessToken } from './auth';

export async function fetchWithAuth(url: string, options: any = {}) {
  const accessToken = getCookie('access_token');

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) return res;

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return res;
}
