import Image from 'next/image';

export function NoTasksIcon() {
  return (
    <Image
      src="/assets/icons/notasks.svg"
      alt="No tasks icon"
      width={48}
      height={48}
    />
  );
}
