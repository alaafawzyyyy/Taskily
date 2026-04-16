type Rule = {
  label: string;
  test: (password: string) => boolean;
};

type Props = {
  password: string;
  rules: Rule[];
  layout?: 'column' | 'grid';
  showTitle?: boolean;
};

export function PasswordValidation({
  password,
  rules,
  layout = 'column',
  showTitle,
}: Props) {
  const containerClass =
    layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-2 ';

  return (
    <div
      className={`flex flex-col gap-4 rounded-md p-4 w-full
  ${showTitle ? 'bg-[#F1F3FF80]' : 'bg-[#E8EDFF]'}`}
    >
      {showTitle && (
        <p className="text-xs font-semibold mb-3 text-[#434654] border-b pb-2">
          SECURITY REQUIREMENTS
        </p>
      )}

      <div className={containerClass}>
        {rules.map((rule, index) => {
          const isValid = rule.test(password);

          return (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs
                ${isValid ? 'bg-green-500' : 'border border-gray-400'}`}
              >
                {isValid ? '✓' : ""}
              </div>
              <span
                className={`text-xs ${
                  showTitle
                    ? isValid
                      ? 'text-[#434654]'
                      : 'text-gray-300'
                    : 'text-[#434654]'
                }`}
              >
                {rule.label}
              </span>{' '}
            </div>
          );
        })}
      </div>
    </div>
  );
}
