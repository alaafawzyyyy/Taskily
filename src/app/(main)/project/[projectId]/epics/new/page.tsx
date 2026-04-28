import { CreateEbicHeader } from '@/components/Epics/CreateEpicHeader';
import { CreateEpicForm } from '@/components/forms/CreateEpicForm';

export default function EpicsPageNew() {
  return (
    <div>
      <CreateEbicHeader />
      <CreateEpicForm mode="submit"  />
    </div>
  );
}
