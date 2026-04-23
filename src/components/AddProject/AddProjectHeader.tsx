'use client';
import addMember from '../../../public//assets//icons/addMember.svg';
import space from '../../../public/assets/icons/space.svg';
import { CreateButton } from '../ui/CreateButton';
import { Path } from '../ui/Path';

export function AddProjectHeader() {
  return (
    <div className="hidden md:flex h-[64px] top-8 left-8 justify-between relative items-end w-full">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Path
            src={space}
            alt="space icon"
            head="projects"
          />
          <Path
            head="add new project"
            color="#003D9B"
          />
        </div>
        <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] ">
          add new project{' '}
        </p>
      </div>
      <CreateButton
        src={addMember}
        alt="Add member icon"
        text="invite member"
      />
    </div>
  );
}
