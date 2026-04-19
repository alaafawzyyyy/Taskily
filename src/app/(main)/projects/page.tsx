import { AddProjectHeader } from '@/components/AddProjectHeader';
import { AddProjectForm } from '@/components/forms/AddProjectForm';

export default function Projects() {
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full">
      <AddProjectHeader />
      <AddProjectForm />
    </div>
  );
}
