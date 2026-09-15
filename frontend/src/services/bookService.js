import { apiFetch } from '@/lib/apiClient';

export function getBooks({ categoryId, authorId } = {}) {
  const params = new URLSearchParams();
  if (categoryId) params.set('categoryId', categoryId);
  if (authorId) params.set('authorId', authorId);
  const query = params.toString();

  return apiFetch(`/api/books${query ? `?${query}` : ''}`);
}

export function createBook(data) {
  return apiFetch('/api/books', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteBook(id) {
  return apiFetch(`/api/books/${id}`, { method: 'DELETE' });
}
