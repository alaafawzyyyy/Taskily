import { useGetTasksByStatus } from './getTasksByStatus';

export function useGetAllTasks(projectId: string, search: string) {
  const s1 = useGetTasksByStatus(projectId, 'TO_DO', search);
  const s2 = useGetTasksByStatus(projectId, 'IN_PROGRESS', search);
  const s3 = useGetTasksByStatus(projectId, 'BLOCKED', search);
  const s4 = useGetTasksByStatus(projectId, 'IN_REVIEW', search);
  const s5 = useGetTasksByStatus(projectId, 'READY_FOR_QA', search);
  const s6 = useGetTasksByStatus(projectId, 'REOPENED', search);
  const s7 = useGetTasksByStatus(projectId, 'READY_FOR_PRODUCTION', search);
  const s8 = useGetTasksByStatus(projectId, 'DONE', search);

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
