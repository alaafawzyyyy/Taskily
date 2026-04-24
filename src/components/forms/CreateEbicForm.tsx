export function CreateEbicForm() {
  return (
    <form className="flex flex-col p-8 gap-8 bg-white mt-6 rounded-[15px] w-full md:min-w-[1000px]">
      {/* Project title */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-[22.5px] capitalize text-[#333333]">
          title
        </p>
        <input
          type="text"
          className="rounded-[15px] py-3 px-4 border-[1.5px] border-[#DDDDDD]"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-[22.5px] text-[#333333] capitalize flex justify-between">
          description
        </p>
        <textarea className=" h-[106px] rounded-[15px] pt-3 pb-[84px] px-4 border-[1.5px] border-[#DDDDDD]" />{' '}
      </div>

      {/* Assignee */}
      <div className="flex flex-col gap-5 w-[306px]  justify-between">
        <label className="font-semibold text-[22.5px] text-[#333333] capitalize flex justify-between">
          assign to
        </label>
        <div className="relative">
          <select className="h-[36px] w-full rounded-md px-4 border border-[#DDDDDD] appearance-none text-[14px] leading-[36px]">
            <option>Mahmoud Taha</option>
            <option>Mahmoud Taha</option>
            <option>Mahmoud Taha</option>
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            ▼
          </div>
        </div>
      </div>

      {/* deadline */}
      <button className="flex flex-col gap-5 w-[306px]  justify-between">
        <label className="font-semibold text-[22.5px] text-[#333333] capitalize flex justify-between">
          deadline
        </label>
        <div className=" text-start text-[#64748B] h-[36px] w-full rounded-md px-4 border border-[#DDDDDD] appearance-none text-[14px] leading-[36px]">
          pick a date
        </div>
      </button>

      {/* buttons save and cancel */}
      <div className="flex py-6 pt-4 gap-6 justify-end">
        <button className="rounded-[15px] md:w-[182px] py-4 md:py-3 px-6 md:px-8 text-[14px] font-bold leading-5 text-white bg-[#036EFF]">
          Create
        </button>
        <button
          type="button"
          className=" rounded-[15px] md:w-[182px] py-3 px-6 text-[14px] font-bold leading-5 text-[#036EFF] bg-[#EEF4FB]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
