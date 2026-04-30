'use client';
import space from '../../../public/assets/icons/space.svg';
import { Path } from '../ui/Path';

export function AddTaskHeader() {
  return (
    <div className="flex flex-col w-full gap-8 pt-9 ">
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
          src={space}
          alt="space icon"
          head="tasks"
          color="#9A93B3"
        />
        <Path
          head="new task"
          color="black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="capitalize font-semibold text-4xl leading-10 -tracking-[0.9px] text-slate-900 ">
          Create New Task
        </p>
        <p className="capitalize text-bodysm leading-normal text-text-mid ">
          Initialize a new work item within the Architectural Workspace
          ecosystem.
        </p>
      </div>
    </div>
  );
}
