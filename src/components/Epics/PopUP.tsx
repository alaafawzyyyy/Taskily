import Image from 'next/image';
import id from '../../../public/assets/icons/id.svg';
import close from '../../../public/assets/icons/close.svg';
import plus from '../../../public/assets/icons/plus.svg';
import notasks from '../../../public/assets/icons/notasks.svg';
import date from '../../../public/assets/icons/date.svg';
import { CreateEpicForm } from '../forms/CreateEpicForm';
import { UpdateEpicFields } from './ShowEpics';
import { useRouter } from 'next/navigation';

type Props = {
  modee?: 'description' | 'edit';
  isOpen: boolean;
  selectedEpic: Pop | null;
  onClose: () => void;
  setIsModalOpen: (value: boolean) => void;
  handleUpdate: (
    field: keyof UpdateEpicFields,
    value: string | null,
    extraData?: Partial<UpdateEpicFields>,
  ) => void;
  extraData?: Partial<UpdateEpicFields>;
  isSaving: boolean;
  projectId?:string
};

export type Pop = {
  epic_id: string;
  description: string;
  title: string;
  deadline: string;
  created_at: string;
  id: string;
  created_by: {
    name: string;
  };
  assignee: {
    name: string;
    sub: string;
  };
};

export function PopUp({
  isOpen,
  onClose,
  modee,
  selectedEpic,
  setIsModalOpen,
  handleUpdate,
  projectId,
  isSaving,
}: Props) {
  const router = useRouter();

  if (!isOpen) return null;
  if (!selectedEpic) return null;

  const DateD = new Date(selectedEpic?.created_at).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  function getInitials(name: string) {
    if (!name || !name.trim()) return 'NA';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const handleAddTask = () => {
    router.push(
      `/project/${projectId}/tasks/new?epicId=${selectedEpic.epic_id}`,
    );
  };
  return (
    <>
      {modee === 'description' ? (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div className="flex flex-col max-w-672 max-h-[90vh] overflow-y-auto rounded-lg bg-white">
            <div className="border-b flex justify-between p-8 border-slate-300">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <Image
                    src={id}
                    alt="Id icon"
                  />
                  <p className="font-bold text-xs leading-4 tracking-0.6 text-slate-900-op capitalize ">
                    {selectedEpic?.epic_id}
                  </p>
                </div>
                <p className="font-bold text-2xl leading-8 text-slate-900 capitalize ">
                  {selectedEpic?.title}
                </p>
              </div>
              <Image
                src={close}
                alt="close icon"
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-8 p-8">
              <p className="text-base leading-26 text-[#041B3CCC]">
                {selectedEpic?.description
                  ? selectedEpic?.description
                  : 'No description provided'}
              </p>

              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="flex flex-col justify-start gap-8.5">
                  <p className="font-bold text-bodyxs leading-15 text-text-primary-60 uppercase">
                    CREATED BY
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center text-white text-bodyxs leading-15 font-bold">
                      {selectedEpic?.created_by.name
                        ? getInitials(selectedEpic?.created_by.name)
                        : 'NA'}
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-5">
                      {selectedEpic?.created_by.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start gap-2">
                  <p className="font-bold text-bodyxs leading-15 text-text-primary-60 uppercase">
                    Assignee
                  </p>
                  <div className="flex items-center gap-2 ">
                    <div className="w-7 h-7 rounded-full bg-bg-light flex items-center justify-center text-accent-muted text-bodyxs leading-15 font-bold">
                      {getInitials(selectedEpic?.assignee.name)}
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-5">
                      {selectedEpic?.assignee.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start gap-2">
                  <p className="font-bold text-bodyxs leading-15 text-text-primary-60 uppercase">
                    CREATED at
                  </p>
                  <div className="flex items-center gap-2">
                    <Image
                      src={date}
                      alt="calendar icon"
                    />
                    <p className="text-sm font-medium">{DateD}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-6 justify-between items-center">
                  <p className="font-semibold text-bodylg leading-5 ">Tasks</p>
                  <button>
                    <Image
                      src={plus}
                      alt="plus icon"
                    />
                    <p className="font-semibold text-bodysm leading-7 text-primary h-9">
                      Add Task
                    </p>
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center gap-3 rounded-lg border-[2px] border-dashed p-12 bg-dark">
                  <Image
                    src={notasks}
                    alt="no tasks icon"
                  />
                  <p className="pt-4 font-medium text-base leadin-6">
                    No tasks have been added to this epic yet
                  </p>
                  <button
                    onClick={handleAddTask}
                    className="bg-primary text-white py-10 px-6 flex gap-2 rounded-sm"
                  >
                    <Image
                      src={plus}
                      alt="plus icon"
                    />
                    <p>Add task</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col max-w-[672px] max-h-[90vh] overflow-y-auto rounded-lg bg-[#FFFFFF]"
          >
            <CreateEpicForm
              mode="blur"
              selectedEpicId={selectedEpic.id}
              handleUpdate={handleUpdate}
              selectedEpic={selectedEpic}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}
    </>
  );
}
