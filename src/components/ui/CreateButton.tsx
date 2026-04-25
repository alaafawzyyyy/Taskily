import Image from 'next/image';

type button = {
  src: string;
  alt: string;
  text: string;
  onClick: () => void;
};
export function CreateButton({ src, alt, text, onClick }: button) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center h-[44px] py-3 px-6 gap-2 rounded-sm bg-gradient-to-b from-[#003D9B] to-[#0052CC]"
    >
      <Image
        src={src}
        alt={alt}
      />
      <p className="h-20px font-bold text-[14px] leading-5 text-white">
        {text}
      </p>
    </button>
  );
}
