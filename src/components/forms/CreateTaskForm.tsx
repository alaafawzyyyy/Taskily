import { useProjectMembers } from '@/hooks/getMembers';
import { DateInput } from '../Tasks/Date';
import { SelectInput } from '../Tasks/SelectInput';
import { TextArea } from '../Tasks/TextArea';
import { TextInput } from '../Tasks/TextInput';
import { useParams } from 'next/navigation';
import { useProjectEpics } from '@/hooks/getEpics';

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

export function CreateTaskForm() {
  // get project id
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  // getting members
  const members = useProjectMembers(projectId);

  // getting epics
  const epics = useProjectEpics(projectId);
  console.log(epics);

  // epic title
  const truncate = (text: string) =>
    text.length > 100 ? text.slice(0, 100) + '...' : text;

  return (
    <form className="flex flex-col p-8 gap-8 bg-white mt-6 rounded-15 w-full">
      {/* task title */}
      <TextInput
        label="Title"
        placeholder="e.g., Finalize structural schematics"
      />
      <div className=" flex flex-col md:flex-row gap-8 w-full">
        <SelectInput
          label="status"
          options={statusOptions}
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
        />
      </div>
      <SelectInput
        p="Select Epic Link"
        label="Epic"
        options={[
          ...epics.map((e) => ({
            label: `${e.epic_id} ${truncate(e.title)}`,
            value: e.epic_id,
          })),
        ]}
      />
      <DateInput label="DUE DATE" />
      <TextArea label="description" />
      {/* buttons save and cancel */}
      <div className="flex flex-col md:flex-row py-6 pt-4 gap-4 justify-end">
        <>
          <button className=" md:order-2 rounded-15 md:w-182 py-4 md:py-3 px-6 md:px-8 text-14 font-bold leading-5 text-white bg-gradient-to-b from-primary to-primary-light">
            Create Task
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
