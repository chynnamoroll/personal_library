import { apiFetch } from '@/lib/apiClient';

export function getAuthors() {
  return apiFetch('/api/authors');
}
