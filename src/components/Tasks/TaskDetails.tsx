import { useEffect, useState } from 'react';
import { GetTaskDetails } from '../lib/api/tasks';
import { useParams } from 'next/navigation';
import { getInitials } from '../lib/utils/initials';
import { UnAssignedIcon } from '../icons/Unassigned';
import { formatDateENGB } from '../lib/utils/dateFormatter';

type Props = {
  taskId: string;
  onClose: () => void;
};
type Task = {
  id: string;
  task_id: string;
  epic: {
    epic_id: string;
  };
  title: string;
  description?: string;
  status?: string;
  due_date?: string;
  assignee?: {
    name?: string;
  };
  created_by: {
    name: string;
  };
  created_at: string;
};

export function TaskDetails({ taskId, onClose }: Props) {
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : '';

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      setLoading(true);
      setError(null);
      try {
        const res = await GetTaskDetails({ projectId, taskId });
        setTask(res);
        console.log(res);
      } catch (err) {
        setError('Failed to load task');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, projectId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div
        className="relative w-896 max-h-[90vh] h-[90vh] bg-white flex rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-896 rounded-2 bg-white h-full">
          {/* left */}
          <div className="flex flex-col w-576  h-full ">
            <div className=" flex flex-col border-b-1 py-6 px-8 gap-2 border-borderlight">
              <div className="flex gap-3">
                <div className="rounded-sm px-2 py-/2 bg-calm font-bold text-bodysm leading-4 text-primary flex justify-center items-center ">
                  {task?.task_id}
                </div>

                <div className="font-medium text-bodysm leading-5 text-text-mid">
                  {task?.epic.epic_id}
                </div>
              </div>

              <p className="font-bold text-30 leading-9 text-text-primary"></p>
            </div>

            {/* description */}
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-3">
                <p className="font-bold text-bodyxs leading-4 text-text-primary uppercase">
                  description
                </p>
                <p className="text-bodysm leading-6 text-text-primary">
                  {task?.description}
                </p>
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-between py-4 px-8 bg-surface items-center shrink-0">
              <div>
                <p className="font-medium text-bodysm leading-5 text-text-mid">
                  Copy link
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-md py-2 px-4 bg-surface-strong"
              >
                Close
              </button>
            </div>
          </div>

          {/* right */}
          <div className="border-l bg-surface border-borderlight w-full max-w-[320px] px-8 pt-8 flex flex-col gap-8">
            {/* status */}
            <div className="flex flex-col gap-4">
              <div className="font-bold text-bodyxs leading-4 uppercase text-text-mid">
                Status
              </div>

              <select className="py-10 px-4 bg-success">
                <option>{task?.status}</option>
              </select>
            </div>

            {/* assignee */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-bold text-bodyxs leading-4 text-text-mid uppercase">
                  assignee
                </p>
                <div className="flex gap-3 p-2 bg-white">
                  <div className="">
                    {task?.assignee?.name ? (
                      <p className="rounded-lg p-1 bg-calm text-bodyx/s">
                        {getInitials(task?.assignee?.name)}
                      </p>
                    ) : (
                      <div className="w-6 h-6 rounded-xl border-[2px] flex items-center justify-center bg-calm">
                        <UnAssignedIcon />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-bodysm leading-5 text-slate-900">
                      {task?.assignee?.name}
                    </p>
                    <p className="text-bodyxs leading-4 text-text-mid"></p>
                  </div>
                </div>
              </div>

              {/* reporter */}
              <div className="flex flex-col gap-3">
                <p className="font-bold text-bodyxs leading-4 text-text-mid uppercase">
                  reporter
                </p>

                <div className="flex gap-3 p-2">
                  <div className="">
                    {task?.assignee?.name ? (
                      <p className="rounded-lg p-1 bg-calm text-bodyx/s">
                        {getInitials(task?.created_by?.name)}
                      </p>
                    ) : (
                      <div className="w-6 h-6 rounded-xl border-[2px] flex items-center justify-center bg-calm">
                        <UnAssignedIcon />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-bodysm leading-5 text-slate-900">
                      {task?.created_by?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* dates */}
            <div className="border-t pt-4 gap-4 flex flex-col border-slate-300/30">
              <div className="flex justify-between">
                <p className="text-xs leading-4 text-text-mid">Due Date</p>
                <p className="font-medium text-bodysm leading-5 text-text-primary">
                  {formatDateENGB(task?.due_date ?? '')}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-xs leading-4 text-text-mid">Created At</p>
                <p className="font-medium text-bodysm leading-5 text-text-primary">
                  {formatDateENGB(task?.created_at ?? '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
