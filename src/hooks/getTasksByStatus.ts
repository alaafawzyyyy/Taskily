import { GetTasksStatusAPI } from '@/components/lib/api/tasks';
import { useEffect, useState } from 'react';

export function useGetTasksByStatus(projectId: string, status: string) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (!projectId || !status) return;

    const fetchTasks = async () => {
      const res = await GetTasksStatusAPI(projectId, status);
      if (res.ok) {
        setTasks(res.data || []);
      } else {
        console.log(res.error);
      }
    };

    fetchTasks();
  }, [projectId, status]);

  return tasks;
}
