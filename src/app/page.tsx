'use client';
import { Navbar } from '@/components/Navbar';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const type = params.get('type');
    const error = params.get('error');
    if (type === 'recovery' || error) {
      window.location.href = `/reset-password#${hash}`;
    }
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
}
