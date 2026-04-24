import { EpicCard } from './EpicCard';

export function ShowEpics() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 gap-6">
      <EpicCard />
    </div>
  );
}
