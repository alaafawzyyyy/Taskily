type TextArea = {
  label: string;
};
export function TextArea({ label }: TextArea) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <textarea
        placeholder="Provide detailed context for this task..."
        className="input px-4 pb-4 pt-15 bg-surface-strong"
      />
    </div>
  );
}
