'use client';
export function SkeletonCard() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="w-full h-40 bg-[#E8EDFF] rounded-lg animate-pulse" />

      <div className="mt-4 flex flex-col gap-3">
        <div className="h-4 w-3/4 bg-[#E8EDFF] rounded-md animate-pulse" />
        <div className="h-4 w-1/2 bg-[#E8EDFF] rounded-md animate-pulse" />
      </div>
    </div>
  );
}
