import { useProjectMembers } from '@/hooks/getMembers';
import { DateInput } from '../Tasks/Date';
import { SelectInput } from '../Tasks/SelectInput';
import { TextArea } from '../Tasks/TextArea';
import { TextInput } from '../Tasks/TextInput';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useProjectEpics } from '@/hooks/getEpics';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useEffect } from 'react';
import { addTask } from '../lib/api/tasks';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: 'TO_DO', label: 'TO DO' },
  { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
  { value: 'BLOCKED', label: 'BLOCKED' },
  { value: 'IN_REVIEW', label: 'IN REVIEW' },
  { value: 'READY_FOR_QA', label: 'READY FOR QA' },
  { value: 'REOPENED', label: 'REOPENED' },
  { value: 'READY_FOR_PRODUCTION', label: 'READY FOR PRODUCTION' },
  { value: 'DONE', label: 'DONE' },
];

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  status: z.string().optional(),
  assignee_id: z.string().optional().nullable(),
  epic_id: z.string().optional().nullable(),
  due_date: z.string().optional().nullable(),
  description: z.string().optional(),
});
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export function CreateTaskForm() {
  // get project id
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : '';

  // get epic id
  const searchParams = useSearchParams();
  const epicId = searchParams.get('epicId') || '';

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: 'TO_DO',
    },
  });
  // getting members
  const members = useProjectMembers(projectId);

  // getting epics
  const epics = useProjectEpics(projectId);
  // epic title
  const truncate = (text: string) =>
    text.length > 100 ? text.slice(0, 100) + '...' : text;

  // getting the current epic id
  useEffect(() => {
    if (!epicId) return;

    const matchedEpic = epics.find((e) => e.id === epicId);

    if (matchedEpic) {
      setValue('epic_id', matchedEpic.id);
    }
  }, [epicId, epics, setValue]);

  // send data to api
  const onSubmit = async (data: CreateTaskFormData) => {
    if (!projectId) return;
    // convert date and time to ios
    const formatDate = (date?: string | null) => {
      if (!date) return undefined;
      return new Date(date).toISOString();
    };
    const response = await addTask({
      project_id: projectId,
      title: data.title,
      description: data.description || undefined,
      assignee_id: data.assignee_id || undefined,
      epic_id: data.epic_id || undefined,
      due_date: formatDate(data.due_date) || undefined,
      status: data.status || 'TO_DO',
    });

    if (!response.ok) {
      console.log(response.error);
      toast.error(response.error || 'Something went wrong');
      return;
    }
    toast.success('Task created successfully');
    reset();
    router.back();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col p-8 gap-8 bg-white mt-6 rounded-15 w-full ${
        isSubmitting ? 'pointer-events-none opacity-70' : ''
      }`}
    >
      {/* task title */}
      <TextInput
        label="Title"
        placeholder="e.g., Finalize structural schematics"
        {...register('title')}
      />
      <p className=" flex gap-1 text-xs font-medium leading-4 text-error">
        {errors.title?.message}
      </p>

      <div className=" flex flex-col md:flex-row gap-8 w-full">
        <SelectInput
          label="status"
          options={statusOptions}
          {...register('status')}
          p="Select  status"
        />
        <SelectInput
          label="assignee"
          options={[
            ...members.map((m) => ({
              label: m.metadata?.name || m.email,
              value: m.user_id,
            })),
          ]}
          p="Select Team Member"
          {...register('assignee_id')}
        />
      </div>
      <SelectInput
        label="Epic"
        p="Select Epic Link"
        options={[
          ...epics.map((e) => ({
            label: `${e.epic_id} ${truncate(e.title)}`,
            value: e.id,
          })),
        ]}
        {...register('epic_id')}
      />
      <DateInput
        label="DUE DATE"
        {...register('due_date')}
      />
      <TextArea
        label="description"
        {...register('description')}
      />
      {/* buttons save and cancel */}
      <div className="flex flex-col md:flex-row py-6 pt-4 gap-4 justify-end">
        <>
          <button
            type="submit"
            className=" md:order-2 rounded-15 md:w-182 py-4 md:py-3 px-6 md:px-8 text-14 font-bold leading-5 text-white bg-gradient-to-b from-primary to-primary-light"
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            className=" md:order-1 rounded-[15px] md:w-45 py-3 px-6 text-bodysm font-bold leading-5 text-text-secondary"
          >
            Back
          </button>
        </>
      </div>
    </form>
  );
}
