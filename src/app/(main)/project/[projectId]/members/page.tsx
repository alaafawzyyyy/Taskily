import { MembersRow } from '../../../../../components/members/MembersRow';
import { ProjectMemberHeader } from '@/components/members/ProjectMemberHeader';

export default function MembersPage() {
  return (
    <div className="w-full max-w-[1024px] flex flex-col h-full md:gap-20 gap-5">
      <ProjectMemberHeader />
      <MembersRow/>
    </div>
  );
}
