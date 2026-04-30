type TextArea = {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export function TextArea({ label, ...props }: TextArea) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <textarea
        placeholder="Provide detailed context for this task..."
        className="input px-4 pb-4 pt-15 bg-surface-strong"
        {...props}
      />
    </div>
  );
}
