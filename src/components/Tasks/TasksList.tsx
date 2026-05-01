import { CheckTaskIcon } from '../icons/CheckTask';
import { UnAssignedIcon } from '../icons/Unassigned';
import { formatDateENUS } from '../lib/utils/dateFormatter';
import { getInitials } from '../lib/utils/initials';

type Props = {
  tasks: Task[];
  onTaskClick: (id: string) => void;
};

type Task = {
  id: string;
  title: string;
  assignee?: {
    name: string;
  };
  due_date?: string;
};

export function TasksList({ tasks, onTaskClick }: Props) {
  return (
    <div className="flex flex-col w-full rounded-lg border-1 border-slate-300/15 bg-white">
      {tasks.map((task) => (
        <div
          onClick={() => onTaskClick(task.id)}
          key={task.id}
          className="flex cursor-pointer items-center justify-between p-4 border-t border-gray-200 hover:bg- gray/50"
        >
          <div className="flex items-center gap-4">
            <CheckTaskIcon />
            <div className="flex flex-col">
              <p className="text-body16 font-medium leading-6 text-text-primary">
                {task.title}
              </p>

              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-20 rounded-xl bg-bg-light flex items-center justify-center text-bodyxxs leading-3 font-bold text-accent-muted">
                  {task.assignee?.name ? (
                    getInitials(task.assignee.name)
                  ) : (
                    <UnAssignedIcon />
                  )}
                </div>

                <p className="text-xs text-text-primary-60 leading-4">
                  {task.assignee?.name || 'Unassigned'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-bodyxs text-text-primary-40 leading-4 uppercase font-bold">
              Due Date
            </p>
            <p className="text-sm font-medium text-text-primary-70 leading-4">
              {task.due_date ? formatDateENUS(task.due_date) : '--'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
