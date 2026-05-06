import { useGetTasksByStatus } from './getTasksByStatus';

export function useGetAllTasks(projectId: string) {
  const s1 = useGetTasksByStatus(projectId, 'TO_DO');
  const s2 = useGetTasksByStatus(projectId, 'IN_PROGRESS');
  const s3 = useGetTasksByStatus(projectId, 'BLOCKED');
  const s4 = useGetTasksByStatus(projectId, 'IN_REVIEW');
  const s5 = useGetTasksByStatus(projectId, 'READY_FOR_QA');
  const s6 = useGetTasksByStatus(projectId, 'REOPENED');
  const s7 = useGetTasksByStatus(projectId, 'READY_FOR_PRODUCTION');
  const s8 = useGetTasksByStatus(projectId, 'DONE');

  const allTasks = [
    ...(s1 || []),
    ...(s2 || []),
    ...(s3 || []),
    ...(s4 || []),
    ...(s5 || []),
    ...(s6 || []),
    ...(s7 || []),
    ...(s8 || []),
  ];
  return allTasks;
}
