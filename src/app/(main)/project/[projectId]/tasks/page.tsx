import { TaskHeader } from '@/components/Tasks/TaskHeader';
import { ViewBoard } from '@/components/Tasks/ViewBoard';

export default function TasksPage() {
  return (
    <div className="w-full px-8 pb-6 ">
      <TaskHeader />
      <ViewBoard />
    </div>
  );
}
