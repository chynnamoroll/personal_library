'use client';

import { useEffect, useState } from 'react';
import { createBook } from '@/services/bookService';
import Select from '@/components/Select';

const STATUS_OPTIONS = [
  { value: 'unread', label: 'ยังไม่ได้อ่าน' },
  { value: 'reading', label: 'กำลังอ่าน' },
  { value: 'completed', label: 'อ่านจบแล้ว' },
  { value: 'wishlist', label: 'อยากอ่าน' },
];

export default function AddBookModal({ categories, authors, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorIds, setAuthorIds] = useState([]);
  const [status, setStatus] = useState('unread');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function toggleAuthor(id) {
    setAuthorIds((prev) => (prev.includes(id) ? prev.filter((authorId) => authorId !== id) : [...prev, id]));
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!title.trim() || !categoryId || authorIds.length === 0) {
      setError('กรุณากรอกชื่อหนังสือ เลือกหมวดหมู่ และผู้แต่งอย่างน้อย 1 คน');
      return;
    }

    setSubmitting(true);
    try {
      const book = await createBook({
        title: title.trim(),
        categoryId: Number(categoryId),
        authorIds: authorIds.map(Number),
        status,
      });
      onCreated(book);
    } catch (err) {
      setError(err.message || 'เพิ่มหนังสือไม่สำเร็จ');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="plib-modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'oklch(0.2 0.02 260 / 0.4)' }}
      onClick={onClose}
    >
      <form
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="plib-modal-panel w-full max-w-md rounded-[10px] border border-(--plib-border-soft) p-6"
        style={{ background: 'var(--plib-surface)' }}
      >
        <h2 className="plib-serif mb-5 text-xl font-bold" style={{ color: 'var(--plib-text)' }}>
          เพิ่มหนังสือ
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="new-book-title" className="mb-1 block text-sm font-medium" style={{ color: 'var(--plib-text-muted)' }}>
              ชื่อหนังสือ
            </label>
            <input
              id="new-book-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="plib-input w-full rounded-lg border border-(--plib-border) bg-transparent px-3 py-2 text-sm outline-none"
              style={{ color: 'var(--plib-text)' }}
            />
          </div>

          <div>
            <label htmlFor="new-book-category" className="mb-1 block text-sm font-medium" style={{ color: 'var(--plib-text-muted)' }}>
              หมวดหมู่
            </label>
            <Select id="new-book-category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium" style={{ color: 'var(--plib-text-muted)' }}>
              ผู้แต่ง (เลือกได้มากกว่า 1 คน)
            </span>
            <div className="flex max-h-32 flex-col gap-0.5 overflow-y-auto rounded-lg border border-(--plib-border) p-2">
              {authors.map((author) => (
                <label
                  key={author.id}
                  className="plib-checkbox-row flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm"
                  style={{ color: 'var(--plib-text)' }}
                >
                  <input
                    type="checkbox"
                    checked={authorIds.includes(String(author.id))}
                    onChange={() => toggleAuthor(String(author.id))}
                  />
                  {author.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="new-book-status" className="mb-1 block text-sm font-medium" style={{ color: 'var(--plib-text-muted)' }}>
              สถานะ
            </label>
            <Select id="new-book-status" value={status} onChange={(event) => setStatus(event.target.value)}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {error && (
            <p className="text-sm" style={{ color: 'oklch(0.55 0.18 25)' }} role="alert">
              {error}
            </p>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="plib-btn-outline cursor-pointer rounded-lg border border-(--plib-border) px-4 py-2 text-sm font-semibold"
              style={{ color: 'var(--plib-text-muted)' }}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="plib-btn-primary cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'กำลังบันทึก...' : 'บันทึก'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
