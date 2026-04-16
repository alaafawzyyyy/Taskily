'use client';
import Logo from '../components/Logo';

import menu from '../../public/assets/icons/menu.svg';
import Image from 'next/image';

export function Navbar() {
  return (
    <div className="flex justify-between h-[64px] border-b px-6 py-3 items-center">
      <div className="flex justify-center">
        <button>
          <Image
            src={menu}
            alt="menu"
            className=" block md:hidden"
          />
        </button>
        <Logo hideFirst />
      </div>
      <div className="flex gap-3 pl-4 md:border-l ">
        <div className="md:flex flex-col items-center font-bold hidden md:display">
          <p className="text-[#041B3C] text-[14px]">ALAA FAWZY</p>
          <p className="text-primary text-[10px]">SOFTWARE ENGINEER</p>
        </div>
        <div className=" flex justify-center items-center w-[40px] h-[40px] rounded-xl md:rounded-lg bg-[#0052CC]">
          <p className="text-4 font-bold leading-6 text-white">AF</p>
        </div>
      </div>
    </div>
  );
}
