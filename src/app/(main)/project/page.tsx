'use client';
import AddProjectCard from '@/components/AddProjectCard';
import ProjectCard from '@/components/ProjectCard';
import ProjectFooter from '@/components/ProjectsFooter';
import { ProjectHeader } from '@/components/ProjectsHeader';
import Image from 'next/image';
import plus from '../../../../public/assets/icons/plus.svg';
import Link from 'next/link';

const cards = [
  {
    name: 'Skyline Residence Phase II',
    description:
      'Structural review and aestheticcuration for the high-rise residential complex in the downtown district.',
    date: '12 Oct 2025',
  },
  {
    name: 'Skyline Residence Phase II',
    description:
      'Structural review and aestheticcuration for the high-rise residential complex in the downtown district.',
    date: '12 Oct 2025',
  },
  {
    name: 'Skyline Residence Phase II',
    description:
      'Structural review and aestheticcuration for the high-rise residential complex in the downtown district.',
    date: '12 Oct 2025',
  },
  {
    name: 'Skyline Residence Phase II',
    description:
      'Structural review and aestheticcuration for the high-rise residential complex in the downtown district.',
    date: '12 Oct 2025',
  },
];

export default function Project() {
  return (
    <div className="flex flex-col p-6 gap-6 md:p-8 md:gap-10 pb-20 md:pb-8">
      <ProjectHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-8">
        {cards.map((card, key) => (
          <ProjectCard
            data={card}
            key={key}
          />
        ))}
        <AddProjectCard />
      </div>
      <ProjectFooter />
      <Link href="/project/add" className="flex justify-end items-center">
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
