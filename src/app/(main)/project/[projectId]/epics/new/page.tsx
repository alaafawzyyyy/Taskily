import { CreateEbicHeader } from '@/components/Epics/CreateEbicHeader';
import { CreateEbicForm } from '@/components/forms/CreateEbicForm';

export default function EpicsPageNew() {
  return (
    <div>
      <CreateEbicHeader />
      <CreateEbicForm />
    </div>
  );
}
