import Image from 'next/image';
import id from '../../../public/assets/icons/id.svg';
import close from '../../../public/assets/icons/close.svg';
import plus from '../../../public/assets/icons/plus.svg';
import notasks from '../../../public/assets/icons/notasks.svg';
import date from '../../../public/assets/icons/date.svg';

type Props = {
  isOpen: boolean;
  selectedEpic: Pop | null;
  onClose: () => void;
  setIsModalOpen: (value: boolean) => void;
};

export type Pop = {
  epic_id: string;
  title: string;
  created_at: string;
  created_by: {
    name: string;
  };
  assignee: {
    name: string;
    avatar: string;
  };
};

export function PopUp({
  isOpen,
  onClose,
  selectedEpic,
  setIsModalOpen,
}: Props) {
  if (!isOpen) return null;
  if (!selectedEpic) return null;

  const DateD = new Date(selectedEpic?.created_at).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  function getInitials(name: string) {
    const parts = name.trim().split(' ');

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
    >
      <div className="flex flex-col max-w-[672px] max-h-[90vh] overflow-y-auto rounded-lg bg-[#FFFFFF]">
        <div className="border-b-[1px] flex justify-between p-8 border-[#C3C6D626]">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <Image
                src={id}
                alt="Id icon"
              />
              <p className="font-bold text-[12px] leading-4 tracking-[0.6px] text-[#041B3C99] capitalize ">
                {selectedEpic?.epic_id}
              </p>
            </div>
            <p className="font-bold text-[24px] leading-8 text-[#041B3C] capitalize ">
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
          <p className="text-[16px] leading-[26px] text-[#041B3CCC]">
            A comprehensive review and upgrade of the core architectural
            frameworks.
          </p>

          <div className="grid grid-cols-3 gap-6 items-center">
            <div className="flex flex-col justify-start gap-[8.5px]">
              <p className="font-bold text-[10px] leading-[15px] text-[#041B3C66] uppercase">
                CREATED BY
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-[10px] leading-[15px] font-bold">
                  {getInitials(selectedEpic?.created_by.name)}
                </div>
                <p className="text-sm font-medium text-[#041B3C] leading-5">
                  {selectedEpic?.created_by.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-start gap-2">
              <p className="font-bold text-[10px] leading-[15px] text-[#041B3C66] uppercase">
                Assignee
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#CDDDFF] flex items-center justify-center text-[#51617E] text-[10px] leading-[15px] font-bold">
                  {getInitials(selectedEpic?.assignee.name)}
                </div>
                <p className="text-sm font-medium text-[#041B3C] leading-5">
                  {selectedEpic?.assignee.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-start gap-2">
              <p className="font-bold text-[10px] leading-[15px] text-[#041B3C66] uppercase">
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
              <p className="font-semibold text-[18px] leading-5 ">Tasks</p>
              <button>
                <Image
                  src={plus}
                  alt="plus icon"
                />
                <p className="font-semibold text-[14px] leading-7 text-[#003D9B]">
                  Add Task
                </p>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 rounded-lg border-[2px] border-dashed p-12 bg-[#F1F3FF]">
              <Image
                src={notasks}
                alt="no tasks icon"
              />
              <p className="pt-4 font-medium text-[16px] leadin-6">
                No tasks have been added to this epic yet
              </p>
              <button className="bg-[#003D9B] text-white py-[10px] px-6 flex gap-2 rounded-sm">
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
  );
}
