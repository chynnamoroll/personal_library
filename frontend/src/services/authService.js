import { apiFetch } from '@/lib/apiClient';
import { setToken } from '@/lib/auth';

export async function login(username, password) {
  const data = await apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  setToken(data.token);
  return data.user;
}
