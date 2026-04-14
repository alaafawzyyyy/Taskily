import LoginForm from '../../components/forms/LoginForm';
import Logo from '../../components/ui/Logo';
export default function Signup() {
  return (
      <div >
        <Logo />
        <div className="min-h-screen flex justify-center pt-2 pb-10">
          <LoginForm />
        </div>
    </div>
  );
}
