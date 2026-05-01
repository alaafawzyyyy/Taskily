'use client';
import space from '../../../public/assets/icons/space.svg';
import { BoardViewIcon } from '../icons/BoardView';
import { SearchIcon } from '../icons/Search';
import { TaskButton } from '../icons/TaskButton';
import { Path } from '../ui/Path';

export function TaskHeader() {
  return (
    <div className="flex flex-col w-full gap-8 pt-9 pb-6 ">
      <div className="hidden md:flex gap-2 items-center">
        <Path
          src={space}
          alt="space icon"
          head="projects"
          color="#9A93B3"
        />
        <Path
          src={space}
          alt="space icon"
          head="project alpha"
          color="#9A93B3"
        />
        <Path
          head="tasks"
          color="black"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 w-full">
          <p className="capitalize font-semibold text-4xl leading-10 text-text-primary">
            Active Workboard
          </p>
          <p className="capitalize text-bodysm leading-normal text-text-mid ">
            Curating Project Alpha&apos;s production pipeline and milestones.
          </p>
        </div>

        {/* right part */}
        <div className="flex justify-center w-full gap-3">
          <div className="flex items-center gap-3 bg-surface-strong rounded pr-4 py-2 pl-10  border">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 rounded-less px-4 py-2 border bg-white hover:bg-gray-50">
            <BoardViewIcon />
            <select className="text-bodysm leading-5 font-medium text-text-primary w-full">
              <option>Board View</option>
              <option>List View</option>
            </select>
          </button>
          <div className="flex items-center justify-center">
            <TaskButton />
          </div>
        </div>
      </div>
    </div>
  );
}
