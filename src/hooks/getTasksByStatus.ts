import { GetTasks } from '@/components/lib/api/tasks';
import { TaskCard } from '@/components/Tasks/TaskCard';
import { useEffect, useState } from 'react';

export function useGetTasksByStatus(
  projectId: string,
  status: string,
  search: string,
) {
  const [tasks, setTasks] = useState<TaskCard[]>([]);
  useEffect(() => {
    if (!projectId || !status) return;
    const fetchTasks = async () => {
      const res = await GetTasks({ projectId, status, search });
      if (res.ok) {
        setTasks((res.data as TaskCard[]) || []);
      } else {
        console.log(res.error);
      }
    };
    
    fetchTasks();
  }, [projectId, status, search]);
  
  return tasks;
}
