'use client';
import { useEffect, useState } from 'react';
import {
  memberData,
  MembersRow,
} from '../../../../../components/members/MembersShow';
import { useParams } from 'next/navigation';
import { ProjectMemberHeader } from '@/components/members/ProjectMemberHeader';
import { getProjectMembers } from '@/components/lib/api/ProjectAPI';

export default function MembersPage() {
  const [members, setMembers] = useState<memberData[]>([]);
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      const res = await getProjectMembers({ projectId });
      if (res.ok) {
        const data = res.data.map((item:any) => ({
          name: item.metadata.name,
          email: item.email,
          role: item.role,
          initials: item.metadata.name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase(),
        }));
        setMembers(data);
      }
    };
    fetchData();
  }, [projectId]);

  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full md:gap-20 gap-5">
      <ProjectMemberHeader />
      <MembersRow data={members} />
    </div>
  );
}
