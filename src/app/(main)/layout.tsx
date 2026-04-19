'use client';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useEffect, useState } from 'react';
type childrenProps = {
  children: React.ReactNode;
};
export default function Home({ children }: childrenProps) {
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
    <div className="flex flex-col w-full bg-[#F9F9FF]">
      <Navbar  isOpen={isOpen} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <main className="flex flex-1 justify-center">{children}</main>
      </div>
    </div>
  ) : (
    <div className="flex w-full bg-[#F9F9FF]">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex flex-col flex-1">
        <Navbar isOpen={isOpen} />
        <main >{children}</main>
      </div>
    </div>
  );
}
