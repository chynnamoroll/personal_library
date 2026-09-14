'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import BookCardSkeleton from '@/components/BookCardSkeleton';

const placeholderBooks = [
  { id: 1, title: 'แดนสมมุติ', author: 'วินทร์ เลียววาริณ', category: 'วรรณกรรม' },
  { id: 2, title: 'เชิงตะกอน', author: 'เสกสรรค์ ประเสริฐกุล', category: 'สารคดี' },
  { id: 3, title: 'ความสุขของกะทิ', author: 'งามพรรณ เวชชาชีวะ', category: 'วรรณกรรมเยาวชน' },
  { id: 4, title: 'คู่มือมนุษย์', author: 'พุทธทาสภิกขุ', category: 'ธรรมะ' },
];

function FilterDropdown({ label }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border border-(--plib-border) px-4 py-2.5 text-[13.5px] font-medium"
      style={{ background: 'var(--plib-surface)', color: 'var(--plib-text)' }}
    >
      <span>{label}</span>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--plib-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function HomeContent() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col gap-6 px-10 pb-12 pt-9">
        <div className="flex flex-col gap-1">
          <h1 className="plib-serif text-[27px] font-bold" style={{ color: 'var(--plib-text)' }}>
            หนังสือทั้งหมด
          </h1>
          <span className="text-[13.5px]" style={{ color: 'var(--plib-text-muted)' }}>
            ทั้งหมด {placeholderBooks.length} เล่มในคลังของคุณ
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <FilterDropdown label="หมวดหมู่: ทั้งหมด" />
            <FilterDropdown label="ผู้แต่ง: ทั้งหมด" />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13.5px] font-semibold"
            style={{ background: 'var(--plib-accent)', color: 'var(--plib-accent-contrast)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>เพิ่มหนังสือ</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderBooks.map((book) => (
            <BookCard key={book.id} title={book.title} author={book.author} category={book.category} />
          ))}
          <BookCardSkeleton />
          <BookCardSkeleton />
        </div>
      </main>
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
