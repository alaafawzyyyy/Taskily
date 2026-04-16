import logo1 from '../../public/assets/Logo1.svg';
import logo2 from '../../public/assets/Logo2.svg';
import Image from 'next/image';

type LogoProps = { hideFirst?: boolean };
export default function Logo({ hideFirst = false }: LogoProps) {
  return (
    <div className=" flex gap-2 p-2 md:p-4 lg:p-6">
      <Image
        src={logo2}
        alt="LOGO"
        className={hideFirst ? 'hidden md:block' : 'block'}
      />

      <Image
        src={logo1}
        alt="LOGO"
      />
    </div>
  );
}
