import { ShowEpics } from '@/components/Epics/ShowEpics';
import { ShowEpicsHeader } from '../../../../../components/Epics/ShowEpicsHeader';

export default function EpicsPage() {
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full md:gap-16 gap-6 px-3">
      <ShowEpicsHeader />
      <ShowEpics />
    </div>
  );
}
