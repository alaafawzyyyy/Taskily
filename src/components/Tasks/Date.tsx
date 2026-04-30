type DateInput = {
  label: string;
};

export function DateInput({ label }: DateInput) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <input
        type="date"
        min={today}
        className="input px-4 pb-4 pt-15 bg-surface-strong"
      />
    </div>
  );
}
