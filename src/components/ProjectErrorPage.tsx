'use client';
import Image from 'next/image';
import internetno from '../../public/assets/icons/internetno.svg';

type Props = {
  retry: () => void;
};
export function ProjectErrorPage({retry}: Props) {

  return (
    <div className="flex flex-col gap-[43px] justify-center items-center pt-20">
      <Image
        src={internetno}
        alt="no internet"
        className="rounded-lg max-w-[64px] max-h-[64px]"
      />
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] text-[#041B3C]">
          Something went wrong
        </p>
        <p className="capitalize text-[18px] leading-[29.25px] text-[#434654] max-w-[448px] text-center">
          We&apos;re having trouble retrieving your projects right now. Please
          try again in a moment.
        </p>
      </div>
      <button
        onClick={retry}
        className="hidden md:flex  items-center justify-center h-[44px] py-3 px-6 gap-2 rounded-sm bg-gradient-to-b from-[#003D9B] to-[#0052CC]"
      >
        <p className=" capitalize font-medium text-[16px] leading-6 text-white ">
          Retry Connection
        </p>
      </button>
    </div>
  );
}
