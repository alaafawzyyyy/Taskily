export function TaskDetails() {
  return (
    <div className="flex md:w-896 md:h-870 rounded-2 bg-white">
      {/* left */}
      {/* header */}
      <div className="flex flex-col">
        <div className="flex flex-col border-b-1 py-6 px-8 gap-2 border-borderlight">
          <div className="flex gap-3">
            <div className="rounded-sm px-8 py-/2 bg-calm font-bold text-bodysm leading-4 text-primary flex justify-center ">
              TASK-125
            </div>
            {/* image */}
            <div className="font-medium text-bodysm leading-5 text-text-primary">
              EPIC-102 (Core UI Overhaul)
            </div>
          </div>
          <p className="font-bold text-30 leading-9 text-text-primary"></p>
        </div>
        {/* description */}
        <div className="p-8">
          <div className="flex flex-col gap-/11">
            <p className="font-bold text-bodyxs leading-4 text-text-primary"></p>
            <p className="text-bodysm leading-6 text-text-primary"></p>
          </div>
        </div>
        {/* footer */}
        <div className="flex justify-between py-4 px-8 bg-surface">
          <div>
            <p className="font-medium text-bodysm leading-5 text-text-mid">
              Copy link
            </p>
          </div>
          <button className="rounded-md py-2 px-4 bg-surface-strong">
            Close
          </button>
        </div>
      </div>

      {/* right */}
      <div className="border-l bg-surface border-borderlight">
        {/* status */}
        <div className="flex flex-col gap-4">
          <div className="font-bold text-bodyxs leading-4 uppercase text-text-mid">
            Status
          </div>
          <select className="py-10 px-4 bg-success">
            {' '}
            <option>Completed</option>
          </select>
        </div>

        {/* assignee */}
        <div className="flex flex-col gap-6">
          {/* assignee */}
          <div className="flex flex-col gap-3">
            <p className="font-bold text-bodyxs leading-4 text-text-mid uppercase">
              assignee
            </p>
            <div className="rounded-lg p-2 gap-3 flex bg-white">
              <p className="rounded-xl bg-calm"></p>
              <div>
                <p className="font-semibold text-bodysm leading-5 text-slate-900"></p>
                <p className="text-bodyxs leading-4 text-text-mid"></p>
              </div>
            </div>
          </div>
          {/* reporter */}
          <div className="flex flex-col gap-3">
            <p className="font-bold text-bodyxs leading-4 text-text-mid uppercase">
              reporter
            </p>
            <div className="rounded-lg p-2 gap-3 flex">
              <p className="rounded-xl bg-calm"></p>
              <div>
                <p className="font-medium text-bodysm leading-5 text-slate-900"></p>
              </div>
            </div>
          </div>
        </div>
        {/* dates */}
        <div className="border-t pt-4 gap-4 flex border-slate-300/30">
          <div className="flex justify-between">
            <p className="text-xs leading-4 text-text-mid">Due Date</p>
            <p className="font-medium text-bodysm leading-5 text-text-primary"></p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs leading-4 text-text-mid">Created At</p>
            <p className="font-medium text-bodysm leading-5 text-text-primary"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
