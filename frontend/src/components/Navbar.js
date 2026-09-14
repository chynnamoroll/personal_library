'use client';

import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.replace('/login');
  }

  return (
    <header
      className="flex h-[76px] items-center justify-between px-10"
      style={{ background: 'var(--plib-surface)', borderBottom: '1px solid var(--plib-border)' }}
    >
      <div className="flex items-center gap-3">
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="var(--plib-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5.5c2.2-.9 4.6-.9 6.8 0 .3.1.5.4.5.7v11.6c0 .5-.5.9-1 .7-1.9-.7-4-.7-5.9 0-.5.2-1-.2-1-.7V6.2c0-.3.2-.6.6-.7Z" />
          <path d="M21 5.5c-2.2-.9-4.6-.9-6.8 0-.3.1-.5.4-.5.7v11.6c0 .5.5.9 1 .7 1.9-.7 4-.7 5.9 0 .5.2 1-.2 1-.7V6.2c0-.3-.2-.6-.6-.7Z" />
        </svg>
        <div className="flex flex-col leading-tight">
          <span className="plib-serif text-[18px] font-bold" style={{ color: 'var(--plib-text)' }}>
            Personal Book Library
          </span>
          <span className="text-[11.5px] font-medium tracking-wide" style={{ color: 'var(--plib-text-muted)' }}>
            คลังหนังสือส่วนตัว
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-2">
        <span
          className="pb-2 text-[14.5px] font-semibold"
          style={{ color: 'var(--plib-accent)', borderBottom: '2px solid var(--plib-accent)' }}
        >
          หนังสือทั้งหมด
        </span>
      </nav>

      <div className="flex items-center gap-3.5">
        <div
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[13px] font-bold"
          style={{ background: 'var(--plib-avatar-bg)', color: 'var(--plib-accent)' }}
        >
          A
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-(--plib-border) px-[18px] py-[9px] text-[13.5px] font-semibold"
          style={{ color: 'var(--plib-text-muted)' }}
        >
          ออกจากระบบ
        </button>
      </div>
    </header>
  );
}
