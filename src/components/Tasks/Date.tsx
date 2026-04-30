type DateInput = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function DateInput({ label, ...props }: DateInput) {
const now = new Date();
const offset = now.getTimezoneOffset() * 60000;
const localISO = new Date(now.getTime() - offset)
  .toISOString()
  .slice(0, 16);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <input
        type="datetime-local"
        min={localISO}
        className="input px-4 pb-4 pt-15 bg-surface-strong"
        {...props}
      />
    </div>
  );
}
