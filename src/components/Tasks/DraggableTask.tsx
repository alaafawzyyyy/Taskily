import { useDraggable } from '@dnd-kit/core';
import { CalendarIcon } from '../icons/Calendar';
import { formatDate2ENUS } from '../lib/utils/dateFormatter';
import { UnAssignedIcon } from '../icons/Unassigned';
import { TaskCard } from './TaskCard';

type DraggableTaskProps = {
  task: TaskCard;
  onTaskClick: (id: string) => void;
};

export function DraggableTask({ task, onTaskClick }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onClick={() => onTaskClick(task.id)}
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
          {task.assignee?.name || <UnAssignedIcon />}
        </div>
      </div>
    </div>
  );
}
