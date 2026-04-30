export function SkeletonList() {
  return (
    <>
      <div className="flex flex-col w-full rounded-lg border-1 border-slate-300/15 bg-white">
        <div className="flex items-center justify-between p-4 border-t border-gray-200 hover:bg-gray/50 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-20 rounded-xl bg-gray-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-20 h-4 bg-slate-300 rounded mb-1"></div>
            <div className="w-16 h-4 bg-slate-300 rounded"></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-surface hover:bg-surface-strong animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-slate-3000 rounded-full"></div>
            <div className="flex flex-col">
              <div className="w-3/4 h-4 bg-gslate-300 rounded"></div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-20 rounded-xl bg-slate-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                </div>
                <div className="w-1/2 h-4 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-20 h-4 bg-slate-300 rounded mb-1"></div>
            <div className="w-16 h-4 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
}
