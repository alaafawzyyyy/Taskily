'use client';
import { InvitationIcon } from '@/components/icons/Invitation';
import { acceptInvitation } from '@/components/lib/api/members';
import Logo from '@/components/Logo';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import toast from 'react-hot-toast';

function InviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);

  // accept invitation
  async function handleAccept() {
    if (!token) {
      toast.error('Invalid invitation link');
      return;
    }
    if (loading) return;

    try {
      setLoading(true);

      const res = await acceptInvitation(token);

      if (res.ok) {
        toast.success('Invitation accepted');
        router.push('/project');
        return;
      }

      if (res.status === 401) {
        toast.error('Please login first');
        router.push(`/login?redirect=/invite?token=${token}`);
        return;
      }

      if (res.status === 403) {
        toast.error('Invitation expired');
        return;
      }
      toast.error(res.error || 'Invalid invitation');
    } catch (err) {
      toast.error('Unexpected error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex flex-col gap-12 items-center justify-center h-screen ">
      <Logo />
      <div className="flex rounded-lg p-12 bg-white border-t-4 border-primary items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex rounded-xl px-3 py-1 items-center gap-2 bg-light w-fit">
            <InvitationIcon />
            <p className="font-bold uppercase text-bodyx/s leading-4 text-text-mid text-center">
              New Project Invitation
            </p>
          </div>
          <p className="font-semibold text-bodylg leading-9 text-text-primary h-[72px] max-w-[414px] text-center">
            You&apos;ve been invited to join new project
          </p>
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full capitalize pt-13.5 pb-14.5 font-semibold text-bodysm text-white leading-5 rounded-sm bg-gradient-to-b from-primary to-primary-light"
          >
            {loading ? 'Accepting...' : 'Accept Invitation'}{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Invite() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InviteContent />
    </Suspense>
  );
}
