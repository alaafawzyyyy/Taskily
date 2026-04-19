import Image from 'next/image';
import right from '../../../public/assets/icons/right.svg';
import protip from '../../../public/assets/icons/protip .svg';

export function AddProjectForm() {
  return (
    <div className="flex flex-col top-[60px] left-[32px] rounded-2 p-4 relative items-center">
      <div className="flex flex-col rounded-2 w-[672px] ">
        {/* Form Header */}
        <div className="border-b pb-10 px-8 pt-8 border-[#F1F3FF] bg-white">
          <div className="flex gap-4">
            <div className="bg-[#0052CC1A] rounded-[4px] p-3">
              <Image
                src={right}
                alt="initalize new project icon"
                className="w-[22px] "
              />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-[24px] leading-8 text-[#041B3C] capitalize">
                initialize new project
              </p>
              <p className="text-[14px] leading-5 text-[#041B3C] capitalize">
                Define the scope and foundational details of your project
              </p>
            </div>
          </div>
        </div>

        {/*Form Content */}
        <div className="flex flex-col p-8 gap-8 bg-white">
          {/* Project title */}
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[11px] leading-[16.5px] tracking-[0.55px] uppercase text-[#4F5F7B]">
              project title *
            </p>
            <input
              type="text"
              className="rounded-[4px] py-3 px-4 bg-[#D7E2FF] border-2 border-[#000000]"
            />
            <p className="text-[12px] font-medium leading-4 text-[#BA1A1A]">
              Error
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[11px] text-[#4F5F7B] leading-[16.5px] tracking-[0.55px] uppercase flex justify-between">
              description
              <span className="text-[11px] leading[16.5px] text-[#4F5F7B99] capitalize">
                Optional
              </span>
            </p>
            <input
              className="rounded-[4px] pt-3 pb-[84px] px-4 bg-[#D7E2FF] border-2 border-[#000000] placeholder: text-[16px] text-[#4F5F7B] leading-6 "
              placeholder="Provide a high-level overview of the project's architectural objectives and 
                key milestones..."
            />
            <p className="text-end text-[11px] font-medium text-[#4F5F7B] leading-[16.5px]">
              0 / 500 character
            </p>
          </div>

          {/* Cancel && Create */}
          <div className="flex justify-between py-4">
            <button className="rounded-[4px] py-3 px-6 text-[14px] font-bold leading-5 text-[#4F5F7B] ">
              Cancel
            </button>
            <button className="rounded-[4px] py-3 px-8 text-[14px] font-bold leading-5 text-white bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
              Create Project
            </button>
          </div>
        </div>
        {/* Footer Pro Tip */}
        <div className="flex p-6 gap-3 bg-[#F1F3FF]">
          <Image
            src={protip}
            alt="Pro tip icon"
          />
          <p className="text-[12px] leading-[19.5px] text-[#4F5F7B]">
            <span className="text-[12px] font-bold  ">Pro Tip: </span> You can invite
            project members and assign epics immediately after the initial
            creation process.
          </p>
        </div>
      </div>
    </div>
  );
}
