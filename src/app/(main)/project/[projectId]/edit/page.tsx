'use client';
import { AddProjectHeader } from '@/components/AddProject/AddProjectHeader';
import { AddProjectForm, formType } from '@/components/forms/ProjectForm';
import { getProjectById } from '@/components/lib/api/ProjectAPI';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditPage() {
  const [data, setData] = useState<formType | null>(null);
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      const res = await getProjectById({ projectId });
      if (res.ok) {
        setData(res.data[0]);
      }
    };
    fetchData();
  }, [projectId]);

  if (!data)
    return <p className="flex justify-center items-center">Loading...</p>;
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full">
      <AddProjectHeader />
      <AddProjectForm
        initialData={data || undefined}
        projectId={projectId}
      />
    </div>
  );
}
