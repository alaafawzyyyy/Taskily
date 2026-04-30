import Image from 'next/image';
import showmore from '../../../public/assets/icons/showmore.svg';
import showmoreP from '../../../public/assets/icons/showmoreP.svg';
import createdby from '../../../public/assets/icons/createdby.svg';
import date from '../../../public/assets/icons/date.svg';
import { useState } from 'react';

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
  onEdit: () => void;
};

export function EpicCard({ data, onEdit }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  function getInitials(name: string) {
    if (!name || !name.trim()) return 'NA';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const DateD = new Date(data.created_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const DateP = new Date(data.created_at).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="rounded-lg md:border-l-4 justify-between p-4 md:border-[#004E32] bg-white">
      <div className="flex justify-between pb-4">
        <div className="flex gap-6">
          <p className="py-1 px-[10px] md:bg-[#82F9BE] bg-[#DAE2FF] rounded-sm font-bold text-[10px] leading-[15px] md:text-[#005235] text-[#003D9B]">
            {data.epic_id}
          </p>
          <p className="md:hidden py-1 px-3 rounded-sm bg-[#F1F3FF] text-[#004E32] text-[12px] font-medium leading-4">
            TO DO
          </p>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu((prev) => !prev);
          }}
          className="relative px-3 "
        >
          <Image
            src={showmore}
            alt="show more icon"
            className="hidden md:block"
          />
          <Image
            src={showmoreP}
            alt="show more icon"
            className="md:hidden block "
          />
          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                  setOpenMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm disabled:opacity-50"
              >
                {' '}
                Edit Epic
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pb-3">
        <p className="font-semibold text-5 leading-7 text-[#041B3C]">
          {data.title}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="md:bg-[#65DCA4] bg-[#003D9B] flex items-center justify-center rounded-xl py-[10px] md:w-10 md:h-10 w-7 h-7 text-center md:text-[14px] text-[10px] font-bold leading-5 text-white md:text-[#002113]">
              {getInitials(data?.assignee?.name)}
            </p>

            <div className="flex flex-col">
              <p className="order-2 md:order-1 capitalize text-[12px] font-medium leading-4 md:text-[#434654] text-[#737685]">
                assignee
              </p>
              <p className="order-1 md:order-2 capitalize text-[14px] font-semibold leading-5 text-[#041B3C]">
                {data.assignee?.name || 'Unassigned'}
              </p>
            </div>
          </div>

          <p className="hidden md:block py-1 px-3 rounded-sm bg-[#F1F3FF] text-[#004E32] text-[12px] font-medium leading-4">
            TO DO
          </p>
          <div className="md:hidden flex flex-col items-end ">
            <p className="uppercase text-[#737685] font-bold text-[10px] leading-[15px]">
              deadline
            </p>
            <p className="text-[12px] leading-4 font-medium text-[#041B3C]">
              {DateP}
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className=" hidden border-t-[1px] md:flex justify-between pt-4">
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
              {DateD}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
