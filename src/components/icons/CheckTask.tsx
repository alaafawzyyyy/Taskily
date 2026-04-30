import Image from 'next/image';

export function CheckTaskIcon() {
  return (
    <Image
      src="/assets/icons/checktask.svg"
      alt="Check task icon"
      width={20}
      height={20}
    />
  );
}