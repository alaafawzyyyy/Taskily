type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  p?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({ label, options, p, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-xs uppercase text-text-mid">
        {label}
      </label>
      <select
        className="input px-4 pb-4 pt-15 bg-surface-strong"
        {...props}
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
