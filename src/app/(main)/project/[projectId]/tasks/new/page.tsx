'use client';
import { CreateTaskForm } from '@/components/forms/CreateTaskForm';
import { AddTaskHeader } from '@/components/Tasks/AddTaskHeader';

export default function CreateTaskPage() {
  return (
    <div className="w-full px-8 pb-6 ">
      <AddTaskHeader />
      <CreateTaskForm />
    </div>
  );
}
