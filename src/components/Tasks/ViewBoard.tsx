'use client';
import { useParams } from 'next/navigation';
import { statusOptions } from '../forms/CreateTaskForm';
import { TaskColumn } from './TaskColumn';
import { useGetAllTasks } from '@/hooks/getAllTasks';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import { updateTaskStatus } from '../lib/api/tasks';
import toast from 'react-hot-toast';
import type { TaskCard } from './TaskCard';
import type { DragEndEvent } from '@dnd-kit/core';

type Props = {
  onSelectTask: (id: string) => void;
};

export function ViewBoard({ onSelectTask }: Props) {
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : '';

  const tasksFromApi = useGetAllTasks(projectId) as TaskCard[];
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const mergedTasks = tasksFromApi.map((t) => ({
    ...t,
    status: overrides[t.id] ?? t.status,
  }));

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) return;

    const taskId = String(event.active.id);
    const newStatus = String(event.over.id);

    const currentTask = mergedTasks.find((t) => t.id === taskId);
    const oldStatus = currentTask?.status;

    setOverrides((prev) => ({
      ...prev,
      [taskId]: newStatus,
    }));

    const res = await updateTaskStatus({
      taskId,
      status: newStatus,
    });

    if (!res.ok) {
      setOverrides((prev) => {
        const copy = { ...prev };
        if (oldStatus) {
          copy[taskId] = oldStatus;
        } else {
          delete copy[taskId];
        }
        return copy;
      });

      toast.error('Unable to move task');
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 max-w-1024 min-h-screen">
        {statusOptions.map((col, i) => (
          <TaskColumn
            key={i}
            projectId={projectId}
            col={col}
            tasks={mergedTasks}
            onTaskClick={(id) => onSelectTask(id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
