import Image, { ImageProps } from 'next/image';

type IconProps = Omit<ImageProps, 'src' | 'alt'>;

export function CloseIcon(props: IconProps) {
  return (
    <Image
      src="/assets/icons/close.svg"
      alt="close icon"
      width={14}
      height={14}
      {...props}
    />
  );
}
