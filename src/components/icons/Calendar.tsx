import Image from 'next/image';

export function CalendarIcon() {
  return (
    <Image
      src="/assets/icons/date.svg"
      alt="Calendar icon"
      width={13.5}
      height={15}
    />
  );
}
