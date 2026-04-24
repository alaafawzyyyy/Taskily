'use client';
import space from '../../../public/assets/icons/space.svg';
import plus from '../../../public/assets/icons/plus.svg';
import { CreateButton } from '../ui/CreateButton';
import { Path } from '../ui/Path';

export function ShowEpicsHeader() {
  return (
    <div className=" flex h-[64px] md:top-8  justify-between relative items-end w-full">
      <div className="hidden md:flex flex-col gap-4">
        <div className="flex gap-2">
          <Path
            src={space}
            alt="space icon"
            head="projects"
          />
          <Path
            src={space}
            alt="space icon"
            head="project Name"
          />
          <Path
            head="epics"
            color="#003D9B"
          />
        </div>
        <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] ">
          project epics
        </p>
      </div>
      <div className="h-[46px] flex gap-4 justify-center w-full md:w-[500px]">
        <input
          placeholder="Search ebics..."
          className=" bg-[rgb(215,226,255)] p-2 rounded-sm w-full md:w-[303px]"
        />
        <CreateButton
          src={plus}
          alt="Add member icon"
          text="New Epic"
        />
      </div>
    </div>
  );
}
