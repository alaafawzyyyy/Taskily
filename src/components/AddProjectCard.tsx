import Image from 'next/image';
import addproject from '../../public/assets/icons/addproject.svg';
import Link from 'next/link';

export default function AddProjectCard() {
  return (
    <Link href="/project/add">
    <div className="hidden md:flex flex-col justify-center items-center bg-[#FFFFFF] rounded-lg p-6 border-dashed border-[2px] md:min-h-[220px]">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-[46px] h-[46px] rounded-xl bg-[#F1F3FF] flex justify-center">
          <Image src={addproject} alt="Add project icon"/>
        </div>
        <p className="uppercase font-bold text-[14px] leading-5 tracking-[1.4px] text-[#434654]">add project</p>
      </div>
    </div>
    </Link>
  );
}
