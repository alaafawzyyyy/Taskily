export default function Input(props: any) {
  return (
    <div>
      <label htmlFor="#">{props.label}</label>
      <input id={props.id} {...props}/>
    </div>
  );
}
