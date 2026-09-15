import { getToken, clearToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const hadToken = Boolean(token);
    clearToken();
    if (hadToken && typeof window !== 'undefined') {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- this module has no router (called outside React), and a hard reload is intentional to fully clear state after an invalidated session
      window.location.assign('/login');
    }
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(data?.message || 'Request failed', response.status);
  }

  return data;
}
