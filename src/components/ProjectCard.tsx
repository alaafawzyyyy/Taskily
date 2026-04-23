'useClient';
import Image from 'next/image';
import date from '../../public/assets/icons/date.svg';
import { useRouter } from 'next/navigation';

export type cardDetailsType = {
  name: string;
  description: string;
  created_at: string;
  id: string;
};

export default function ProjectCard({ data }: { data: cardDetailsType }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/project/${data.id}/epics`)}
      className=" cursor-pointer flex flex-col md:gap-6 gap-10 md:min-h-[220px] bg-[#FFFFFF] md:p-6 justify-between rounded-lg p-4 pb-6 min-w-[342px] min-h-[212px] md:min-w-[304px] "
    >
      {/* name */}
      <div className="flex flex-col md:gap-2 gap-6">
        <p className="font-semibold text-[18px] leading-[24.75px] md:leading-[28px] md:font-medium text-[#041B3C]">
          {data.name}
        </p>
        {/* description */}
        <p className="text-[14px] leading-[22.75px] text-[#434654]">
          {data.description}
        </p>
      </div>
      {/* date */}
      <div className="flex justify-between items-center gap-1 border-t-[1px] pt-4 md:pt-6 md:pr-0 border-[#C3C6D61A]">
        <p className="hidden md:block uppercase font-bold text-[11px] leading-[16.5px] -tracking-[0.55px] text-[#737685]">
          created at
        </p>
        <div className="flex items-center gap-1">
          <Image
            src={date}
            alt="calender icon"
            className="md:hidden"
          />
          <div className="text-[12px] md:text-[14px] leading-4 md:leading-5 font-medium text-[#434654]">
            {data.created_at}
          </div>
        </div>
      </div>
    </div>
  );
}
