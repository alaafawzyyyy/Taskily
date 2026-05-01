import Image from 'next/image';

export function TaskButton() {
  return (
    <Image
      src="/assets/icons/tasksbutton.svg"
      alt="Task button icon"
      width={34}
      height={28}
    />
  );
}
