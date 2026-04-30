'use client';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreateEbic, GetEpicDetails } from '../lib/api/epics';
import { useEffect, useState } from 'react';
import { getProjectMembers } from '../lib/api/ProjectAPI';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useWatch } from 'react-hook-form';
import { UpdateEpicFields } from '../Epics/ShowEpics';
import { Pop } from '../Epics/PopUP';

const today = new Date().toISOString().split('T')[0];
type Member = {
  user_id: string;
  email: string;
  role: string;
  metadata: {
    name: string;
    email: string;
  };
};

// Validation
export const createEpicSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().optional(),
  assignee_id: z
    .string()
    .min(1, 'Please select a member')
    .optional()
    .nullable(),
  deadline: z
    .string()
    .min(1, 'Please select a date')
    .refine((value) => {
      return value >= today;
    }, 'Deadline must be today or later')
    .optional()
    .nullable(),
});
type FormData = z.infer<typeof createEpicSchema>;

export function CreateEpicForm({
  mode,
  selectedEpicId,
  handleUpdate,
  selectedEpic,
  isSaving,
}: {
  mode?: 'submit' | 'blur';
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
  const [members, setMembers] = useState<Member[]>([]);
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : '';

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createEpicSchema),
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

  // getting members
  useEffect(() => {
    if (!projectId) return;

    const fetchMembers = async () => {
      const res = await getProjectMembers({ projectId });
      if (res.ok) {
        setMembers(res.data);
      }
    };
    fetchMembers();
  }, [projectId]);

  const assigneeId = useWatch({
    control,
    name: 'assignee_id',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col p-8 gap-8 bg-white mt-6 rounded-[15px] w-full ${
        isSaving ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      {/* Project title */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-[22.5px] capitalize text-[#333333]">
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
          className="rounded-[15px] py-3 px-4 border-[1.5px] border-[#DDDDDD]"
        />
        <p className=" flex gap-1 text-[12px] font-medium leading-4 text-[#BA1A1A]">
          {errors.title?.message}
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-[22.5px] text-[#333333] capitalize flex justify-between">
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
          className=" h-[106px] rounded-[15px] pt-3 pb-[84px] px-4 border-[1.5px] border-[#DDDDDD]"
        />
      </div>

      {/* Assignee */}

      <div className="flex flex-col gap-5 w-[306px]  justify-between">
        <label className="font-semibold text-[22.5px] text-[#333333] capitalize">
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
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
            <p className=" flex gap-1 text-[12px] font-medium leading-4 text-[#BA1A1A]">
              {errors.assignee_id?.message}
            </p>
          </div>
        ) : !editAssignee ? (
          <div
            onClick={() => setEditAssignee(true)}
            className="flex items-center gap-2 cursor-pointer rounded-md px-4 h-[36px]"
          >
            <div className="w-6 h-6 rounded-full bg-[#CDDDFF] flex items-center justify-center text-xs font-bold">
              {members
                .find((m) => m.user_id === assigneeId)
                ?.metadata?.name?.slice(0, 2) || ''}
            </div>
            <p className="text-sm text-[#64748B]">
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
            className="text-start text-[#64748B] h-[36px] w-full rounded-md px-4 border border-[#DDDDDD] appearance-none text-[14px] leading-[36px]"
          >
            <option value="">Unassigned</option>
            {members.map((m: Member) => (
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
      <div className="flex flex-col gap-5 w-[306px]  justify-between">
        <label className="font-semibold text-[22.5px] text-[#333333] capitalize flex justify-between">
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
          className=" text-start text-[#64748B] h-[36px] w-full rounded-md px-4 border border-[#DDDDDD] appearance-none text-[14px] leading-[36px]"
        />
        <p className=" flex gap-1 text-[12px] font-medium leading-4 text-[#BA1A1A]">
          {errors.deadline?.message}
        </p>
      </div>

      {/* buttons save and cancel */}
      <div className="flex py-6 pt-4 gap-6 justify-end">
        {mode === 'submit' && (
          <>
            <button className="rounded-[15px] md:w-[182px] py-4 md:py-3 px-6 md:px-8 text-[14px] font-bold leading-5 text-white bg-[#036EFF]">
              Create
            </button>
            <button
              type="button"
              onClick={() => router.push(`/project/${projectId}/epics`)}
              className=" rounded-[15px] md:w-[182px] py-3 px-6 text-[14px] font-bold leading-5 text-[#036EFF] bg-[#EEF4FB]"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
}
