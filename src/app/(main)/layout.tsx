'use client';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { SidebarMenu } from '../../components/SideMenu';
import { useEffect, useState } from 'react';
type childrenProps = {
  children: React.ReactNode;
};
export default function Home({ children }: childrenProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[45] md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed h-full w-[80%] max-w-[300px] bg-[#F1F3FF] z-[50] p-4 md:hidden">
            <Sidebar
              isOpen={true}
              setIsOpen={setIsOpen}
            />
          </div>
        </>
      )}
      {!isOpen ? (
        <div className="flex flex-col w-full bg-[#F9F9FF]">
          <Navbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          <div className="flex flex-1">
            <Sidebar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <main className="flex-col flex flex-1 items-center w-full">
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col bg-[#F9F9FF]">
          <div className="flex w-full">
            <Sidebar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <div className="flex flex-col flex-1">
              <Navbar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
              <main className="w-full">{children}</main>
            </div>
          </div>
        </div>
      )}
      <div>
        <SidebarMenu isOpen={isOpen} />
      </div>
    
    </>
  );
}
