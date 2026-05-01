'use client';
import { ShowMoreIcon } from '../icons/ShowMore';
import { UnAssignedIcon } from '../icons/Unassigned';
import { formatDateENGB } from '../lib/utils/dateFormatter';
import { getInitials } from '../lib/utils/initials';

export type Task = {
  id: string;
  title: string;
  status: string;
  due_date: string;
  assignee: {
    name: string;
  };
  task_id: string;
};

type Props = {
  tasks: Task[];
  onTaskClick: (id: string) => void;
};

export function TaskListCard({ tasks, onTaskClick }: Props) {
  return (
    <div className="flex flex-col">
      {tasks.length === 0 ? (
        <p className="text-xs text-gray-400 text-center">No tasks</p>
      ) : (
        tasks.map((task) => (
          <div
            onClick={() => {
              console.log('clicked');
              onTaskClick(task.id);
            }}
            key={task.id}
            className="bg-white h-12 py-3 px-3 rounded-lg border-t grid grid-cols-7 items-start cursor-pointer justify-center "
          >
            <p className="text-sm leading-4 text-primary">{task.task_id}</p>

            <div className="col-span-2 font-medium text-sm text-text-primary">
              {task.title}
            </div>

            <div className="flex justify-start">
              <span className="px-2 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700">
                {task.status}
              </span>
            </div>

            <div className="text-sm text-text-mid">
              {formatDateENGB(task.due_date)}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                {task.assignee?.name ? (
                  getInitials(task.assignee?.name)
                ) : (
                  <div className="w-6 h-6 rounded-xl border-[2px] flex items-center justify-center bg-[#E0E8FF]">
                    <UnAssignedIcon />
                  </div>
                )}
              </div>
              <p className="text-bodysm text-text-primary">{task.assignee?.name}</p>
            </div>

            <div className="flex justify-end">
              <ShowMoreIcon />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
