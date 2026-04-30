type InputProps = {
  label: string;
  placeholder?: string;
};
export function TextInput({ label }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <input className="input px-4 pb-4 pt-15 bg-surface-strong" />
    </div>
  );
}
