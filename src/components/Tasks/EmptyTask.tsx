import { NoTasksIcon } from '../icons/NoTasks';
import { PlusWhiteIcon } from '../icons/plus';

type Props = {
  handleAddTask: () => void;
};
export function EmptyTask({ handleAddTask }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-3 rounded-lg border-2 border-dashed p-12 bg-surface border-slate-300/30">
      <NoTasksIcon />
      <p className="pt-4 font-medium text-base leadin-6">
        No tasks have been added to this epic yet
      </p>
      <button
        onClick={handleAddTask}
        className="bg-primary text-white py-10 px-6 flex gap-2 rounded-sm"
      >
        <PlusWhiteIcon />
        <p>Add task</p>
      </button>
    </div>
  );
}
