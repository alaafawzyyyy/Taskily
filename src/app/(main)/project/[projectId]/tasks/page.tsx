'use client';
import { ListView } from '@/components/Tasks/ListView';
import { TaskDetails } from '@/components/Tasks/TaskDetails';
import { TaskHeader } from '@/components/Tasks/TaskHeader';
import { ViewBoard } from '@/components/Tasks/ViewBoard';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TasksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { search, setSearch, debouncedSearch } = useDebouncedSearch();

  return (
    <div className="flex">
      <div className="w-full px-8 pb-6 hidden md:block ">
        <TaskHeader
          search={search}
          onSearch={(value) => {
            setCurrentPage(1);
            setSearch(value);
          }}
        />
        {view === 'board' && (
          <ViewBoard
            onSelectTask={setSelectedTaskId}
            search={debouncedSearch}
          />
        )}
        {view === 'List' && (
          <ListView
            onSelectTask={setSelectedTaskId}
            search={debouncedSearch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
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
