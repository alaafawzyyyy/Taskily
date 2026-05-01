import { CalendarIcon } from '../icons/Calendar';
import { PlusCircleIcon, PlusGreyIcon } from '../icons/plus';

const columns = [
  { title: 'TO DO', color: 'dark' },
  { title: 'IN PROGRESS', color: 'primary' },
  { title: 'BLOCKED', color: 'error' },
  { title: 'IN REVIEW', color: 'dark' },
  { title: 'READY FOR QA', color: 'dark' },
  { title: 'REOPENED', color: 'dark' },
  { title: 'READY FOR PRODUCTION', color: 'dark' },
  { title: 'DONE', color: 'dark' },
];
export function ViewBoard() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 max-w-1024">
      {columns.map((col) => (
        <div
          key={col.title}
          className="min-w-[280px] bg-gray-50 rounded-lg flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between px-1">
              <div className="flex gap-2 items-center justify-between">
                <div className={`w-2 h-2 rounded-xl bg-${col.color}`}></div>
                <span className="text-xs font-semibold text-gray-600">
                  {col.title}
                </span>
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                  {5}
                </span>
              </div>
            </div>
            <PlusGreyIcon />
          </div>

          {/* Add Task */}
          <div className="flex flex-col pr-2 gap-3">
            <div className=" flex justify-center border-2 border-dashed border-slate-300/30 rounded-lg py-4 gap-2 text-center cursor-pointer hover:bg-gray-100">
              <PlusCircleIcon />
              <p className="font-bold text-text-primary-60 text-xs ">
                ADD NEW TASK
              </p>
            </div>

            {/* Task Cards*/}
            <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col gap-4">
              <p className="text-sm font-medium leading-5 text-slate-900">
                Incorporate stakeholder feedback from v1.2 Review
              </p>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <CalendarIcon />
                  <span className="text-bodyxs font-bold text-gray-400">
                    OCT 12
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  JD
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
