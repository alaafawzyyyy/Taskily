'use client';
import { ListView } from '@/components/Tasks/ListView';
import { TaskHeader } from '@/components/Tasks/TaskHeader';
import { ViewBoard } from '@/components/Tasks/ViewBoard';
import { useSearchParams } from 'next/navigation';

export default function TasksPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="w-full px-8 pb-6 hidden md:block ">
      <TaskHeader />
      {view === 'board' && <ViewBoard />}
      {view === 'List' && <ListView />}
    </div>
  );
}
