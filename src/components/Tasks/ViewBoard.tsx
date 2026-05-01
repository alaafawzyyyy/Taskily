'use client';
import { useParams } from 'next/navigation';
import { statusOptions } from '../forms/CreateTaskForm';
import { TaskColumn } from './TaskColumn';

type Props = {
  onSelectTask: (id: string) => void;
};

export function ViewBoard({ onSelectTask }: Props) {
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : '';

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 max-w-1024 min-h-screen">
      {statusOptions.map((col, i) => (
        <TaskColumn
          key={i}
          projectId={projectId}
          col={col}
          onTaskClick={(id) => onSelectTask(id)}
        />
      ))}
    </div>
  );
}
