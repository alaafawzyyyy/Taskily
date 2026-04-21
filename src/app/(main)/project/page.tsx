'use client';
import AddProjectCard from '@/components/AddProjectCard';
import ProjectCard, { cardDetailsType } from '@/components/ProjectCard';
import ProjectFooter from '@/components/ProjectsFooter';
import { ProjectHeader } from '@/components/ProjectsHeader';
import Image from 'next/image';
import plus from '../../../../public/assets/icons/plus.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const limit = 5;

  const router = useRouter();
  // fetching the projects
  const fetchProjects = async () => {
    try {
      const offset = (currentPage - 1) * limit;
      setIsLoading(true);
      setError(false);
      const res = await ShowProjectAPI({ limit, offset });
      const contentRange = res.res?.headers.get('content-range');
      let totall: number = 0;

      if (contentRange) {
        totall = Number(contentRange.split('/')[1]);
        setTotal(totall);
      }

      if (res.ok && res.data) {
        setCards(
          res.data.map((item: cardDetailsType) => ({
            name: item.name,
            description: item.description,
            created_at: new Date(item.created_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
          })),
        );
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
    }
  };

  const totalPages:number = Math.ceil(total / limit);

  // Call the api with rendering
  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

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
        className="flex justify-end items-center"
      >
        <div className="md:hidden flex justify-center rounded-xl items-center w-14 h-14 bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
          <Image
            src={plus}
            alt="plus icon"
          />
        </div>
      </Link>
    </div>
  );
}
