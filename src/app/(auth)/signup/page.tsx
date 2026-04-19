import SignUpForm from '../../../components/forms/SignUpForm';
import Logo from '../../../components/Logo';
export default function Signup() {
  return (
    <div>
      <Logo />
      <div className="min-h-screen flex justify-center pt-2 pb-10">
        <SignUpForm />
      </div>
    </div>
  );
}
