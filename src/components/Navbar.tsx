'use client';
import Logo from '../components/Logo';

import menu from '../../public/assets/icons/menu.svg';
import Image from 'next/image';
import { useEffect } from 'react';
import { getUser } from './lib/api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userslices';
import { RootState } from '../store/index';
type typeopen = {
  isOpen: boolean;
};

export function Navbar({ isOpen }: typeopen) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    getUser()
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        window.location.href = '/login';
      });
  }, [dispatch]);

  const name = user?.user_metadata?.name || 'User';
  const job = user?.user_metadata?.job_title || '';

  function getInitials(name: string) {
    const parts = name.trim().split(' ');

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (
    <div className="flex justify-between h-[64px] border-b px-6 py-3 items-center w-full">
      <div className="flex justify-center">
        {isOpen && (
          <button>
            <Image
              src={menu}
              alt="menu"
              className={!isOpen ? 'block' : ' md:hidden'}
            />
          </button>
        )}
        {isOpen && <Logo />}
      </div>
      <div className="flex gap-3 pl-4 md:border-l ">
        <div className="md:flex flex-col items-center font-bold hidden md:display">
          <p className="text-[#041B3C] text-[14px]">{name}</p>
          <p className="text-primary text-[10px]">{job}</p>
        </div>
        <div className=" flex justify-center items-center w-[40px] h-[40px] rounded-xl md:rounded-lg bg-[#0052CC]">
          <p className="text-4 font-bold leading-6 text-white">
            {getInitials(name)}
          </p>
        </div>
      </div>
    </div>
  );
}
