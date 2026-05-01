'use client';
import { useEffect, useState } from 'react';
import { TaskListCard } from './TaskListCard';
import { GetTasks } from '../lib/api/tasks';
import { TaskCard } from './TaskCard';
import { useParams } from 'next/navigation';

type Props = {
  onSelectTask: (id: string) => void;
};

export function ListView({ onSelectTask }: Props) {
  const [tasks, setTasks] = useState<TaskCard[]>([]);

  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) return;

      try {
        const res = await GetTasks({
          projectId,
        });

        if (res.ok) {
          setTasks(res.data || []);
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <>
      <div className="px-4 py-3 rounded-lg grid grid-cols-7 items-center">
        <p className="text-xs uppercase text-text-mid">task id</p>
        <p className="col-span-2 text-xs uppercase text-text-mid">title</p>
        <p className="text-xs uppercase text-text-mid">status</p>
        <p className="text-xs uppercase text-text-mid">due date</p>
        <p className="text-xs uppercase text-text-mid">assignee</p>
        <p></p>
        {/* Tasks */}
        {/* footer */}
      </div>

      <TaskListCard
        tasks={tasks}
        onTaskClick={(id) => onSelectTask(id)}
      />
    </>
  );
}
