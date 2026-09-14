'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      router.push('/');
    } catch (err) {
      setError(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4" style={{ background: 'var(--plib-bg)' }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[10px] border border-(--plib-border-soft) p-8"
        style={{ background: 'var(--plib-surface)', boxShadow: '0 2px 6px oklch(0.4 0.05 55 / 0.06)' }}
      >
        <h1 className="plib-serif mb-6 text-center text-2xl font-bold" style={{ color: 'var(--plib-text)' }}>
          เข้าสู่ระบบ
        </h1>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium" style={{ color: 'var(--plib-text-muted)' }}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-(--plib-border) bg-transparent px-3 py-2 text-sm outline-none"
              style={{ color: 'var(--plib-text)' }}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium" style={{ color: 'var(--plib-text-muted)' }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-(--plib-border) bg-transparent px-3 py-2 text-sm outline-none"
              style={{ color: 'var(--plib-text)' }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: 'oklch(0.55 0.18 25)' }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: 'var(--plib-accent)', color: 'var(--plib-accent-contrast)' }}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </div>
      </form>
    </div>
  );
}
