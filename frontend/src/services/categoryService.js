import { apiFetch } from '@/lib/apiClient';

export function getCategories() {
  return apiFetch('/api/categories');
}
