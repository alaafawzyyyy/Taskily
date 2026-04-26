'use client';
import { useEffect, useState } from 'react';
import {
  memberData,
  MembersRow,
} from '../../../../../components/members/MembersShow';
import { useParams, useRouter } from 'next/navigation';
import { ProjectMemberHeader } from '@/components/members/ProjectMemberHeader';
import { getProjectMembers } from '@/components/lib/api/ProjectAPI';
import { ProjectErrorPage } from '@/components/ProjectErrorPage';
import { SkeletonMembers } from '@/components/members/SkeletonMembers';

export default function MembersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const [members, setMembers] = useState<memberData[]>([]);
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  const fetchData = async () => {
    if (!projectId) return;
    try {
      setIsLoading(true);
      setError(false);
      const res = await getProjectMembers({ projectId });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (res.ok) {
        const data = res.data.map((item: any) => ({
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
    fetchData();
  }, [projectId, router]);

  // hendle Error
  if (error) {
    return (
      <ProjectErrorPage
        retry={fetchData}
        message="We're having trouble retrieving your project members right now. Please try again in a moment."
      />
    );
  }

  if (isLoading) {
    return <SkeletonMembers />;
  }

  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full md:gap-20 gap-5 pb-8">
      <ProjectMemberHeader />
      <MembersRow data={members} />
    </div>
  );
}
