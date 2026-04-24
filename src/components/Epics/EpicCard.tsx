import Image from 'next/image';
import showmore from '../../../public/assets/icons/showmore.svg';
import createdby from '../../../public/assets/icons/createdby.svg';
import date from '../../../public/assets/icons/date.svg';

export type Epic = {
  created_at: string;
  description: string;
  epic_id: string;
  title: string;
  initial: string;
  id: string;
  assignee: {
    name: string;
  };
  created_by: {
    name: string;
  };
};

type Props = {
  data: Epic;
};

export function EpicCard({ data }: Props) {
  function getInitials(name: string) {
    const parts = name.trim().split(' ');

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (
    <div className="rounded-lg border-l-4 justify-between p-4 border-[#004E32] bg-white">
      <div className="flex justify-between pb-4">
        <p className="py-1 px-[10px] bg-[#82F9BE] rounded-sm font-bold text-[10px] leading-[15px] text-[#005235]">
          {data.epic_id}
        </p>
        <Image
          src={showmore}
          alt="show more icon"
        />
      </div>
      <div className="pb-3">
        <p className="font-semibold text-5 leading-7 text-[#041B3C]">
          {data.title}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="bg-[#65DCA4] rounded-xl py-[10px] w-10 h-10 text-center text-[14px] font-bold leading-5">
              {getInitials(data.assignee.name)}
            </p>
            <div className="flex flex-col">
              <p className="capitalize text-[12px] font-medium leading-4 text-[#434654]">
                assignee
              </p>
              <p className="capitalize text-[14px] font-semibold leading-5 text-[#041B3C]">
                {data.assignee.name}
              </p>
            </div>
          </div>
          <p className="py-1 px-3 rounded-sm bg-[#F1F3FF] text-[#004E32] text-[12px] font-medium leading-4">
            TO DO
          </p>
        </div>
        {/* Footer */}
        <div className="border-t-[1px] flex justify-between pt-4">
          <div className="flex gap-2">
            <Image
              src={createdby}
              alt="created by icon"
            />
            <p className="text-[11px] leading-[16.5px] text-[#434654CC]">
              Created by:{' '}
              <span className="font-semibold text-[11px] text-[#041B3C]">
                {data.created_by.name}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src={date}
              alt="date icon"
            />
            <p className="text-[11px] leading-[16.5px] text-[#434654CC]">
              {new Date(data.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
