import PaginationButton from '../ui/paginationButton';

type props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  totalPages: number;
};
export default function ProjectFooter({
  setCurrentPage,
  currentPage,
  total,
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
        Showing 
        {` ${currentPage=== totalPages? total : currentPage*5}
         of ${total} active projects`}
      </p>
      <div className="flex gap-2">
        <PaginationButton
          number="<"
          onClick={Prev}
          disabled={currentPage === 1}
        />
        <PaginationButton
          number={currentPage}
          color="#003D9B"
        />
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
