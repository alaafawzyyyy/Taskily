import { AddProjectHeader } from '@/components/AddProjectHeader';
import { AddProjectForm } from '@/components/forms/AddProjectForm';

export default function Projects() {
  return (
    <div className="w-[1024px] max-w-[1280px] flex flex-col h-full">
      <AddProjectHeader />
      <AddProjectForm />
    </div>
  );
}
