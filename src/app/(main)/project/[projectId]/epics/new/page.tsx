import { CreateEbicHeader } from '@/components/Epics/CreateEpicHeader';
import { CreateEpicForm } from '@/components/forms/CreateEpicForm';

export default function EpicsPageNew() {
  return (
    <div className="w-full px-8 pb-8 ">
      <CreateEbicHeader />
      <CreateEpicForm mode="submit"/>
    </div>
  );
}
