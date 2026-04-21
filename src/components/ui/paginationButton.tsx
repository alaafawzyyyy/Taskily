export default function PaginationButton({
  onClick,
  number,
  disabled,
}: {
  onClick?: () => void;
  number: string | number;
  disabled?: boolean;
}) {
  return (
    <button
      className="flex justify-center items-center w-8 h-8 rounded-sm border-[1px] border-[#C3C6D64D] "
      onClick={onClick}
      disabled={disabled}
    >
      {number}
    </button>
  );
}
