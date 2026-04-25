'use client';
import { useEffect, useState } from 'react';
import { Epic, EpicCard } from './EpicCard';
import { useParams, useRouter } from 'next/navigation';
import { GetEpics } from '../lib/api/epics';
import { ProjectErrorPage } from '../ProjectErrorPage';
import { NoProjects } from '../NoProjects';
import Image from 'next/image';
import noepics from '../../../public/assets/icons/noepics.svg';
import createepic from '../../../public/assets/icons/createepic.svg';
import hierarchy from '../../../public/assets/icons/hierarchy.svg';
import velocity from '../../../public/assets/icons/velocity.svg';
import highgoals from '../../../public/assets/icons/highgoals.svg';
import { ShowEpicsHeader } from './ShowEpicsHeader';
import { SkeletonEpics } from './SkeletonEpics';

const footerDate = [
  {
    img: highgoals,
    title: 'High-Level Goals',
    message: 'Define the broad objectives that span across multiple cycles.',
  },

  {
    img: hierarchy,
    title: 'Hierarchy Design',
    message: 'Link individual tasks to parent epics for a consolidated view.',
  },

  {
    img: velocity,
    title: 'Track Velocity',
    message: 'Visualize percentage completion at a macro project level.',
  },
];

export function ShowEpics() {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  const fetchEpics = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(false);
      const res = await GetEpics({ projectId });

      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (res.ok) {
        const data = res.data;
        setEpics(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpics();
  }, [projectId]);

  if (error) {
    return (
      <ProjectErrorPage
        retry={fetchEpics}
        message="We're having trouble retrieving your project epics right now. Please try again in a moment."
      />
    );
  }

  if (isLoading) {
    return <SkeletonEpics />;
  }

  return epics.length === 0 && !isLoading ? (
    <div className="flex flex-col gap-16 items-center">
      <NoProjects
        image={noepics}
        title="No epics in this project yet."
        message="Break down your large project into manageable epics to track progress better and maintain architectural clarity."
        button="Create First Epic"
        buttonimage={createepic}
        onClick={() => router.push(`/project/${projectId}/epics/new`)}
      />
      <div className="flex gap-6 w-[672px] ">
        {footerDate.map((data, id) => (
          <div
            key={id}
            className="bg-[#F1F3FF] p-4 rounded-lg border flex flex-col gap-1"
          >
            <Image
              src={data.img}
              alt={data.img}
            />
            <p className="text-[#041B3C] font-semibold text-[16px] leading-6">
              {data.title}
            </p>
            <p className="text-[12px] leading-[19.5px] text-[#434654]">
              {data.message}{' '}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full max-w-[1024px] flex flex-col h-full md:gap-16 gap-6 px-3">
      <ShowEpicsHeader />
      <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 gap-6 mb-24 md:mb-0">
        {epics?.slice(0, 6).map((epic) => (
          <EpicCard
            key={epic.id}
            data={epic}
          />
        ))}{' '}
      </div>
    </div>
  );
}
