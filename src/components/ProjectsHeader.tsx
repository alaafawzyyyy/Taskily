import Image from 'next/image';
import plus from '../../public/assets/icons/plus.svg';
import Link from 'next/link';

export function ProjectHeader({ isLoading }: { isLoading?: boolean }) {
  return (
    <div className="md:flex md:justify-between md:pr-0 md:items-end ">
      <div className="flex flex-col gap-1">
        <p className="capitalize font-bold text-[24px] md:leading-9 md:-tracking-[0.75px] md:text-[30px] md:font-semibold leading-8 -tracking-[0.6px] text-[#041B3C] ">
          projects
        </p>
        <p className="capitalize text-[16px] leading-6 text-[#434654]">
          manage and curate your projects
        </p>
      </div>
      <Link href="/project/add">
        <button
          className={`hidden md:flex items-center justify-center h-[44px] min-w-[180px] py-3 px-6 gap-2 rounded-sm 
        ${
          isLoading
            ? 'bg-[#E8EDFF]'
            : 'bg-gradient-to-b from-[#003D9B] to-[#0052CC]'
        }`}
        >
          {!isLoading && (
            <>
              <Image
                src={plus}
                alt="plus icon"
              />
              <p className=" capitalize font-medium text-[16px] leading-6 text-white ">
                create new project
              </p>
            </>
          )}
        </button>
      </Link>
    </div>
  );
}
