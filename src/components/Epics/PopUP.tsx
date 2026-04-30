import { CreateEpicForm } from '../forms/CreateEpicForm';
import { UpdateEpicFields } from './ShowEpics';
import { getInitials } from '../lib/utils/initials';
import { formatDateENUS } from '../lib/utils/dateFormatter';
import { CloseIcon } from '../icons/Close';
import { IdIcon } from '../icons/Id';
import { CalendarIcon } from '../icons/Calendar';
import { PlusBlueIcon, PlusWhiteIcon } from '../icons/plus';
import { NoTasksIcon } from '../icons/NoTasks';
import { UnAssignedIcon } from '../icons/Unassigned';

type Props = {
  modeForm?: 'description' | 'edit';
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
};

export type Pop = {
  epic_id: string;
  description: string;
  title: string;
  deadline: string | null;
  created_at: string;
  id: string;
  created_by: {
    name: string;
  };
  assignee: {
    name: string;
    sub: string;
  } | null;
};

export function PopUp({
  isOpen,
  onClose,
  modeForm,
  selectedEpic,
  setIsModalOpen,
  handleUpdate,
  isSaving,
}: Props) {
  if (!isOpen) return null;
  if (!selectedEpic) return null;
  const DateUS = formatDateENUS(selectedEpic?.created_at);
  return (
    <>
      {modeForm === 'description' ? (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
        >
          <div className="flex flex-col max-w-672 max-h-90 overflow-y-auto rounded-lg bg-white">
            <div className="border-b flex justify-between p-8 border-slate-300">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <IdIcon />
                  <p className="font-bold text-xs leading-4 tracking-0.6 text-slate-900-op capitalize ">
                    {selectedEpic?.epic_id}
                  </p>
                </div>
                <p className="font-bold text-2xl leading-8 text-slate-900 capitalize ">
                  {selectedEpic?.title}
                </p>
              </div>
              <CloseIcon
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
                  <p className="font-bold text-10 leading-15 text-slate-900-op66 uppercase">
                    CREATED BY
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-10 leading-15 font-bold">
                      {selectedEpic?.created_by.name ? (
                        getInitials(selectedEpic?.created_by.name)
                      ) : (
                        <UnAssignedIcon />
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-5">
                      {selectedEpic?.created_by.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start gap-2">
                  <p className="font-bold text-10 leading-15 text-slate-900-op66 uppercase">
                    Assignee
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-bg flex items-center justify-center text-51617E text-10 leading-15 font-bold">
                      {selectedEpic.assignee?.name ? (
                        getInitials(selectedEpic.assignee.name)
                      ) : (
                        <div className="w-6 h-6 rounded-xl border-[2px] flex items-center justify-center bg-[#E0E8FF]">
                          <UnAssignedIcon />
                        </div>
                      )}
                    </div>

                    <p className="text-sm font-medium text-slate-900 leading-5">
                      {selectedEpic.assignee?.name || 'Unassigned'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start gap-2">
                  <p className="font-bold text-10 leading-15 text-slate-900-op66 uppercase">
                    CREATED at
                  </p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <p className="text-sm font-medium">{DateUS}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-6 justify-between items-center">
                  <p className="font-semibold text-18 leading-5 ">Tasks</p>
                  <button>
                    <div className="flex gap-2 items-center">
                      <PlusBlueIcon />
                      <p className="font-semibold text-14 leading-7 text-primary">
                        Add Task
                      </p>
                    </div>
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center gap-3 rounded-lg border-[2px] border-dashed p-12 bg-surface-low">
                  <NoTasksIcon />
                  <p className="pt-4 font-medium text-base leadin-6">
                    No tasks have been added to this epic yet
                  </p>
                  <button className="bg-primary text-white py-10 px-6 flex gap-2 rounded-sm">
                    <PlusWhiteIcon />
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
