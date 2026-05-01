'use client';
import { ListView } from '@/components/Tasks/ListView';
import { TaskDetails } from '@/components/Tasks/TaskDetails';
import { TaskHeader } from '@/components/Tasks/TaskHeader';
import { ViewBoard } from '@/components/Tasks/ViewBoard';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TasksPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  return (
    <div className="flex">
      <div className="w-full px-8 pb-6 hidden md:block ">
        <TaskHeader />
        {view === 'board' && <ViewBoard onSelectTask={setSelectedTaskId} />}
        {view === 'List' && <ListView onSelectTask={setSelectedTaskId} />}
      </div>
      {selectedTaskId && (
        <TaskDetails
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
