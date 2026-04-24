'use client';
import { useEffect, useState } from 'react';
import { Epic, EpicCard } from './EpicCard';
import { useParams, useRouter } from 'next/navigation';
import { GetEpics } from '../lib/api/epics';

export function ShowEpics() {
const [epics, setEpics] = useState<Epic[]>([]);

  const router = useRouter();
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  useEffect(() => {
    const fetchEpics = async () => {
      if (!projectId) return;
      try {
        const res = await GetEpics({ projectId });

        if (res.status === 401) {
          router.push('/login');
          return;
        }
        if (res.ok) {
          const data = res.data;
          setEpics(data);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEpics();
  }, [projectId]);

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 gap-6 mb-24 md:mb-0">
        {epics?.slice(0, 6).map((epic) => (
          <EpicCard
            key={epic.id}
            data={epic}
          />
        ))}{' '}
      </div>
    </>
  );
}
