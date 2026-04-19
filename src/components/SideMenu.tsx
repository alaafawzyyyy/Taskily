'use client';
import Link from 'next/link';
import Image from 'next/image';
import project from '../../public/assets/projects.svg';
import epic from '../../public/assets/icons/epics.svg';
import tasks from '../../public/assets/icons/tasks.svg';
import details from '../../public/assets/icons/details.svg';
import members from '../../public/assets/icons/members.svg';

type typeopen = {
  isOpen: boolean;
};

export function SidebarMenu({ isOpen }: typeopen) {
  return (
    <div
    className={`${isOpen ?'hidden': 'fixed bottom-0 left-0  w-full h-16 bg-white border-t flex pr-[27.86px] pl-[27.83px] gap-[39.7px] md:hidden'}`}
    >
      <Link
        href=""
        className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
      >
        <Image
          src={project}
          alt="project icon"
          className="w-[36px] h-[33px]"
        />
      </Link>
      {/* Project Epics */}
      <Link
        href=""
        className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
      >
        <Image
          src={epic}
          alt="project icon"
          className="w-[36px] h-[33px]"
        />
      </Link>
      {/* Project Tasks */}
      <Link
        href=""
        className="flex items-center rounded-[4px] py-[10px] px-3 gap-3 "
      >
        <Image
          src={tasks}
          alt="project icon"
          className="w-[36px] h-[33px]"
        />
      </Link>
      {/* Project Members */}
      <Link
        href=""
        className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
      >
        <Image
          src={members}
          alt="project icon"
          className="w-[36px] h-[33px]"
        />
      </Link>
      {/* Project Dtails */}
      <Link
        href=""
        className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
      >
        <Image
          src={details}
          alt="project icon"
          className="w-[36px] h-[33px]"
        />
      </Link>
    </div>
  );
}
