import logo from '../../../public/assets/Logo.svg';

import Image from 'next/image';
export default function Logo() {
  return (
    <div className="p-2 md:p-4 lg:p-6">
          <Image
          className="w-[204px] h-[28px]"
            src={logo}
            alt="LOGO"
          ></Image>
    </div>
  );
}
