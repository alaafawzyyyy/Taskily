'use client'
import Image from 'next/image';

type Empty={
  image: string,
  title:string,
  message:string,
  button:string,
  buttonimage:string,
  onClick: () => void;

}
export function NoProjects({image, title,message,button, onClick , buttonimage} :Empty ) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <Image
        src={image}
        alt={`${image} icon`}
        className="rounded-lg max-w-[288px] max-h-[288px]"
      />
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="capitalize font-semibold text-[36px] leading-10 -tracking-[0.9px] text-[#041B3C]">
          {title}
        </p>
        <p className="capitalize text-[18px] leading-[29.25px] text-[#434654] max-w-[448px] text-center">
        {message}
        </p>
      </div>
        <button onClick={onClick} className="hidden md:flex  items-center justify-center h-[44px] py-3 px-6 gap-2 rounded-sm bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
          <Image
            src={buttonimage}
            alt={`${buttonimage} icon`}
          />
          <p className=" capitalize font-medium text-[16px] leading-6 text-white ">
            {button}
          </p>
        </button>
    </div>
  );
}
