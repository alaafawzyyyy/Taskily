export default function PaginationButton({
  onClick,
  number,
  disabled,
  color,
}: {
  onClick?: () => void;
  number: string | number;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <button
      className={`flex justify-center bg-[${color}] ${color ? 'text-white' : 'text-[#434654]'} items-center w-8 h-8 rounded-sm border-[1px] border-[#C3C6D64D]`}
      onClick={onClick}
      disabled={disabled}
    >
      {number}
    </button>
  );
}
