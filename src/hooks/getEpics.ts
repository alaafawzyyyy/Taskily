import { useEffect, useState } from 'react';
import { GetEpics } from '@/components/lib/api/epics';

type Epic = {
  id: string;
  epic_id: string;
  title: string;
};

export function useProjectEpics(projectId?: string) {
  const [epics, setEpics] = useState<Epic[]>([]);
  useEffect(() => {
    if (!projectId) return;

    const fetchEpics = async () => {
      const res = await GetEpics({ projectId });

      if (res.ok) {
        setEpics(res.data || []);
      }
    };

    fetchEpics();
  }, [projectId]);

  return epics;
}
