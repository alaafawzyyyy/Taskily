type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  value?: string;
  p: string;
};

export function SelectInput({ label, options, value, p }: SelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <select
        className="input px-4 pb-4 pt-15 bg-surface-strong"
        value={value}
      >
        <option
          value=""
          className="text-base leading-6 text-text-primary"
        >
          {p}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
