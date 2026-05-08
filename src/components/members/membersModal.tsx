import z from 'zod';
import { AddMEmberIcon } from '../icons/AddMemberIcon';
import { CloseIconSVG } from '../icons/CloseIcon';
import { MessageIcon } from '../icons/MessageIcon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { AddMemberAPI } from '../lib/api/members';

type prop = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const inviteSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});
type FormValues = z.infer<typeof inviteSchema>;

export function AddMember({ setOpen }: prop) {
  const params = useParams();
  const projectId = params.projectId as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(inviteSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: FormValues) {
    const finalData = {
      email: data.email,
      projectId: projectId,
    };
    const res = await AddMemberAPI(finalData);
    if (res.ok) {
      toast.success('Invitation sent successfully');
      setOpen(false);
      reset();
    } else toast.error(`Failed to send invitation: ${res.error}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col max-w-448 rounded-lg bg-white"
    >
      <div className=" flex flex-col gap-2 w-full px-8 pt-8">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-lg bg-surface flex justify-center items-center">
            <AddMEmberIcon className="text-primary" />
          </div>
          <CloseIconSVG
            className="text-darkerc cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <p className="font-bold text-6 leading-8 text-text-primary">
          Invite Team Member
        </p>
        <p className="text-bodysm leading-5 text-slate-700">
          Send an invitation to join the Architectural Studio workspace.
        </p>
      </div>
      <div className="flex flex-col gap-2 px-8 pt-6 pb-8">
        <label className="uppercase font-bold text-bodyx/s leading-4 text-slate-700">
          email address
        </label>
        <div className="relative">
          <input
            placeholder="Enter email address"
            className=" bg-surface-strong flex w-full h-12 items-center justify-between py-14 px-4  rounded"
            {...register('email')}
          />
          <MessageIcon className="absolute right-20 top-1/2 -translate-y-1/2" />
        </div>
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex gap-3 px-8 pb-8 w-full ">
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="w-full pt-13.5 pb-14.5 h-12 font-semibold text-bodysm text-slate-700 leading-5"
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          className="w-full pt-13.5 pb-14.5 font-semibold text-bodysm text-white leading-5 rounded-sm bg-gradient-to-b from-primary to-primary-light"
        >
          {isSubmitting ? 'Sending...' : 'Send Invitation'}{' '}
        </button>
      </div>
    </form>
  );
}
