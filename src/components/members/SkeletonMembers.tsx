export function SkeletonMembers () {
  return (
    <div className="flex flex-col w-full border-[2px] border-[#F1F3FF] rounded-lg">

      <div className="hidden md:grid grid-cols-[2fr_1fr_0.5fr] items-center px-6 py-4">
        <div className="h-3 w-24 bg-[#E9ECF8] rounded" />
        <div className="h-3 w-16 bg-[#E9ECF8] rounded" />
        <div className="h-3 w-10 bg-[#E9ECF8] rounded ml-auto" />
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="border-t border-[#F1F3FF] px-4 md:px-6 py-4"
        >

          <div className="hidden md:grid grid-cols-[2fr_1fr_0.5fr] items-center">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E9ECF8]" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-32 bg-[#E9ECF8] rounded" />
                <div className="h-2 w-44 bg-[#E9ECF8] rounded" />
              </div>
            </div>

            <div>
              <div className="h-5 w-16 rounded-full bg-[#E9ECF8]" />
            </div>

            <div className="flex justify-end">
              <div className="h-3 w-3 bg-[#E9ECF8] rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}