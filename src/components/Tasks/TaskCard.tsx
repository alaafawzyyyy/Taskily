'use client';
import { CalendarIcon } from '../icons/Calendar';
import { UnAssignedIcon } from '../icons/Unassigned';
import { formatDate2ENUS } from '../lib/utils/dateFormatter';

export type TaskCard = {
  id: string;
  title: string;
  status: string;
  due_date: string;
  assignee_initials?: string;
  task_id: 'string';
};

type Props = {
  tasks: TaskCard[];
  onTaskClick: (id: string) => void;
};

export function TaskCard({ tasks, onTaskClick }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.length === 0 ? (
        <p className="text-xs text-gray-400 text-center">No tasks</p>
      ) : (
        tasks.map((task) => (
          <div
            onClick={() => onTaskClick(task.id)}
            key={task.id}
            className="bg-white p-4 rounded-lg border shadow-sm flex flex-col gap-4 cursor-pointer"
          >
            <p className="text-sm font-medium leading-5 text-slate-900">
              {task.title}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <CalendarIcon />
                <span className="text-bodyxs font-bold text-gray-400">
                  {formatDate2ENUS(task?.due_date)}
                </span>
              </div>

              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                {task.assignee_initials || <UnAssignedIcon />}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
