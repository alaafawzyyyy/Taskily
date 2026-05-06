'use client';
import Link from 'next/link';
import { PlusCircleIcon, PlusGreyIcon } from '../icons/plus';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  projectId: string;
  col: { label: string; value: string };
  tasks: TaskCard[];
  onTaskClick: (id: string) => void;
};
export function TaskColumn({ projectId, col, tasks, onTaskClick }: Props) {
  const columnTasks = tasks.filter((t) => t.status === col.value);
  const { setNodeRef } = useDroppable({
    id: col.value,
  });

  return (
    <div
      ref={setNodeRef}
      className="min-w-280 bg-gray-50 rounded-lg flex flex-col gap-4 "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between px-1">
          <div className="flex gap-2 items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">
              {col.label}
            </span>
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
              {columnTasks.length}
            </span>
          </div>
        </div>
        <PlusGreyIcon />
      </div>

      {/* Add Task */}
      <div className="flex flex-col pr-2 gap-3">
        <Link
          href={`/project/${projectId}/tasks/new?status=${col.value}`}
          className="flex justify-center border-2 border-dashed rounded-lg py-4 gap-2 hover:bg-gray-100"
        >
          <PlusCircleIcon />
          <p className="text-xs font-bold text-text-mid/60">ADD NEW TASK</p>
        </Link>

        <TaskCard
          tasks={columnTasks}
          onTaskClick={onTaskClick}
        />
      </div>
    </div>
  );
}
