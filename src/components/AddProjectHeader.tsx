import Image from 'next/image';
import addMember from '../../public/assets/icons/addMember.svg';
import space from '../../public/assets/icons/space.svg';
export function AddProjectHeader() {
  return (
    <div className="hidden md:flex h-[64px] top-8 left-8 justify-between relative items-end w-full">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <p className="font-bold text-[12px] leading-4 uppercase text-[#434654] tracking-[1.2px]">
            projects
          </p>
          <Image
            src={space}
            alt="space"
          />
          <p className="font-bold text-[12px] leading-4 uppercase text-[#003D9B] tracking-[1.2px]">
            add new project
          </p>
        </div>
        <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] ">
          add new project
        </p>
      </div>
      <button className="flex items-center h-[44px] py-3 px-6 gap-2 rounded-sm bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
        <Image
          src={addMember}
          alt="add member icon"
          className=""
        />
        <p className="h-20px font-bold text-[14px] leading-5 text-white">
          Invite Member
        </p>
      </button>
    </div>
  );
}
