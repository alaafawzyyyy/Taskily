'use client'
import Image from 'next/image';
import empty from '../../public/assets/icons/empty.svg';
import plus from '../../public/assets/icons/plus.svg';
import Link from 'next/link';

export function NoProjects() {
  return (
    <div className="flex flex-col gap-[43px] justify-center items-center">
      <Image
        src={empty}
        alt="no projects icon"
        className="rounded-lg max-w-[288px] max-h-[288px]"
      />
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] text-[#041B3C]">
          no projects
        </p>
        <p className="capitalize text-[18px] leading-[29.25px] text-[#434654] max-w-[448px] text-center">
          You don’t have any projects yet. Start by defining your first
          architectural workspace to begin tracking tasks and epics.
        </p>
      </div>
      <Link href="/project/add">
        <button className="hidden md:flex  items-center justify-center h-[44px] py-3 px-6 gap-2 rounded-sm bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
          <Image
            src={plus}
            alt="plus icon"
          />
          <p className=" capitalize font-medium text-[16px] leading-6 text-white ">
            create new project
          </p>
        </button>
      </Link>
    </div>
  );
}
