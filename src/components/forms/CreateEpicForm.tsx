'use client';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreateEbic, GetEpicDetails } from '../lib/api/epics';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useWatch } from 'react-hook-form';
import { UpdateEpicFields } from '../Epics/ShowEpics';
import { Pop } from '../Epics/PopUP';
import { member, useProjectMembers } from '@/hooks/getMembers';

const today = new Date().toISOString().split('T')[0];

// Validation
export const createEpicSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().optional(),
  assignee_id: z.string().min(1, 'Please select a member'),
  deadline: z.string().min(1, 'Please select a date'),
});

export const editEpicSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().optional(),
  assignee_id: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
});

type CreateFormData = z.infer<typeof createEpicSchema>;
type EditFormData = z.infer<typeof editEpicSchema>;

export type FormData = CreateFormData | EditFormData;

export function CreateEpicForm({
  mode,
  selectedEpicId,
  handleUpdate,
  selectedEpic,
  isSaving,
}: {
  mode: 'submit' | 'blur';
  onUpdate?: (fields: Partial<FormData>) => void;
  selectedEpicId?: string;
  isSaving?: boolean;
  handleUpdate?: (
    field: keyof UpdateEpicFields,
    value: string | null,
    extraData?: Partial<UpdateEpicFields>,
  ) => void;
  selectedEpic?: Pop | null;
}) {
  const router = useRouter();
  const [editAssignee, setEditAssignee] = useState(false);
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : '';

  const schema = mode === 'submit' ? createEpicSchema : editEpicSchema;
  // getting members
  const members = useProjectMembers(projectId);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      assignee_id: null,
      deadline: null,
    },
  });

  //  onSubmit handler
  const onSubmit = async (data: FormData) => {
    const finalData = {
      ...data,
      project_id: projectId,
      assignee_id: data.assignee_id ?? null,
      deadline: data.deadline ?? null,
    };
    const res = await CreateEbic(finalData);
    if (res.ok) {
      toast.success('Ebic created successfully');
      router.push(`/project/${projectId}/epics`);
      reset();
    } else toast.error(`Failed to create project: ${res.error}`);
  };

  // fetch details
  useEffect(() => {
    if (!selectedEpicId) return;

    const fetch = async () => {
      try {
        const data = await GetEpicDetails({
          projectId,
          selectedEpicId: selectedEpicId,
        });

        reset({
          title: data.title || '',
          description: data.description || '',
          assignee_id: data.assignee?.sub ?? null,
          deadline: data.deadline ?? null,
        });
      } catch (error) {
        console.error('Failed to fetch epic details:', error);
        toast.error('Failed to load epic details');
      }
    };

    fetch();
  }, [selectedEpicId, projectId, reset]);

  const assigneeId = useWatch({
    control,
    name: 'assignee_id',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col p-8 gap-8 bg-white mt-6 rounded-15 w-full ${
        isSaving ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      {/* Project title */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-22.5 capitalize text-headtext">
          title
        </p>
        <input
          disabled={isSaving}
          type="text"
          {...register('title')}
          onBlur={(e) => {
            if (mode !== 'blur') return;

            const value = e.target.value.trim();
            if (!value || value.length < 3) {
              toast.error('Title must be at least 3 characters');
              setValue('title', selectedEpic?.title || '');
              return;
            }
            if (value === selectedEpic?.title) return;
            handleUpdate?.('title', value);
          }}
          className="rounded-15 py-3 px-4 border-1.5 border-border"
        />
        <p className=" flex gap-1 text-xs font-medium leading-4 text-error">
          {errors.title?.message}
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-22.5 text-headtext capitalize flex justify-between">
          description
        </p>
        <textarea
          disabled={isSaving}
          placeholder="No description provided"
          {...register('description')}
          onBlur={(e) => {
            const value = e.target.value.trim();
            handleUpdate?.('description', value);
          }}
          className=" h-106 rounded-15 pt-3 pb-84 px-4 border-1.5 border-border"
        />
      </div>

      {/* Assignee */}

      <div className="flex flex-col gap-5 w-306 justify-between">
        <label className="font-semibold text-22.5 text-headtext capitalize">
          assign to
        </label>

        {mode === 'submit' ? (
          <div>
            <select {...register('assignee_id')}>
              <option value="">Select member</option>
              {members.map((m) => (
                <option
                  key={m.user_id}
                  value={m.user_id}
                >
                  {m.metadata?.name || m.email}
                </option>
              ))}
            </select>
            <p className=" flex gap-1 text-xs font-medium leading-4 text-error">
              {errors.assignee_id?.message}
            </p>
          </div>
        ) : !editAssignee ? (
          <div
            onClick={() => setEditAssignee(true)}
            className="flex items-center gap-2 cursor-pointer rounded-md px-4 h-9"
          >
            <div className="w-6 h-6 rounded-full bg-bg flex items-center justify-center text-xs font-bold">
              {members
                .find((m) => m.user_id === assigneeId)
                ?.metadata?.name?.slice(0, 2) || ''}
            </div>
            <p className="text-sm text-slate">
              {members.find((m) => m.user_id === assigneeId)?.metadata?.name ||
                'Unassigned'}
            </p>
          </div>
        ) : (
          <select
            disabled={isSaving}
            {...register('assignee_id')}
            onChange={(e) => {
              const value = e.target.value || null;

              const selectedMember = members.find((m) => m.user_id === value);

              handleUpdate?.('assignee_id', value, {
                assignee: value
                  ? {
                      name: selectedMember?.metadata?.name || '',
                      sub: value,
                    }
                  : null,
              });
            }}
            autoFocus
            className="text-start text-slate h-9 w-full rounded-md px-4 border border-border appearance-none text-14 leading-9"
          >
            <option value="">Unassigned</option>
            {members.map((m: member) => (
              <option
                key={m.user_id}
                value={m.user_id}
              >
                {m.metadata?.name || m.email}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* deadline */}
      <div className="flex flex-col gap-5 w-306 justify-between">
        <label className="font-semibold text-22.5 text-headtext capitalize flex justify-between">
          deadline
        </label>
        <input
          disabled={isSaving}
          type="date"
          min={today}
          {...register('deadline')}
          onChange={(e) => {
            const value = e.target.value || null;

            handleUpdate?.('deadline', value);
          }}
          className=" text-start text-slate h-9 w-full rounded-md px-4 border border-border appearance-none text-14 leading-9"
        />
        <p className=" flex gap-1 text-xs font-medium leading-4 text-error">
          {errors.deadline?.message}
        </p>
      </div>

      {/* buttons save and cancel */}
      <div className="flex py-6 pt-4 gap-6 justify-end">
        {mode === 'submit' && (
          <>
            <button className="rounded-15 md:w-182 py-4 md:py-3 px-6 md:px-8 text-14 font-bold leading-5 text-white bg-accent">
              Create
            </button>
            <button
              type="button"
              onClick={() => router.push(`/project/${projectId}/epics`)}
              className=" rounded-[15px] md:w-[182px] py-3 px-6 text-[14px] font-bold leading-5 text-bgg bg-wh"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
}
