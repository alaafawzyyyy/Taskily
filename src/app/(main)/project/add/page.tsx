import { AddProjectHeader } from '@/components/projects/AddProjectHeader';
import { AddProjectForm } from '@/components/forms/ProjectForm';

export default function Projects() {
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full">
      <AddProjectHeader title="add new project" />
      <AddProjectForm />
    </div>
  );
}
