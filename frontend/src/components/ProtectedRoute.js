'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getServerSnapshot() {
  return false;
}

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const authed = useSyncExternalStore(subscribe, isAuthenticated, getServerSnapshot);

  useEffect(() => {
    if (!authed) {
      router.replace('/login');
    }
  }, [authed, router]);

  if (!authed) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">กรุณาเข้าสู่ระบบก่อนใช้งาน...</p>
      </div>
    );
  }

  return children;
}
