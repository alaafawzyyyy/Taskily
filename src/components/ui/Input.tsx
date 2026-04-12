export default function Input(props: any) {
  return (
    <div>
      <label htmlFor="#">{props.label}</label>
      <input id={props.id} {...props} />
       {props.error && (
        <p>
          {props.error}
        </p>
      )}
    </div>
  );
}
