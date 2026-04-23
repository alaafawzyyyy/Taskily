import Image from 'next/image';

type title = {
  src?: string;
  alt?: string;
  head: string;
};
export function Path({ head, src, alt }: title) {
  return (
    <div className="flex gap-2">
      <p className="font-bold text-[12px] leading-4 uppercase text-[#434654] tracking-[1.2px]">
        {head}
      </p>
      {src && (
        <Image
          src={src}
          alt={alt ?? ''}
        />
      )}
    </div>
  );
}
