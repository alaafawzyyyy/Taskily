'use client';
import { DraggableTask } from './DraggableTask';

export type TaskCard = {
  id: string;
  title: string;
  status: string;
  due_date: string;
  task_id: string;
  assignee: {
    name: string;
  };
  
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
          <DraggableTask
            key={task.id}
            task={task}
            onTaskClick={onTaskClick}
          />
        ))
      )}
    </div>
  );
}
