'use client';

import { useCallback, useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import AddBookModal from '@/components/AddBookModal';
import Select from '@/components/Select';
import { getBooks, deleteBook } from '@/services/bookService';
import { getCategories } from '@/services/categoryService';
import { getAuthors } from '@/services/authorService';

function FilterSelect({ label, value, onChange, options }) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)} className="min-w-[160px]">
      <option value="">{label}: ทั้งหมด</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}

function HomeContent() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBooks({
        categoryId: categoryFilter || undefined,
        authorId: authorFilter || undefined,
      });
      setBooks(data);
    } catch (err) {
      setError(err.message || 'โหลดรายการหนังสือไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, authorFilter]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getAuthors().then(setAuthors).catch(() => {});
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching books on mount/filter change has no non-effect equivalent without a data-fetching library
    loadBooks();
  }, [loadBooks]);

  async function handleDelete(id) {
    const previousBooks = books;
    setBooks((current) => current.filter((book) => book.id !== id));

    try {
      await deleteBook(id);
    } catch (err) {
      setBooks(previousBooks);
      setError(err.message || 'ลบหนังสือไม่สำเร็จ');
    }
  }

  function handleCreated(newBook) {
    setBooks((current) => [newBook, ...current]);
    setIsAddModalOpen(false);
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col gap-6 px-10 pb-12 pt-9">
        <div className="flex flex-col gap-1">
          <h1 className="plib-serif text-[27px] font-bold" style={{ color: 'var(--plib-text)' }}>
            หนังสือทั้งหมด
          </h1>
          <span className="text-[13.5px]" style={{ color: 'var(--plib-text-muted)' }}>
            ทั้งหมด {books.length} เล่มในคลังของคุณ
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect label="หมวดหมู่" value={categoryFilter} onChange={setCategoryFilter} options={categories} />
            <FilterSelect label="ผู้แต่ง" value={authorFilter} onChange={setAuthorFilter} options={authors} />
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="plib-btn-primary flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-[13.5px] font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>เพิ่มหนังสือ</span>
          </button>
        </div>

        {error && (
          <p className="text-sm" style={{ color: 'oklch(0.55 0.18 25)' }} role="alert">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => <BookCardSkeleton key={index} />)
            : books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.authors?.map((author) => author.name).join(', ') || 'ไม่ระบุผู้แต่ง'}
                  category={book.category_name || 'ไม่ระบุหมวดหมู่'}
                  onDelete={() => handleDelete(book.id)}
                />
              ))}
        </div>

        {!loading && books.length === 0 && !error && (
          <p className="text-sm" style={{ color: 'var(--plib-text-muted)' }}>
            ยังไม่มีหนังสือในคลัง ลองเพิ่มเล่มแรกดูสิ
          </p>
        )}
      </main>

      {isAddModalOpen && (
        <AddBookModal
          categories={categories}
          authors={authors}
          onClose={() => setIsAddModalOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}
