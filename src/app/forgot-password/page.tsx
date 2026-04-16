import ForgetPasswordForm from '../../components/forms/ForgetPasswordForm';
import Logo from '../../components/Logo';
export default function Signup() {
  return (
      <div className="flex flex-col">
        <Logo />
        <div className="min-h-screen flex justify-center items-center  px-4 ">
          <ForgetPasswordForm/>
        </div>
    </div>
  );
}