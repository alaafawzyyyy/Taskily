import { ShowEpics } from '@/components/Epics/ShowEpics';
import { ShowEpicsHeader } from '../../../../../components/Epics/ShowEpicsHeader';

export default function EpicsPage() {
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full gap-16">
      <ShowEpicsHeader />
      <ShowEpics />
    </div>
  );
}
