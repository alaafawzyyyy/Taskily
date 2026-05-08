'use client';
import { useState } from 'react';
import addMember from '../../../public//assets//icons/addMember.svg';
import space from '../../../public/assets/icons/space.svg';
import { CreateButton } from '../ui/CreateButton';
import { Path } from '../ui/Path';
import { AddMember } from './membersModal';

export function ProjectMemberHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" md:flex h-[64px] top-8 left-8 justify-between relative md:items-end w-full">
        <div className="flex flex-col gap-4">
          <div className="hidden md:flex gap-2">
            <Path
              src={space}
              alt="space icon"
              head="projects"
            />
            <Path
              src={space}
              alt="space icon"
              head="project name"
            />
            <Path
              head="members"
              color="#003D9B"
            />
          </div>
          <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] text-[#041B3C] text-center ">
            project members
          </p>
        </div>
        <CreateButton
          src={addMember}
          alt="Add member icon"
          text="invite member"
          onClick={() => setOpen(true)}
        />
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddMember setOpen={setOpen} />
          </div>
        </div>
      )}
    </>
  );
}
