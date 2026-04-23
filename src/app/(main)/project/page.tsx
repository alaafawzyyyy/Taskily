'use client';
import AddProjectCard from '@/components/AddProjectCard';
import ProjectCard, { cardDetailsType } from '@/components/ProjectCard';
import ProjectFooter from '@/components/ProjectsFooter';
import { ProjectHeader } from '@/components/ProjectsHeader';
import Image from 'next/image';
import plus from '../../../../public/assets/icons/plus.svg';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ShowProjectAPI } from '@/components/lib/api/ProjectAPI';
import { NoProjects } from '@/components/NoProjects';
import { useRouter } from 'next/navigation';
import { SkeletonCard } from '@/components/SkeletonCard';
import { ProjectErrorPage } from '@/components/ProjectErrorPage';

export default function Project() {
  const [cards, setCards] = useState<cardDetailsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const limit = 5;

  const router = useRouter();
  // fetching the projects
  const fetchProjects = async () => {
    try {
      const offset = (currentPage - 1) * limit;
      
      if (currentPage === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      setError(false);
      const res = await ShowProjectAPI({ limit, offset });
      const contentRange = res.res?.headers.get('content-range');
      let totall: number = 0;

      if (contentRange) {
        totall = Number(contentRange.split('/')[1]);
        setTotal(totall);
      }

      if (res.ok && res.data) {
        const newData = res.data.map((item: cardDetailsType) => ({
          name: item.name,
          description: item.description,
          id:item.id,
          created_at: new Date(item.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
        }));
        
        // showing the whole pages for mobiles and the selected page for desktop
        if (isMobile) {
          if (currentPage === 1) {
            setCards(newData);
          } else {
            setCards((prev) => [...prev, ...newData]);
          }
        } else {
          setCards(newData);
        }
      } else if (res.status === 401) {
        setError(false);
        router.push('/login');
        return;
      } else {
        setError(true);
        console.log(res.error);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };
  const totalPages:number = Math.ceil(total / limit);

  // Call the api with rendering
  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  // checking mobile to activate the infinite scroll
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  // checking the element for fetching new pages in infinite scrolling
  useEffect(() => {
    if (!isMobile) return;

    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (
        entry.isIntersecting &&
        !isLoading &&
        !isLoadingMore &&
        currentPage < totalPages
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, isLoading, isLoadingMore, totalPages, isMobile]);

  // Check loading
  if (isLoading) {
    return (
      <div className="flex flex-col p-6 gap-6 md:py-8 md:gap-10 pb-20 md:pb-8 justify-between">
        <ProjectHeader isLoading={isLoading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-8 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );

    // check error
  } else if (Error) return <ProjectErrorPage retry={fetchProjects} />;

  return cards.length === 0 && !isLoading ? (
    <NoProjects />
  ) : (
    <div className="flex flex-col p-6 gap-6 md:py-8 md:gap-10 pb-20 md:pb-8 justify-between">
      <ProjectHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-8 w-full">
        {cards.map((card, key) => (
          <ProjectCard
            data={card}
            key={key}
          />
        ))}
        <AddProjectCard />
      </div>
      <ProjectFooter
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Link
        href="/project/add"
        className="fixed bottom-20 right-6 md:hidden z-50"
      >
        <div className="md:hidden flex justify-center rounded-xl items-center w-14 h-14 bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
          <Image
            src={plus}
            alt="plus icon"
          />
        </div>
      </Link>
      
      <div className="block md:hidden">
        {isLoadingMore && <p className="flex justify-center items-center py-4">Loading...</p>}

        <div ref={loadMoreRef}></div>
      </div>{' '}
    </div>
  );
}
