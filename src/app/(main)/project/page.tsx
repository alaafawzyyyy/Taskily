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
import router from 'next/router';
import toast from 'react-hot-toast';

export default function Project() {
  const [cards, setCards] = useState<cardDetailsType[]>([]);

  useEffect(() => {
    const fetchprojects = async () => {
      const res = await ShowProjectAPI();

      if (res.ok && res.data) {
        setCards(
          res.data.slice(0, 5).map((item: cardDetailsType) => ({
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
        router.push('/login');
      } else {
        toast.error(`Failed to create project: ${res.error}`);
      }
    };
    fetchprojects();
  }, []);

  return cards.length === 0 ? (
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
      <ProjectFooter />
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
