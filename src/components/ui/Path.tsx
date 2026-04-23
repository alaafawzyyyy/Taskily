import Image from 'next/image';

type title = {
  src?: string;
  alt?: string;
  head: string;
  color?: string;
};
export function Path({ head, src, alt, color }: title) {
  return (
    <div className="flex gap-2">
      <p
        style={{ color: color ?? '#434654' }}
        className="font-bold text-[12px] leading-4 uppercase text-[#434654] tracking-[1.2px]"
      >
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
