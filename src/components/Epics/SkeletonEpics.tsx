'use client';

export function SkeletonEpics() {
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full md:gap-10 gap-4 px-3 py-5">
      <div className="flex flex-col gap-8">
        <div className="flex gap-1 justify-start items-center">
          <div className="h-4 w-24 bg-[#E8EDFF] rounded-lg"></div>
          <p className="text-[#737685]">{'>'}</p>
          <div className="h-4 w-24 bg-[#E8EDFF] rounded-lg"></div>
        </div>
        <div className="flex justify-between items-center w-full animate-pulse">
          <div className="h-8 w-64 bg-[#E8EDFF] rounded-md"></div>
          <div className="flex justify-end gap-4">
            <div className="h-10 w-28 bg-[#E8EDFF] rounded-lg"></div>
            <div className="h-10 w-36 bg-[#E8EDFF] rounded-lg"></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 gap-6 mb-24 md:mb-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-white flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-[#E8EDFF] rounded-md"></div>
              <div className="h-8 w-8 bg-[#E8EDFF] rounded-xl"></div>
            </div>

            <div className="w-full h-6 bg-[#E8EDFF] rounded-sm"></div>

            <div className="flex gap-2 justify-start items-center">
              <div className="h-8 w-8 bg-[#E8EDFF] rounded-xl"></div>
              <div className="h-5 w-32 bg-[#E8EDFF] rounded-md"></div>
            </div>

            <div className="flex gap-2 flex-col">
              <div className="w-full h-[6px] bg-[#E8EDFF] rounded-sm"></div>
              <div className="w-full flex justify-between">
                <div className="w-12 h-3 bg-[#E8EDFF] rounded-sm"></div>
                <div className="w-12 h-3 bg-[#E8EDFF] rounded-sm"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
