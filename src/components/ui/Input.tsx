export default function Input(props: any) {
  return (
    <div className="w-full h-[70.5]">
      <label
        className="w-[37.2px] h-[17px] -top-[0.5px] left-1 text-slate-700 font-bold text-label-sm "
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        className={`w-full h-[48px] bg-surface-highest rounded-[4px] py-[14px] px-[16px] ${
      props.error ? "border border-error" : "border border-transparent"}`}
        id={props.id}
        {...props}
      />
      {/* desc */}
      {props.desc && !props.error && (
        <p className="hidden lg:block text-xs text-slate-300 pt-1">{props.desc}</p>
      )}

      {/* error */}
      {props.error && <p className="text-xs text-error">{props.error}</p>}
    </div>
  );
}
