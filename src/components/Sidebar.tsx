'use client';
import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';
import project from '../../public/assets/projects.svg';
import epic from '../../public/assets/icons/epics.svg';
import tasks from '../../public/assets/icons/tasks.svg';
import details from '../../public/assets/icons/details.svg';
import members from '../../public/assets/icons/members.svg';
import collapse from '../../public/assets/icons/collapse.svg';
import Logout from '../../public/assets/icons/logout.svg';
import { clearUser } from '../store/slices/userslices';
import { useDispatch } from 'react-redux';
import { logout } from '../components/lib/api/auth';
type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert('Logout failed, please try again.');
    }
  };
  return (
    <div
      className={`md:flex flex-col  p-4 h-[1024px] ${isOpen ? 'w-[256px]'  : 'hidden md:w-20'} bg-[#F1F3FF]`}
    >
      {/* Logo */}
      <div>
        <div>{isOpen && <Logo />}</div>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-1 flex-1 ">
        {/* Projects */}
        <Link
          href=""
          className="flex items-center rounded-[4px] py-[10px] px-3 gap-3 bg-[#FFFFFF]"
        >
          <Image
            src={project}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && <p className="text-[#003D9B] text-[14px]">Projects</p>}
        </Link>
        {/* Project Epics */}
        <Link
          href=""
          className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
        >
          <Image
            src={epic}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && (
            <p className="text-[#041B3C] text-[14px]">Project Epics</p>
          )}
        </Link>
        {/* Project Tasks */}
        <Link
          href=""
          className="flex items-center rounded-[4px] py-[10px] px-3 gap-3 "
        >
          <Image
            src={tasks}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && (
            <p className="text-[#041B3C] text-[14px]">Project Tasks</p>
          )}
        </Link>
        {/* Project Members */}
        <Link
          href=""
          className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
        >
          <Image
            src={members}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && (
            <p className="text-[#041B3C] text-[14px]">Project Members</p>
          )}
        </Link>
        {/* Project Dtails */}
        <Link
          href=""
          className="flex items-center rounded-[4px] py-[10px] px-3 gap-3"
        >
          <Image
            src={details}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && (
            <p className="text-[#041B3C] text-[14px]">Project Details</p>
          )}
        </Link>
      </nav>

      {/* Sidebar Footer */}
      <div className="flex flex-col border-t pt-6 gap-1 mt-auto">
        <button
          className=" hidden md:flex py-[10px] px-3 gap-3"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src={collapse}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && <p className="text-[#041B3C] text-[14px]">Collapse</p>}
        </button>
        <button
          className="flex py-[10px] px-3 gap-3"
          onClick={handleLogout}
        >
          <Image
            src={Logout}
            alt="project icon"
            className="w-[21.5px] h-4"
          />
          {isOpen && <p className="text-error text-[14px]">Logout</p>}
        </button>
      </div>
    </div>
  );
}
