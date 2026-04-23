import PaginationButton from '../ui/paginationButton';

type props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};
export default function ProjectFooter({
  setCurrentPage,
  currentPage,
  totalPages,
}: props) {
  const Next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const Prev = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className=" hidden px-2 pt-12 md:flex justify-between items-center">
      <p className="text-[#434654] text-[12px] leading-4 font-medium ">
        Showing 5 of 24 active projects
      </p>
      <div className="flex gap-2">
        <PaginationButton
          number="<"
          onClick={Prev}
          disabled={currentPage === 1}
        />
        <PaginationButton number={currentPage} />
        <PaginationButton number={currentPage + 1} />
        <PaginationButton
          number=">"
          onClick={Next}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}
