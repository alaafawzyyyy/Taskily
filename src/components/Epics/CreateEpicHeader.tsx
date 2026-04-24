'use client';
import space from '../../../public/assets/icons/space.svg';
import { Path } from '../ui/Path';

export function CreateEbicHeader() {
  return (
        <div className="hidden md:flex gap-2 pt-6">
          <Path
            src={space}
            alt="space icon"
            head="projects"
            color="#9A93B3"
          />
          <Path
            src={space}
            alt="space icon"
            head="task managment project "
            color="#9A93B3"
          />
             <Path
            src={space}
            alt="space icon"
            head="ebics "
            color="#9A93B3"
          />
          <Path head="create new" color="black" />
    </div>
  )}