import { getProjectMembers } from '@/components/lib/api/ProjectAPI';
import { useEffect, useState } from 'react';

export type member = {
  user_id: string;
  email: string;
  role: string;
  metadata: {
    name: string;
    email: string;
  };
};

export function useProjectMembers(projectId?: string) {
  const [members, setMembers] = useState<member[]>([]);
  useEffect(() => {
    if (!projectId) return;

    const fetchMembers = async () => {
      const res = await getProjectMembers({ projectId });
      if (res.ok) {
        setMembers(res.data);
      }
    };

    fetchMembers();
  }, [projectId]);

  return members;
}
