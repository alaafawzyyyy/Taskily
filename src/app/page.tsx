'use client';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const type = params.get('type');
    const error = params.get('error');
    if (type === 'recovery' || error) {
      window.location.href = `/reset-password#${hash}`;
    }
  }, []);
  return isOpen ? (
    <div >
      <Navbar isOpen={isOpen} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  ) : (
    <div>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex flex-col flex-1">
        <Navbar isOpen={isOpen} />
      </div>
    </div>
  );
}
